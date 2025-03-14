package com.codequest.dto.auth;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.codequest.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Response {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private List<Role> roles = new ArrayList<>();
    private Boolean enable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
