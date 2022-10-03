package id.worx.worx.repository;

import id.worx.worx.entity.users.Users;

import java.util.Optional;

public interface UsersRepository extends BaseRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);
}
