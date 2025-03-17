package com.codequest.dto.challenge;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Builder;
import java.util.List;

import com.codequest.dto.testcase.TestCaseRequest;
import com.codequest.entity.DifficultyLevel;

@Data
@Builder
public class ChallengeRequest {
    @NotNull(message = "Title is required")
    private String title;

    @NotNull(message = "Description is required")
    private String description;

    @NotNull(message = "Difficulty is required")
    private DifficultyLevel difficulty;

    @NotNull(message = "Supported Languages is required")
    private List<String> supportedLanguages;

    @NotNull(message = "Test Cases is required")
    private List<TestCaseRequest> test_cases;
}
