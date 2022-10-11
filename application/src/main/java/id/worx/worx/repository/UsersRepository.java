package id.worx.worx.repository;

import id.worx.worx.entity.users.Users;

import java.util.Optional;

public interface UsersRepository extends BaseRepository<Users, Long> {

    Optional<Users> findByEmail(String email);

    Optional<Users> findByOrganizationCode(String organizationCode);

}
