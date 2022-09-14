package id.worx.worx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.FormTemplateGroup;

@Repository
public interface FormTemplateGroupRepository extends JpaRepository<FormTemplateGroup, Long> {

}
