package com.codequest.dto.auth;

import java.util.List;


import com.codequest.entity.enums.ERole;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RolesDto {
    @NotNull(message = "Email should not be null")
    List<ERole> roles;
}
