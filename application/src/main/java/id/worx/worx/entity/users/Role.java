package id.worx.worx.entity.users;

import lombok.*;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "roles")
public class Role implements Serializable {

    private static final long serialVersionUID = -4204989054663639094L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

}
