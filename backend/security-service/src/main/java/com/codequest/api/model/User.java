// package com.codequest.api.model;

// import javax.persistence.*;
// import lombok.*;

// @Entity
// @Table(name="users")
// @Builder
// @AllArgsConstructor
// // Using Lombok as an alternative to filling out getters and setters
// @Getter @Setter @NoArgsConstructor
// public class User {
//   @Id
//   private String username;
//   private String password;
//   // Need to specify that we want MariaDB's TinyInt(1) approach to Bools.
//   @Column(nullable = false, columnDefinition = "BOOLEAN")
//   private Boolean enabled;
// }



package com.codequest.api.model;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@Id
	private String id;
	@NotBlank(message = "Name is required")
	@NotNull(message = "Name is required")
	private String name;

	@NotBlank(message = "Username is required")
	@NotNull(message = "Username is required")
	private String username;

	@NotBlank(message = "Password is required")
	@NotNull(message = "Password is required")
	private String password;

	private Boolean enable;

	@ManyToMany
	private Set<Role> roles;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;
}
