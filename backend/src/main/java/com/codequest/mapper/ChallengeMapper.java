package com.codequest.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.codequest.dto.challenge.ChallengeRequest;
import com.codequest.dto.challenge.ChallengeResponse;
import com.codequest.entity.Challenge;
import com.codequest.helper.ChallengeHelper;

@Mapper(componentModel = "spring")
public interface ChallengeMapper {
    List<ChallengeResponse> map(List<Challenge> challenges);

    @Mapping(source = "supported_languages", target = "supportedLanguages")
    @Mapping(source = "test_cases", target = "testCases")
    Challenge challengeRequestToChallenge(ChallengeRequest request);

    default ChallengeResponse map(Challenge c) {
        return ChallengeResponse 
                    .builder()
                    .id(c.getId())
                    .title(c.getTitle())
                    .description(c.getDescription())
                    .difficulty(c.getDifficulty())
                    .points(c.getPoints())
                    .supportedLanguages(c.getSupportedLanguages())
                    .testCases(ChallengeHelper.mapTestCase(c.getTestCases()))
                    .build();
    }
}
