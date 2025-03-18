package com.codequest.dto.challenge;

import com.codequest.dto.testcase.TestCaseResponse;
import com.codequest.entity.DifficultyLevel;
import lombok.Data;
import java.util.List;
import lombok.Builder;

@Data
@Builder
public class ChallengeResponse {
    private Long id;
    private String title;
    private String description;
    private DifficultyLevel difficulty;
    private Integer points;
    private List<String> supportedLanguages;
    private List<TestCaseResponse> testCases;
} 
