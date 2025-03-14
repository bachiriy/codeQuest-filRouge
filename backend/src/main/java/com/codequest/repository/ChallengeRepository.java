package com.codequest.repository;

import com.codequest.entity.Challenge;
import com.codequest.entity.DifficultyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByDifficulty(DifficultyLevel difficulty);
} 
