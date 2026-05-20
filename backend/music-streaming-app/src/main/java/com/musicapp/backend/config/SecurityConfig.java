package com.musicapp.backend.config;

import com.musicapp.backend.security.JsonAccessDeniedHandler;
import com.musicapp.backend.security.JsonAuthenticationEntryPoint;
import com.musicapp.backend.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final JsonAuthenticationEntryPoint authenticationEntryPoint;
  private final JsonAccessDeniedHandler accessDeniedHandler;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http.csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> {})
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .formLogin(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable)
        .exceptionHandling(
            exceptions ->
                exceptions
                    .authenticationEntryPoint(authenticationEntryPoint)
                    .accessDeniedHandler(accessDeniedHandler))
        .authorizeHttpRequests(
            auth ->
                auth.requestMatchers(HttpMethod.OPTIONS, "/**")
                    .permitAll()
                    .requestMatchers("/error")
                    .permitAll()
                    .requestMatchers(
                        HttpMethod.POST,
                        "/api/auth/register",
                        "/api/auth/login",
                        "/api/auth/refresh")
                    .permitAll()
                    .requestMatchers(
                        HttpMethod.GET, "/api/songs/**", "/api/artists/**", "/api/albums/**")
                    .permitAll()
                    .requestMatchers("/api/me/**", "/api/auth/logout")
                    .authenticated()
                    .requestMatchers(
                        HttpMethod.POST, "/api/songs/**", "/api/artists/**", "/api/albums/**")
                    .hasRole("ADMIN")
                    .requestMatchers(
                        HttpMethod.PUT, "/api/songs/**", "/api/artists/**", "/api/albums/**")
                    .hasRole("ADMIN")
                    .requestMatchers(
                        HttpMethod.DELETE, "/api/songs/**", "/api/artists/**", "/api/albums/**")
                    .hasRole("ADMIN")
                    .anyRequest()
                    .authenticated())
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
