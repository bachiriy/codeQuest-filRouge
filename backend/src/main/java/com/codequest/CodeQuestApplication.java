package com.codequest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:application.yml")
public class CodeQuestApplication {
    public static void main(String[] args) {
        SpringApplication.run(CodeQuestApplication.class, args);
    }
} 
