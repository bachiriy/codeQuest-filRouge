package com.codequest.seeder;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.codequest.entity.Role;
import com.codequest.entity.enums.ERole;
import com.codequest.repository.RoleRepository;

@Component
public class RoleSeeder {
    @Autowired
    private RoleRepository roleRepository;

    public void seed() {
		Arrays.stream(ERole.values()).forEach(role -> {
			if (!roleRepository.existsByName(role)) { // Check if the role already exists
			Role newRole = Role.builder().name(role).build();
			roleRepository.save(newRole);
			}
		});

		System.out.println("Roles seeded successfully!");
    }
}
