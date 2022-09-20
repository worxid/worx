package id.worx.worx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

}
