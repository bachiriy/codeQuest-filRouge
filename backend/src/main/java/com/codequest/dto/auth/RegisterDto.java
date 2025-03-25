package com.codequest.dto.auth;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    @NotNull(message = "REGISTER_DTO: First Name is required")
    private String firstName;

    private String lastName;

    @NotNull(message = "REGISTER_DTO: Email is required")
    private String email;

    @NotNull(message = "REGISTER_DTO: Password is required")
    private String password;
}
