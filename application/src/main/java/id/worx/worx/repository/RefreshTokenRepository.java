package id.worx.worx.repository;

import id.worx.worx.entity.users.RefreshToken;
import id.worx.worx.entity.users.Users;

import java.sql.Ref;
import java.util.Optional;

public interface RefreshTokenRepository extends BaseRepository<RefreshToken, Long>{
    Optional<RefreshToken> findByToken(String token);
}
