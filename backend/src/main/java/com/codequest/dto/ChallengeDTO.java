package com.codequest.dto;

import com.codequest.entity.DifficultyLevel;
import lombok.Data;
import java.util.List;

@Data
public class ChallengeDTO {
    private Long id;
    private String title;
    private String description;
    private DifficultyLevel difficulty;
    private Integer points;
    private List<String> supportedLanguages;
    private List<TestCaseDTO> testCases;
} 