package com.codequest.dto.testcase;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TestCaseResponse {
    private Long id;
    private String input;
    private String expected_output;
    private boolean hidden;
}
