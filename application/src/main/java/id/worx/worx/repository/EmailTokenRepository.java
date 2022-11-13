package id.worx.worx.repository;

import id.worx.worx.common.enums.EmailTokenStatus;
import id.worx.worx.common.enums.EmailTokenType;
import id.worx.worx.entity.users.EmailToken;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface EmailTokenRepository extends BaseRepository<EmailToken, Long>{

    Optional<EmailToken> findByTokenAndTypeAndStatus(String token, EmailTokenType type, EmailTokenStatus status);
    Optional<EmailToken> findByEmailAndTypeAndStatus(String email, EmailTokenType type, EmailTokenStatus status);

    @Query(value = "SELECT et.id FROM EmailToken et WHERE et.expiredToken < :date")
    List<Long> getAllByLessThan(Instant date);
}
