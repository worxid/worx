package id.worx.worx.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.FormTemplate;

@Repository
public interface FormTemplateRepository
        extends JpaRepository<FormTemplate, Long>, JpaSpecificationExecutor<FormTemplate> {

    Optional<FormTemplate> findByUrlCode(String urlCode);

}
