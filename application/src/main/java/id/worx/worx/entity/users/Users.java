package id.worx.worx.entity.users;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

import id.worx.worx.common.enums.UserStatus;
import id.worx.worx.entity.Audit;
import id.worx.worx.entity.File;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Users extends Audit {

    private static final long serialVersionUID = 4324739476207136765L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "fullname", nullable = false)
    private String fullname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private UserStatus status;

    @Column(name = "organization_name", nullable = false)
    private String organizationName;

    @Column(name = "organization_code", nullable = false)
    private String organizationCode;

    @Column(name = "country", nullable = false)
    private String country;

    @OneToOne
    @JoinColumn(name = "dashboard_logo", referencedColumnName = "id")
    private File dashboardLogo;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

}
