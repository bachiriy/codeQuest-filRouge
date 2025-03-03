package com.codequest.api.model;

import javax.persistence.*;
import lombok.*;


@Entity
@Table(name = "authorities")
@Getter @Setter @NoArgsConstructor
@IdClass(AuthorityId.class)
public class Authorities {
  @Id
  String username;
  @Id
  String authority;
}
