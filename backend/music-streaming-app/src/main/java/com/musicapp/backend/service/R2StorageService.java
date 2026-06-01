package com.musicapp.backend.service;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.exception.SdkException;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

@Service
public class R2StorageService {

  private final S3Presigner presigner;
  private final S3Client s3Client;
  private final String bucket;

  public R2StorageService(
      @Value("${R2_ENDPOINT:}") String endpoint,
      @Value("${R2_ACCOUNT_ID:}") String accountId,
      @Value("${R2_ACCESS_KEY:}") String accessKey,
      @Value("${R2_SECRET_ACCESS_KEY:}") String secretAccessKey,
      @Value("${R2_BUCKET:}") String bucket) {
    this.bucket = bucket;
    String resolvedEndpoint = resolveEndpoint(endpoint, accountId);

    if (!StringUtils.hasText(resolvedEndpoint)
        || !StringUtils.hasText(accessKey)
        || !StringUtils.hasText(secretAccessKey)
        || !StringUtils.hasText(bucket)) {
      this.presigner = null;
      this.s3Client = null;
      return;
    }

    AwsBasicCredentials credentials =
        AwsBasicCredentials.create(accessKey.trim(), secretAccessKey.trim());
    S3Configuration s3Configuration =
        S3Configuration.builder().pathStyleAccessEnabled(true).build();

    this.presigner =
        S3Presigner.builder()
            .endpointOverride(URI.create(resolvedEndpoint))
            .region(Region.of("auto"))
            .serviceConfiguration(s3Configuration)
            .credentialsProvider(StaticCredentialsProvider.create(credentials))
            .build();
    this.s3Client =
        S3Client.builder()
            .endpointOverride(URI.create(resolvedEndpoint))
            .region(Region.of("auto"))
            .serviceConfiguration(s3Configuration)
            .credentialsProvider(StaticCredentialsProvider.create(credentials))
            .build();
  }

  public String createReadUrl(String objectKey) {
    if (isHttpUrl(objectKey) && !isCloudflareDashboardUrl(objectKey)) {
      return objectKey;
    }

    if (presigner == null) {
      throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "R2 is not configured");
    }

    String normalizedObjectKey = normalizeObjectKey(objectKey);
    GetObjectRequest getObjectRequest =
        GetObjectRequest.builder().bucket(bucket).key(normalizedObjectKey).build();
    GetObjectPresignRequest presignRequest =
        GetObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(15))
            .getObjectRequest(getObjectRequest)
            .build();

    return presigner.presignGetObject(presignRequest).url().toString();
  }

  public ResponseInputStream<GetObjectResponse> openReadStream(String objectKey, String range) {
    if (s3Client == null) {
      throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "R2 is not configured");
    }

    GetObjectRequest.Builder getObjectRequest =
        GetObjectRequest.builder().bucket(bucket).key(normalizeObjectKey(objectKey));
    if (StringUtils.hasText(range)) {
      getObjectRequest.range(range.trim());
    }

    try {
      return s3Client.getObject(getObjectRequest.build());
    } catch (S3Exception exception) {
      if (exception.statusCode() == HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE.value()) {
        throw new ResponseStatusException(
            HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, "Requested audio range is invalid");
      }
      throw new ResponseStatusException(
          HttpStatus.BAD_GATEWAY,
          "Could not read audio object from R2: "
              + exception.statusCode()
              + " "
              + exception.awsErrorDetails().errorCode(),
          exception);
    } catch (SdkException exception) {
      throw new ResponseStatusException(
          HttpStatus.BAD_GATEWAY, "Could not read audio object from R2", exception);
    }
  }

  private String resolveEndpoint(String endpoint, String accountId) {
    if (StringUtils.hasText(endpoint)) {
      return endpoint.trim();
    }

    if (!StringUtils.hasText(accountId)) {
      return "";
    }

    return "https://" + accountId.trim() + ".r2.cloudflarestorage.com";
  }

  private boolean isHttpUrl(String value) {
    return value != null && (value.startsWith("http://") || value.startsWith("https://"));
  }

  private boolean isCloudflareDashboardUrl(String value) {
    return value != null && value.startsWith("https://dash.cloudflare.com/");
  }

  private String normalizeObjectKey(String objectKey) {
    if (!StringUtils.hasText(objectKey)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Song audio object key is empty");
    }

    String trimmed = objectKey.trim();
    int objectPathIndex = trimmed.indexOf("/objects/");
    String key =
        objectPathIndex >= 0 ? trimmed.substring(objectPathIndex + "/objects/".length()) : trimmed;
    return URLDecoder.decode(key, StandardCharsets.UTF_8);
  }
}
