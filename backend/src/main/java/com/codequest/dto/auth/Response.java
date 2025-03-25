package com.codequest.dto.auth;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.codequest.entity.Role;
import com.codequest.entity.UserStat;
import com.codequest.entity.enums.ERole;

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
    private String email;
    private String profilePic;
    private String bio;
    private List<Role> roles = new ArrayList<>();
    private Boolean enable;
    private LocalDateTime joinDate;
    private UserStat stats;

    public Response(String username, List<String> roleStrings) {
        this.email = username;
        this.roles = roleStrings.stream()
            .map(roleName -> {
                Role role = new Role();
                role.setName(ERole.valueOf(roleName));
                return role;
            })
            .collect(Collectors.toList());
    }
}
