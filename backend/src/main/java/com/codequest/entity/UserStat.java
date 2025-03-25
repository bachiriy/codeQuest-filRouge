package com.codequest.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_stats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStat {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "challenges_completed")
    private Integer challengesCompleted;
    
    private Integer rank;
    
    @Column(name = "xp_points")
    private Integer xpPoints;
    
    @Column(name = "favorite_language")
    private String favoriteLanguage;
    
    @OneToOne(mappedBy = "stats")
    private User user;
}