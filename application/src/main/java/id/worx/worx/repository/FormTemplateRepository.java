package id.worx.worx.repository;

import java.util.List;
import java.util.Optional;

import id.worx.worx.web.model.request.FormTemplateSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.FormTemplate;

import javax.annotation.Nullable;

@Repository
public interface FormTemplateRepository
        extends JpaRepository<FormTemplate, Long>, JpaSpecificationExecutor<FormTemplate> {

    Optional<FormTemplate> findByUrlCode(String urlCode);

    Optional<FormTemplate> findByIdAndUserId(Long id, Long userId);

    List<FormTemplate> findAllByUserId(Long userId);

    @Query(value = "SELECT ft FROM FormTemplate ft " +
        " INNER JOIN ft.forms f " +
        " INNER JOIN ft.assignedGroups g " +
        "WHERE (:userId IS NULL OR ft.userId = :userId) " +
        " AND (:#{#search.label} IS NULL OR upper(ft.label) LIKE upper(concat('%', :#{#search.label}, '%'))) " +
        " AND (:#{#search.description} IS NULL OR upper(ft.description) LIKE upper(concat('%', :#{#search.description}, '%'))) " +
        " AND (:#{#search.createdOn} IS NULL OR ft.createdOn <= :#{#search.createdOn}) " +
        " AND (:#{#search.modifiedOn} IS NULL OR ft.modifiedOn <= :#{#search.modifiedOn}) " +
        " AND (:#{#search.from} IS NULL OR :#{#search.to} IS NULL OR ft.createdOn BETWEEN :#{#search.from} AND :#{#search.to}) " +
        " AND (:#{#search.assignedGroups} IS NULL OR g.name IN :#{#search.assignedGroups}) " +
        " AND (:#{#search.submissionCount} IS NULL OR size(ft.forms) = :#{#search.submissionCount}) " +
        " AND (:#{#search.globalSearch} IS NULL OR (" +
        "  upper(ft.label) LIKE upper(concat('%', :#{#search.globalSearch}, '%')) " +
        "  OR upper(ft.description) LIKE upper(concat('%', :#{#search.globalSearch}, '%')) " +
        "  OR upper(g.name) LIKE upper(concat('%', :#{#search.globalSearch}, '%')) " +
        ")) " +
        "GROUP BY ft.id, g.name")
    Page<FormTemplate> searchFormTemplates(
        @Nullable Long userId,
        @Param("search") FormTemplateSearchRequest search,
        Pageable pageable
    );
}
