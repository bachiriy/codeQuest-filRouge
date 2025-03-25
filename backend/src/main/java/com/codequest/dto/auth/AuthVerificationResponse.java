package com.codequest.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthVerificationResponse {
    private boolean authenticated;
    private Response user;
} 