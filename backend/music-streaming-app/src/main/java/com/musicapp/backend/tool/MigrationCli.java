package com.musicapp.backend.tool;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.MigrationInfo;
import org.flywaydb.core.api.MigrationState;
import org.flywaydb.core.api.configuration.ClassicConfiguration;
import org.flywaydb.core.api.output.MigrateResult;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;

public final class MigrationCli {

  private static final Pattern PLACEHOLDER_PATTERN =
      Pattern.compile("\\$\\{([^}:]+)(?::([^}]*))?}");

  private MigrationCli() {}

  public static void main(String[] args) throws Exception {
    if (args.length == 0) {
      printUsage();
      return;
    }

    MigrationSettings settings = MigrationSettings.load();
    Flyway flyway = settings.createFlyway();

    String command = args[0].toLowerCase();
    switch (command) {
      case "migrate" -> runMigrate(flyway);
      case "rollback", "migrate:rollback" -> runRollback(settings, flyway, parseSteps(args));
      case "info", "status", "migrate:status" -> runInfo(flyway);
      default -> throw new IllegalArgumentException("Unsupported migration command: " + command);
    }
  }

  private static void runMigrate(Flyway flyway) {
    MigrateResult result = flyway.migrate();
    System.out.println("Migrated schema to version: " + result.targetSchemaVersion);
    System.out.println("Migrations executed: " + result.migrationsExecuted);
  }

  private static void runInfo(Flyway flyway) {
    MigrationInfo[] allMigrations = flyway.info().all();
    Arrays.stream(allMigrations)
        .filter(migration -> migration.getVersion() != null)
        .sorted(Comparator.comparing(migration -> migration.getVersion().getVersion()))
        .forEach(
            migration ->
                System.out.printf(
                    "%s | %s | %s%n",
                    migration.getVersion(), migration.getState(), migration.getDescription()));
  }

  private static void runRollback(MigrationSettings settings, Flyway flyway, int steps)
      throws Exception {
    if (steps < 1) {
      throw new IllegalArgumentException("Rollback steps must be greater than 0.");
    }

    List<MigrationInfo> appliedMigrations = getAppliedVersionedMigrations(flyway);
    if (appliedMigrations.isEmpty()) {
      System.out.println("No applied versioned migrations found. Nothing to rollback.");
      return;
    }

    if (appliedMigrations.size() < steps) {
      throw new IllegalArgumentException(
          "Requested rollback steps exceed applied migration count.");
    }

    List<MigrationInfo> toRollback =
        appliedMigrations.subList(appliedMigrations.size() - steps, appliedMigrations.size());
    validateUndoScripts(toRollback);

    try (Connection connection =
        DriverManager.getConnection(settings.url(), settings.username(), settings.password())) {
      connection.setAutoCommit(false);

      try {
        for (int i = toRollback.size() - 1; i >= 0; i--) {
          MigrationInfo migration = toRollback.get(i);
          executeUndoScript(connection, migration);
          deleteMigrationHistoryEntry(connection, migration);
          System.out.println("Rolled back migration: " + migration.getVersion());
        }

        connection.commit();
      } catch (Exception exception) {
        connection.rollback();
        throw exception;
      } finally {
        connection.setAutoCommit(true);
      }
    }
  }

  private static List<MigrationInfo> getAppliedVersionedMigrations(Flyway flyway) {
    List<MigrationInfo> applied = new ArrayList<>();
    for (MigrationInfo migration : flyway.info().applied()) {
      if (migration == null
          || migration.getVersion() == null
          || migration.getState() != MigrationState.SUCCESS) {
        continue;
      }

      String script = migration.getScript();
      if (script != null && script.startsWith("V")) {
        applied.add(migration);
      }
    }

    applied.sort(Comparator.comparing(migration -> migration.getVersion().getVersion()));
    return applied;
  }

  private static void validateUndoScripts(List<MigrationInfo> migrations) {
    for (MigrationInfo migration : migrations) {
      Resource undoScript = getUndoScriptResource(migration);
      if (!undoScript.exists()) {
        throw new IllegalStateException(
            "Missing undo migration for "
                + migration.getVersion()
                + ". Expected file: "
                + undoScript.getFilename());
      }
    }
  }

  private static void executeUndoScript(Connection connection, MigrationInfo migration)
      throws Exception {
    Resource undoScript = getUndoScriptResource(migration);
    String scriptContent = readResourceContent(undoScript);
    if (!containsExecutableSql(scriptContent)) {
      return;
    }

    ScriptUtils.executeSqlScript(
        connection, new EncodedResource(undoScript, StandardCharsets.UTF_8));
  }

  private static void deleteMigrationHistoryEntry(Connection connection, MigrationInfo migration)
      throws Exception {
    String sql =
        "DELETE FROM flyway_schema_history WHERE version = ? AND success = TRUE AND type = 'SQL'";
    try (var statement = connection.prepareStatement(sql)) {
      statement.setString(1, migration.getVersion().getVersion());
      statement.executeUpdate();
    }
  }

