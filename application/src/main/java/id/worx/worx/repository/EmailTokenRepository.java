package id.worx.worx.repository;

import id.worx.worx.common.enums.EmailTokenStatus;
import id.worx.worx.common.enums.EmailTokenType;
import id.worx.worx.entity.users.EmailToken;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmailTokenRepository extends BaseRepository<EmailToken, Long>{

    Optional<EmailToken> findByTokenAndTypeAndStatus(String token, EmailTokenType type, EmailTokenStatus status);
    Optional<EmailToken> findByEmailAndTypeAndStatus(String email, EmailTokenType type, EmailTokenStatus status);

    @Query(value = "delete from email_tokens where expired_token < :date ", nativeQuery = true)
    void deleteAllByDate(String date);
}
