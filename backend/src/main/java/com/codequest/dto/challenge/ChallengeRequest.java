package com.codequest.dto.challenge;

import jakarta.validation.Valid;
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

    @NotNull(message = "Points is required")
    private String points;

    @NotNull(message = "Difficulty is required(EASY, MEDIUM, HARD, EXPERT)")
    private DifficultyLevel difficulty;

    @NotNull(message = "Supported Languages is required")
    private List<String> supported_languages;

    @NotNull(message = "Must include test cases")
    @Valid
    private List<TestCaseRequest> test_cases;
}
