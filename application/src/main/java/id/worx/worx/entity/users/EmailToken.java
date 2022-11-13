package id.worx.worx.entity.users;

import id.worx.worx.common.enums.EmailTokenStatus;
import id.worx.worx.common.enums.EmailTokenType;
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
@Table(name = "email_tokens")
public class EmailToken extends Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String token;
    private String email;
    @Enumerated(EnumType.ORDINAL)
    private EmailTokenStatus status;
    @Enumerated(EnumType.ORDINAL)
    private EmailTokenType type;
    private Instant expiredToken;
}
