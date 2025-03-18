package com.codequest.helper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.codequest.dto.testcase.TestCaseResponse;
import com.codequest.entity.TestCase;

@Component
public class ChallengeHelper {
    public static List<TestCaseResponse> mapTestCase(List<TestCase> testCases){
        List<TestCaseResponse> response = new ArrayList<>();
        for(TestCase t : testCases){
            response.add(
                TestCaseResponse
                    .builder()
                    .id(t.getId())
                    .input(t.getInput())
                    .expected_output(t.getExpectedOutput())
                    .hidden(t.isHidden())
                    .build()
            );
        }
        return response;
    }
}
