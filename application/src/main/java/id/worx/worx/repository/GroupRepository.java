package id.worx.worx.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.Group;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM worx_groups WHERE id in(:groupIds)")
    List<Group> getAllByIds(List<Long> groupIds);

    @Query(nativeQuery = true, value = "SELECT * FROM worx_groups " +
        "WHERE (:id is null OR(id= :id)) " +
        "AND (:name is null OR(lower(group_name) like concat('%',lower(:name),'%'))) " +
        "AND (:color is null OR(lower(group_color) like concat('%',lower(:color),'%'))) " +
        "AND user_id= :userId " +
        "AND (:deviceCount is null OR(id in(" +
        "       SELECT group_id " +
        "       FROM device_groups " +
        "       GROUP BY group_id " +
        "       HAVING count(device_id)= :deviceCount))) " +
        "AND (:templateCount is null OR(id in(" +
        "       SELECT group_id " +
        "       FROM template_groups " +
        "       GROUP BY group_id " +
        "       HAVING COUNT(group_id)= :templateCount))) ")
    Page<Group> search(Long id, String name, String color, Long userId,Integer deviceCount, Integer templateCount, Pageable pageable);

    Optional<Group> findByIdAndUserId(Long id, Long userId);

    List<Group> findAllByUserId(Long userId);

    @Query(nativeQuery = true,value = "SELECT * FROM worx_groups WHERE id in(:ids) AND user_id=:userId")
    List<Group> findByIdsAndUserId(List<Long> ids, Long userId);
}
