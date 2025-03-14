package com.codequest.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.codequest.dto.auth.RegisterDto;
import com.codequest.dto.auth.Request;
import com.codequest.dto.auth.Response;
import com.codequest.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", source = "entity.id")
    @Mapping(target = "createdAt", source = "entity.createdAt")
    @Mapping(target = "updatedAt", source = "entity.updatedAt")
    Response entityToDto(User entity);

    User dtoToEntity(Request dto);

    User dtoToEntity(RegisterDto dto);

    List<Response> entitiesToDto(List<User> users);
}
