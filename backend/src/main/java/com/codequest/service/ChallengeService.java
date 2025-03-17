package com.codequest.service;

import java.util.List;

import com.codequest.dto.challenge.ChallengeRequest;
import com.codequest.dto.challenge.ChallengeResponse;

public interface ChallengeService {
    List<ChallengeResponse> getAllChallenges(Integer page, Integer size);
    ChallengeResponse getChallengeById(Long id);
    ChallengeResponse updateChallenge(Long id, ChallengeRequest request);
    ChallengeResponse deleteChallenge(Long id);
}
