package id.worx.worx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.FormTemplate;

@Repository
public interface FormTemplateRepository extends JpaRepository<FormTemplate, Long> {

}
