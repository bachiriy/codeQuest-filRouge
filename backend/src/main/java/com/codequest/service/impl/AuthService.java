package com.codequest.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.codequest.dto.auth.GlobalResp;
import com.codequest.dto.auth.LoginDto;
import com.codequest.dto.auth.RegisterDto;
import com.codequest.dto.auth.Response;
import com.codequest.entity.Role;
import com.codequest.entity.User;
import com.codequest.entity.enums.ERole;
import com.codequest.exception.CustomDuplicateKeyException;
import com.codequest.exception.ResourceNotFoundException;
import com.codequest.mapper.UserMapper;
import com.codequest.repository.RoleRepository;
import com.codequest.repository.UserRepository;
import com.codequest.security.jwt.TokenProvider;
import com.codequest.service.IAuthService;
import com.codequest.dto.auth.AuthVerificationResponse;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.GrantedAuthority;

@Service
public class AuthService implements IAuthService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private TokenProvider jwtUtil;
    @Autowired
    private AuthenticationManager authManager;
	@Autowired
	private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserMapper mapper;

    @Autowired
    private RoleRepository roleRepository;

    protected final Log logger = LogFactory.getLog(getClass());

    @Override
    public Response registerHandler(RegisterDto dto) {

		Optional<User> existingUser = userRepo.findByEmail(dto.getEmail());

		if (existingUser.isPresent()) {
			throw new CustomDuplicateKeyException();
		}

		String encodedPass = encoder.encode(dto.getPassword());

		User user = mapper.dtoToEntity(dto);
		logger.info("SOMETHING HERE ");
		user.setPassword(encodedPass);
		user.setJoinDate(LocalDateTime.now());

		// Add default USER role
		List<Role> roles = new ArrayList<Role>();
		Role userRole = roleRepository.findByName(ERole.ROLE_USER)
			.orElseThrow(() -> new RuntimeException("Default role not found"));
		roles.add(userRole);
		user.setRoles(roles);
		user.setEnable(true);

		user = userRepo.save(user);

		return mapper.entityToDto(user);
    }

    @Override
    public Response loginHandler(LoginDto body, HttpServletResponse resp) {
		Authentication authentication = authManager
			.authenticate(new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword()));

		User savedUser = userRepo.findByEmail(body.getEmail())
			.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

		logger.warn("email: " + savedUser.getEmail() + "\npassword: " + savedUser.getPassword());

		if (!encoder.matches(body.getPassword(), savedUser.getPassword())) {
			throw new RuntimeException("Password is wrong");
		}

		org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(
			savedUser.getEmail(), savedUser.getPassword(), savedUser.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtUtil.generateToken(userDetails);

		Cookie jwtCookie = new Cookie("Authorization", token);

		jwtCookie.setHttpOnly(true);
		jwtCookie.setSecure(true);
		jwtCookie.setPath("/");
		jwtCookie.setMaxAge(7 * 24 * 60 * 60);

		resp.addCookie(jwtCookie);

		// Optionally, send some additional response if needed zs
		resp.setStatus(HttpServletResponse.SC_OK);
		resp.addCookie(jwtCookie);

		return mapper.entityToDto(savedUser);
    }

    @Override
    public GlobalResp logoutHandler(HttpServletResponse response) {
		try {
			// Clear the JWT cookie
			Cookie logoutCookie = new Cookie("Authorization", null);
			logoutCookie.setMaxAge(0);
			logoutCookie.setPath("/");
			logoutCookie.setHttpOnly(true);
			logoutCookie.setSecure(true);
			logoutCookie.setDomain(null); // Clear domain if set

			response.addCookie(logoutCookie);

			// Clear any session-related attributes if they exist
			SecurityContextHolder.clearContext();

			return GlobalResp.builder().message("Successfully logged out").build();

		} catch (Exception e) {
			return GlobalResp.builder().message("Could not process logout request").build();
		}
    }

    @Override
    public AuthVerificationResponse verifyAuthentication(String token) {
        if (token == null) {
            return new AuthVerificationResponse(false, null);
        }

        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            
            // Validate token with both parameters
            if (!jwtUtil.validateToken(token, userDetails)) {
                return new AuthVerificationResponse(false, null);
            }
            
            Response userDto = new Response(
                userDetails.getUsername(),
                userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList())
            );
            
            return new AuthVerificationResponse(true, userDto);
        } catch (Exception e) {
            return new AuthVerificationResponse(false, null);
        }
    }
}
