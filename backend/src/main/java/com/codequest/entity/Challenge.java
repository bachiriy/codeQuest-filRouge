package com.codequest.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "challenges")
@Builder
@AllArgsConstructor
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    private DifficultyLevel difficulty;
    
    private Integer points;
    
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    private List<TestCase> testCases;
    
    @ElementCollection
    private List<String> supportedLanguages;
} 
