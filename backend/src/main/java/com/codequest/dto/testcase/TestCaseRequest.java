package com.codequest.dto.testcase;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Data
public class TestCaseRequest {
    @NotNull(message = "input is required")
    private String input;

    @NotNull(message = "Expected Output is required")
    private String expected_output;

    @NotNull(message = "Challenge ID is required")
    private Long challenge_id;

    @NotNull(message = "Must say if hiddern")
    private boolean is_hidden;
}
