package id.worx.worx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.Form;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {

}
