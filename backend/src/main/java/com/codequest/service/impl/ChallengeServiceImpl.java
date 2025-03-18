package com.codequest.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codequest.dto.challenge.ChallengeRequest;
import com.codequest.dto.challenge.ChallengeResponse;
import com.codequest.dto.testcase.TestCaseRequest;
import com.codequest.entity.Challenge;
import com.codequest.entity.TestCase;
import com.codequest.exception.ResourceNotFoundException;
import com.codequest.exception.ResourceValidationException;
import com.codequest.mapper.ChallengeMapper;
import com.codequest.mapper.TestCaseMapper;
import com.codequest.repository.ChallengeRepository;
import com.codequest.repository.TestCaseRepository;
import com.codequest.service.ChallengeService;


@Service
public class ChallengeServiceImpl implements ChallengeService {
    @Autowired private ChallengeRepository repository;
    @Autowired private ChallengeMapper mapper;
    @Autowired private TestCaseRepository testCaseRepository;
    @Autowired private TestCaseMapper testCaseMapper;

    
    @Override
    public List<ChallengeResponse> getAllChallenges(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return mapper.map(repository.findAll(pageable).getContent());
    }
    
    @Override
    public ChallengeResponse getChallengeById(Long id) {
        Optional<Challenge> challengeFound = repository.findById(id);
        if (challengeFound.isPresent()) {
            return mapper.map(challengeFound.get());
        } else {
            throw new ResourceNotFoundException("Challenge with ID " + id + " does not exist.");
        }
    }
    
   @Override
    public ChallengeResponse createChallenge(ChallengeRequest request) {
        if (repository.existsByTitleAndDescriptionAndDifficulty(request.getTitle(), request.getDescription(), request.getDifficulty())) {
            throw new ResourceValidationException("Challenge with this informations already exists.");
        }
        Challenge challenge = mapper.challengeRequestToChallenge(request);
        challenge.setTestCases(new ArrayList<>());
        Challenge savedChallenge = repository.save(challenge);
        if (request.getTest_cases() != null && !request.getTest_cases().isEmpty()) {
            List<TestCase> testCases = new ArrayList<>();  
            for (TestCaseRequest tcRequest : request.getTest_cases()) {
                TestCase testCase = testCaseMapper.requestToTestCase(tcRequest);                
                testCase.setChallenge(savedChallenge);
                testCases.add(testCase);
            }
            List<TestCase> savedTestCases = testCaseRepository.saveAll(testCases);
            savedChallenge.setTestCases(savedTestCases);
            savedChallenge = repository.save(savedChallenge);
        }
        return mapper.map(savedChallenge);
    }
    
    @Override
    public ChallengeResponse updateChallenge(Long id, ChallengeRequest request) {
        Optional<Challenge> dbChallenge = repository.findById(id);
        if (dbChallenge.isPresent()) {
            Challenge challengeToUpdate = mapper.challengeRequestToChallenge(request);
            Challenge updatedChallenge = Challenge.builder()
                    .id(dbChallenge.get().getId())
                    .title(!empty(challengeToUpdate.getTitle()) ? challengeToUpdate.getTitle() : dbChallenge.get().getTitle())
                    .description(!empty(challengeToUpdate.getDescription()) ? challengeToUpdate.getDescription() : dbChallenge.get().getDescription())
                    .difficulty(challengeToUpdate.getDifficulty() != null ? challengeToUpdate.getDifficulty() : dbChallenge.get().getDifficulty())
                    .points(challengeToUpdate.getPoints() != null ? challengeToUpdate.getPoints() : dbChallenge.get().getPoints())
                    // .testCases(!empty(challengeToUpdate.getTestCases()) ? challengeToUpdate.getTestCases() : dbChallenge.get().getTestCases()) // TODO: should be handled separately
                    .supportedLanguages(!empty(challengeToUpdate.getSupportedLanguages()) ? challengeToUpdate.getSupportedLanguages() : dbChallenge.get().getSupportedLanguages())
                    .build();
            return mapper.map(repository.save(updatedChallenge));
        } else {
            throw new ResourceNotFoundException("Challenge with ID " + id + " does not exist.");
        }
    }
    
    @Override
    public String deleteChallenge(Long id) {
        Optional<Challenge> challenge = repository.findById(id);
        if (challenge.isPresent()) {
            repository.delete(challenge.get());
            return "Challenge was deleted.";
        } else {
            throw new ResourceNotFoundException("Challenge with ID " + id + " does not exist.");
        }
    }

    
    private boolean empty(String s) {
        return s == null || s.trim().isEmpty();
    }
    private boolean empty(List<?> l) {
        return l == null || l.size() == 0;
    }
}
