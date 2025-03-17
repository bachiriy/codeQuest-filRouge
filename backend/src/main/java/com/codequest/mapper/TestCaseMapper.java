package com.codequest.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.codequest.dto.testcase.TestCaseRequest;
import com.codequest.dto.testcase.TestCaseResponse;
import com.codequest.entity.TestCase;

@Mapper(componentModel = "spring")
public interface TestCaseMapper {

    List<TestCaseResponse> map(List<TestCase> testCases);

    @Mapping(target = "expectedOutput", source = "expected_output")
    @Mapping(target = "hidden", source = "_hidden")
    TestCase requestToTestCase(TestCaseRequest request);

    default TestCaseResponse map(TestCase testCase) {
        return TestCaseResponse
                    .builder()
            .build();
    }
}
