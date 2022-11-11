package id.worx.worx.repository;

import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.projection.GroupSearchProjection;
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

    @Query(nativeQuery = true, value = "SELECT wG.id, group_name as name, group_color as color, is_default as isDefault," +
        " coalesce(form_group_cnt,0) as formCount, coalesce(dev_group_cnt,0) as deviceCount " +
        "FROM " +
        "(SELECT * " +
        "FROM worx_groups " +
        "WHERE (:id is null OR(id= :id)) " +
        "      AND (:name is null OR(lower(group_name) like concat('%',lower(:name),'%'))) " +
        "      AND (:color is null OR(lower(group_color) like concat('%',lower(:color),'%'))) " +
        "      AND user_id= :userId " +
        ") as wG " +
        "LEFT JOIN " +
        "(SELECT group_id as id, COUNT(group_id) as dev_group_cnt " +
        "FROM device_groups " +
        "GROUP BY group_id " +
        ") as dG " +
        "ON wG.id=dG.id " +
        "LEFT JOIN " +
        "(SELECT group_id as id, COUNT(group_id) as form_group_cnt " +
        "FROM template_groups " +
        "GROUP BY group_id " +
        ") as tG " +
        "ON wG.id=tG.id " +
        "WHERE (:templateCount is null OR(coalesce(form_group_cnt,0)=:templateCount)) " +
        "AND (:deviceCount is null OR(coalesce(dev_group_cnt,0)=:deviceCount))")
    Page<GroupSearchProjection> search(Long id, String name, String color, Long userId, Integer deviceCount, Integer templateCount, Pageable pageable);

    Optional<Group> findByIdAndUserId(Long id, Long userId);
    Optional<Group> findByIsDefaultTrueAndUserId(Long userId);

    List<Group> findAllByUserId(Long userId);

    @Query(nativeQuery = true,value = "SELECT * FROM worx_groups WHERE id in(:ids) AND user_id=:userId")
    List<Group> findByIdsAndUserId(List<Long> ids, Long userId);

}
