package id.worx.worx.repository;

import id.worx.worx.entity.users.RefreshToken;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends BaseRepository<RefreshToken, Long>{
    Optional<RefreshToken> findByToken(String token);
    @Query(value = "SELECT r.id FROM RefreshToken r WHERE r.expiryDate < :date")
    List<Long> getAllByLessThan(Instant date);
}
