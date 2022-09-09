package id.worx.worx.entity.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import id.worx.worx.entity.Audit;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "GROUPS")
public class Groups extends Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GROUP_NO", nullable = false)
    private Long id;

    private String name;
    private String color;

    @JsonIgnore
    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Users> users;
}
