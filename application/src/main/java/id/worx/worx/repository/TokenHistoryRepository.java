package id.worx.worx.repository;

import id.worx.worx.entity.devices.Devices;
import id.worx.worx.entity.users.TokenHistory;

import java.util.Optional;

public interface TokenHistoryRepository extends BaseRepository<TokenHistory, Long>{

    Optional<TokenHistory> findByTokenAndEmailAndStatus(String token, String email, String status);
}
