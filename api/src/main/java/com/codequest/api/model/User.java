package com.codequest.api.model;

import javax.persistence.*;
import lombok.*;

@Entity
@Table(name="users")
// Using Lombok as an alternative to filling out getters and setters
@Getter @Setter @NoArgsConstructor
public class User {
  @Id
  private String username;
  private String password;
  // Need to specify that we want MariaDB's TinyInt(1) approach to Bools.
  @Column(nullable = false, columnDefinition = "BOOLEAN")
  private Boolean enabled;
}
