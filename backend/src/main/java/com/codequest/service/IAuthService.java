package com.codequest.service;

import jakarta.servlet.http.HttpServletResponse;

import com.codequest.dto.auth.GlobalResp;
import com.codequest.dto.auth.LoginDto;
import com.codequest.dto.auth.RegisterDto;
import com.codequest.dto.auth.Response;
import com.codequest.dto.auth.AuthVerificationResponse;

public interface IAuthService {

    Response registerHandler(RegisterDto user);

    Response loginHandler(LoginDto body, HttpServletResponse resp);

    GlobalResp logoutHandler(HttpServletResponse resp);

    AuthVerificationResponse verifyAuthentication(String token);

}
