package id.worx.worx.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
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
        " AND (:label IS NULL OR upper(ft.label) LIKE upper(concat('%', :label, '%'))) " +
        " AND (:description IS NULL OR upper(ft.description) LIKE upper(concat('%', :description, '%'))) " +
        " AND (:createdOn IS NULL OR ft.createdOn <= :createdOn) " +
        " AND (:modifiedOn IS NULL OR ft.modifiedOn <= :modifiedOn) " +
        " AND (:from IS NULL OR :to IS NULL OR ft.createdOn BETWEEN :from AND :to) " +
        " AND (:assignedGroups IS NULL OR g.name IN :assignedGroups) " +
        " AND (:submissionCount IS NULL OR size(ft.forms) = :submissionCount) " +
        " AND (:globalSearch IS NULL OR (" +
        "  upper(ft.label) LIKE upper(concat('%', :globalSearch, '%')) " +
        "  OR upper(ft.description) LIKE upper(concat('%', :globalSearch, '%')) " +
        "  OR upper(g.name) LIKE upper(concat('%', :globalSearch, '%')) " +
        "))" +
        "GROUP BY ft.id")
    Page<FormTemplate> searchFormTemplates(
        @Nullable Long userId,
        @Nullable String label,
        @Nullable String description,
        @Nullable Instant createdOn,
        @Nullable Instant modifiedOn,
        @Nullable Instant from,
        @Nullable Instant to,
        @Nullable List<String> assignedGroups,
        @Nullable Integer submissionCount,
        @Nullable String globalSearch,
        Pageable pageable
    );
}
