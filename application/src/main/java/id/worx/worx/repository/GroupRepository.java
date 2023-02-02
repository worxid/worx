package id.worx.worx.repository;

import java.util.List;
import java.util.Optional;

import id.worx.worx.web.model.request.GroupSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import id.worx.worx.common.model.projection.GroupSearchProjection;
import id.worx.worx.entity.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM worx_groups WHERE id in(:groupIds)")
    List<Group> getAllByIds(List<Long> groupIds);

    @Query(nativeQuery = true, value = "SELECT wG.id, group_name as name, group_color as color, is_default as isDefault," +
        " coalesce(form_group_cnt,0) as formCount, coalesce(dev_group_cnt,0) as deviceCount " +
        "FROM " +
        "(SELECT * " +
        "FROM worx_groups " +
        "WHERE (:#{#request.id} is null OR(id= :#{#request.id})) " +
        "      AND (:#{#request.name} is null OR(lower(group_name) like concat('%',lower(:#{#request.name}),'%'))) " +
        "      AND (:#{#request.color} is null OR(lower(group_color) like concat('%',lower(:#{#request.color}),'%'))) " +
        "      AND (:globalSearch is null " +
        "               OR(lower(group_name) like concat('%',lower(:globalSearch),'%')) " +
        "               OR(lower(group_color) like concat('%',lower(:globalSearch   ),'%')) " +
        "      ) " +
        "      AND user_id= :userId " +
        ") as wG " +
        "LEFT JOIN " +
        "(SELECT group_id as id, COUNT(group_id) as dev_group_cnt " +
        "FROM device_groups inner join devices as dvc on dvc.id = device_groups.device_id where dvc.deleted = false " +
        "GROUP BY group_id " +
        ") as dG " +
        "ON wG.id=dG.id " +
        "LEFT JOIN " +
        "(SELECT group_id as id, COUNT(group_id) as form_group_cnt " +
        "FROM template_groups inner join form_templates as ft on ft.id = template_groups.template_id where ft.deleted = false " +
        "GROUP BY group_id " +
        ") as tG " +
        "ON wG.id=tG.id " +
        "WHERE (:#{#request.formCount} is null OR(coalesce(form_group_cnt,0)=:#{#request.formCount})) " +
        "AND (:#{#request.deviceCount} is null OR(coalesce(dev_group_cnt,0)=:#{#request.deviceCount})) " +
        "AND (:globalCountSearch is null  " +
        "       OR(coalesce(form_group_cnt,0)=:globalCountSearch) " +
        "       OR(coalesce(dev_group_cnt,0)=:globalCountSearch) " +
        ")")
    Page<GroupSearchProjection> search(GroupSearchRequest request,String globalSearch, Long userId, Integer globalCountSearch, Pageable pageable);

    Optional<Group> findByIdAndUserId(Long id, Long userId);
    Optional<Group> findByIsDefaultTrueAndUserId(Long userId);

    List<Group> findAllByUserId(Long userId);

    @Query(nativeQuery = true,value = "SELECT * FROM worx_groups WHERE id in(:ids) AND user_id=:userId")
    List<Group> findByIdsAndUserId(List<Long> ids, Long userId);

}
