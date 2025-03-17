package com.codequest.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codequest.dto.challenge.ChallengeRequest;
import com.codequest.dto.challenge.ChallengeResponse;
import com.codequest.exception.ResourceNotFoundException;
import com.codequest.mapper.ChallengeMapper;
import com.codequest.repository.ChallengeRepository;
import com.codequest.service.ChallengeService;

@Service
public class ChallengeServiceImpl implements ChallengeService {
    @Autowired private ChallengeRepository repository;
    @Autowired private ChallengeMapper mapper;

    public List<ChallengeResponse> getAllChallenges(Integer page, Integer size){
        return null;
    }
    public ChallengeResponse getChallengeById(Long id){
        return null;
    }
    public ChallengeResponse updateChallenge(Long id, ChallengeRequest request){
        return null;
    }
    public ChallengeResponse deleteChallenge(Long id){
        return null;
    }
}
