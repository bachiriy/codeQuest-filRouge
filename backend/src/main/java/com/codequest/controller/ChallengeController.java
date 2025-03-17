package com.codequest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.security.access.annotation.Secured;
import com.codequest.dto.challenge.ChallengeResponse;
import com.codequest.service.impl.ChallengeServiceImpl;

@RestController
@RequestMapping("/api/user/challenges")
public class ChallengeController {
   @Autowired
   public ChallengeServiceImpl service;

    // @Secured("ROLE_ADMIN")
    @GetMapping
    public List<ChallengeResponse> getChallenges(
        @RequestParam(defaultValue = "1", name = "page") Integer page,
	    @RequestParam(defaultValue = "3", name = "size") Integer size
        ) {
        return service.getAllChallenges(page, size);
    }
}
