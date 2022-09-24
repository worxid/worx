package id.worx.worx.entity.users;

import id.worx.worx.entity.Audit;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "refresh_token")
public class RefreshToken extends Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "ID", referencedColumnName = "id")
    private Users user;

    @Column(nullable = false, unique = true)
    private String token;
    @Column(name = "expiry_date", nullable = false)
    private Instant expiryDate;
}
