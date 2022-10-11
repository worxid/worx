package id.worx.worx.repository;

import id.worx.worx.common.enums.EmailTokenStatus;
import id.worx.worx.common.enums.EmailTokenType;
import id.worx.worx.entity.users.EmailToken;

import java.util.Optional;

public interface EmailTokenRepository extends BaseRepository<EmailToken, Long>{

    Optional<EmailToken> findByTokenAndTypeAndStatus(String token, EmailTokenType type, EmailTokenStatus status);
}
