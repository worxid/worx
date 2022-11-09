package id.worx.worx.repository;

import id.worx.worx.entity.users.RefreshToken;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RefreshTokenRepository extends BaseRepository<RefreshToken, Long>{
    Optional<RefreshToken> findByToken(String token);
    @Query(value = "delete from refresh_tokens where expiry_date < :date ", nativeQuery = true)
    void deleteAllByDate(String date);
}
