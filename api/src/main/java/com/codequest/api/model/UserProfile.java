package com.codequest.api.model;

import javax.persistence.*;
import lombok.*;



@Entity
// Might as well add an all arguments constructor and a builder
// so you can build a profile user on the fly
@Setter @Getter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserProfile {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private int id;
  @OneToOne
  private User user;
  private String firstName;
  // last name, email, etc.
}
