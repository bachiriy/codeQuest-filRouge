package com.codequest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.annotation.Secured;

import com.codequest.dto.challenge.ChallengeRequest;
import com.codequest.dto.challenge.ChallengeResponse;
import com.codequest.service.impl.ChallengeServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user/challenges")
public class ChallengeController {
    @Autowired
    public ChallengeServiceImpl service;
    
    @GetMapping
    public List<ChallengeResponse> getChallenges(
        @RequestParam(defaultValue = "1", name = "page") Integer page,
        @RequestParam(defaultValue = "3", name = "size") Integer size
    ) {
        return service.getAllChallenges(page, size);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ChallengeResponse> getChallengeById(@PathVariable Long id) {
        ChallengeResponse response = service.getChallengeById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PostMapping
    @Secured("ROLE_ADMIN")
    public ResponseEntity<ChallengeResponse> createChallenge(@Valid @RequestBody ChallengeRequest request) {
        ChallengeResponse response = service.createChallenge(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<ChallengeResponse> updateChallenge(
        @PathVariable Long id, 
        @RequestBody ChallengeRequest request
    ) {
        ChallengeResponse response = service.updateChallenge(id, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<String> deleteChallenge(@PathVariable Long id) {
        String response = service.deleteChallenge(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}