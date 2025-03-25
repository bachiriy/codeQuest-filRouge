package com.codequest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.codequest.dto.auth.GlobalResp;
import com.codequest.dto.auth.Request;
import com.codequest.dto.auth.Response;
import com.codequest.dto.auth.RolesDto;
import com.codequest.entity.Role;
import com.codequest.entity.User;
import com.codequest.exception.ResourceNotFoundException;
import com.codequest.mapper.UserMapper;
import com.codequest.repository.RoleRepository;
import com.codequest.repository.UserRepository;
import com.codequest.service.IUserService;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserMapper mapper;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public User getById(Long id) {
	    return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public List<Response> getAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);

        List<User> users = repository.findAll(pageable).getContent();

        return mapper.entitiesToDto(users);
    }

    @Override
    public Response update(Long id, Request dto) {
        User user = getById(id);

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        // user.setPhone(dto.getPhone());

        if (dto.getPassword() != null && dto.getPassword().length() > 0) {
            String encodedPass = encoder.encode(dto.getPassword());
            user.setPassword(encodedPass);
        }

        return mapper.entityToDto(repository.save(user));
    }

    @Override
    public GlobalResp delete(Long id) {
        User user = getById(id);
        repository.delete(user);
        return GlobalResp.builder().message("User deleted successfully").build();
    }

    @Override
    public Response getDetails(Long id) {
        User user = getById(id);
        return mapper.entityToDto(user);
    }

    @Override
    public GlobalResp assignRoles(Long id, RolesDto dto) {
        User user = getById(id);

        List<Role> roles = roleRepository.findByNames(dto.getRoles());
        user.setRoles(roles);

        repository.save(user);
        return GlobalResp.builder().message("Roles assigned successfully").build();
    }

}
