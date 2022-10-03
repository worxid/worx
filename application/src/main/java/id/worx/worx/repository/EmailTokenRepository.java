package id.worx.worx.repository;

import id.worx.worx.entity.users.EmailToken;
import id.worx.worx.enums.EmailTokenStatus;
import id.worx.worx.enums.EmailTokenType;

import java.util.Optional;

public interface EmailTokenRepository extends BaseRepository<EmailToken, Long>{

    Optional<EmailToken> findByTokenAndEmailAndStatusAndType(String token, String email, String status, String type);
    Optional<EmailToken> findByTokenAndTypeAndStatus(String token, EmailTokenType type, EmailTokenStatus status);
}
