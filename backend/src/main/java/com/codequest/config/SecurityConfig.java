package com.codequest.config;



import java.util.Arrays;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.codequest.security.jwt.JwtAuthenticationFilter;
import com.codequest.security.service.UserDetailsServiceImpl;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtAuthenticationFilter filter;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
	http.cors(cors -> cors.configurationSource(corsConfigurationSource())).csrf().disable().httpBasic().and()
		.authorizeRequests().requestMatchers("/api/auth/**").permitAll().requestMatchers("/images/**").permitAll()
		.requestMatchers("/api/user/**").permitAll().requestMatchers("/api/cinephile/**")
		.hasAnyRole("CINEPHILE", "ADMIN", "MODERATOR").requestMatchers("/api/moderator/**")
		.hasAnyRole("ADMIN", "MODERATOR").requestMatchers("/api/admin/**").hasRole("ADMIN").anyRequest()
		.authenticated().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
		.exceptionHandling()
		.authenticationEntryPoint((request, response, authException) -> response
			.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized"))
		.and().logout().logoutUrl("/api/auth/logout")
		.logoutSuccessHandler((request, response, authentication) -> {
		    response.setStatus(HttpServletResponse.SC_OK);
		}).deleteCookies("Authorization").clearAuthentication(true).invalidateHttpSession(true).and()
		.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

	return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
	CorsConfiguration configuration = new CorsConfiguration();
	configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
	configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
	configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept",
		"Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
	configuration
		.setExposedHeaders(Arrays.asList("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
	configuration.setAllowCredentials(true);
	configuration.setMaxAge(3600L);

	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	source.registerCorsConfiguration("/api/**", configuration);
	return source;
    }

    // Disable security
    @Profile("dev")
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
	return (web) -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/**"));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
	return new BCryptPasswordEncoder(12);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
	DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

	authProvider.setUserDetailsService(userDetailsService);
	authProvider.setPasswordEncoder(passwordEncoder());

	return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
	return authConfig.getAuthenticationManager();
    }

}
