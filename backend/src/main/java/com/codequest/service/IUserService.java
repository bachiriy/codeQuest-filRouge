package com.codequest.service;

import java.util.List;

import com.codequest.dto.auth.GlobalResp;
import com.codequest.dto.auth.Request;
import com.codequest.dto.auth.Response;
import com.codequest.dto.auth.RolesDto;
import com.codequest.entity.User;

public interface IUserService {

    User getById(Long id);

    List<Response> getAll(Integer page, Integer size);

    Response update(Long id, Request dto);

    GlobalResp delete(Long id);

    GlobalResp assignRoles(Long id, RolesDto roles);

    Response getDetails(Long id);
}
