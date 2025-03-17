package com.codequest.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.codequest.dto.challenge.ChallengeRequest;
import com.codequest.dto.challenge.ChallengeResponse;
import com.codequest.entity.Challenge;

@Mapper(componentModel = "spring")
public interface ChallengeMapper {
    List<ChallengeResponse> map(List<Challenge> challenges);

    Challenge requestToChallenge(ChallengeRequest request);

    default ChallengeResponse map(Challenge challenges) {
        return ChallengeResponse 
                    .builder()
            .build();
    }
}
