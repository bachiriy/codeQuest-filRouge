package com.codequest.api.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.codequest.api.model.Role;
import com.codequest.api.model.RoleEnum;

@Repository
public interface RoleRepository extends CrudRepository<Role, String> {
	Optional<Role> findByName(RoleEnum name);
}