  private static Resource getUndoScriptResource(MigrationInfo migration) {
    String script = migration.getScript();
    String undoScriptName = "U" + script.substring(1);
    return new ClassPathResource("db/undo/" + undoScriptName);
  }

  private static String readResourceContent(Resource resource) throws IOException {
    try (var inputStream = resource.getInputStream()) {
      return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
    }
  }

  private static boolean containsExecutableSql(String scriptContent) {
    StringBuilder sanitized = new StringBuilder();
    for (String line : scriptContent.split("\\R")) {
      String trimmed = line.trim();
      if (trimmed.isEmpty() || trimmed.startsWith("--")) {
        continue;
      }

      sanitized.append(trimmed);
    }

    return sanitized.length() > 0;
  }

  private static int parseSteps(String[] args) {
    if (args.length < 2) {
      return 1;
    }

    return Integer.parseInt(args[1]);
  }

  private static void printUsage() {
    System.out.println(
        "Usage: migrate | rollback [steps] | migrate:rollback [steps] | info | status | migrate:status");
  }

  private record MigrationSettings(
      String url,
      String username,
      String password,
      String[] locations,
      boolean baselineOnMigrate,
      String baselineVersion,
      String baselineDescription) {

    private static MigrationSettings load() throws IOException {
      Properties properties = new Properties();
      try (var inputStream =
          MigrationCli.class.getClassLoader().getResourceAsStream("application.properties")) {
        if (inputStream == null) {
          throw new IllegalStateException("application.properties could not be loaded.");
        }
        properties.load(inputStream);
      }

      Properties dotenv = loadDotenv();
      String url =
          resolveProperty(
              properties.getProperty("spring.datasource.url"),
              dotenv,
              "jdbc:postgresql://localhost:5432/music_db");
      String username =
          resolveProperty(properties.getProperty("spring.datasource.username"), dotenv, null);
      String password =
          resolveProperty(properties.getProperty("spring.datasource.password"), dotenv, null);
      String location = properties.getProperty("spring.flyway.locations", "classpath:db/migration");
      boolean baselineOnMigrate =
          Boolean.parseBoolean(
              properties.getProperty("spring.flyway.baseline-on-migrate", "false"));
      String baselineVersion = properties.getProperty("spring.flyway.baseline-version", "1");
      String baselineDescription =
          properties.getProperty("spring.flyway.baseline-description", "Baseline");

      return new MigrationSettings(
          url,
          username,
          password,
          location.split(","),
          baselineOnMigrate,
          baselineVersion,
          baselineDescription);
    }

    private Flyway createFlyway() {
      ClassicConfiguration configuration = new ClassicConfiguration();
      configuration.setDataSource(url, username, password);
      configuration.setLocationsAsStrings(locations);
      configuration.setBaselineOnMigrate(baselineOnMigrate);
      configuration.setBaselineVersionAsString(baselineVersion);
      configuration.setBaselineDescription(baselineDescription);
      return new Flyway(configuration);
    }

    private static Properties loadDotenv() throws IOException {
      Properties properties = new Properties();
      Path envPath = Path.of(".env");
      if (!Files.exists(envPath)) {
        return properties;
      }

      for (String line : Files.readAllLines(envPath, StandardCharsets.UTF_8)) {
        String trimmed = line.trim();
        if (trimmed.isEmpty() || trimmed.startsWith("#") || !trimmed.contains("=")) {
          continue;
        }

        int separatorIndex = trimmed.indexOf('=');
        String key = trimmed.substring(0, separatorIndex).trim();
        String value = trimmed.substring(separatorIndex + 1).trim();
        properties.setProperty(key, value);
      }

      return properties;
    }

    private static String resolveProperty(
        String rawValue, Properties dotenv, String explicitFallback) {
      if (rawValue == null) {
        return explicitFallback;
      }

      String value = rawValue.trim();
      Matcher matcher = PLACEHOLDER_PATTERN.matcher(value);
      StringBuffer resolved = new StringBuffer();

      while (matcher.find()) {
        String key = matcher.group(1);
        String fallback = matcher.group(2);
        String replacement = resolvePlaceholderValue(key, fallback, dotenv);

        if (replacement == null) {
          if (value.equals(matcher.group())) {
            return explicitFallback;
          }

          throw new IllegalStateException("Missing configuration value for placeholder: " + key);
        }

        matcher.appendReplacement(resolved, Matcher.quoteReplacement(replacement));
      }

      matcher.appendTail(resolved);
      return resolved.toString();
    }

    private static String resolvePlaceholderValue(String key, String fallback, Properties dotenv) {
      String envValue = System.getenv(key);
      if (envValue != null && !envValue.isBlank()) {
        return envValue;
      }

      String dotEnvValue = dotenv.getProperty(key);
      if (dotEnvValue != null && !dotEnvValue.isBlank()) {
        return dotEnvValue;
      }

      return fallback;
    }
  }
}
