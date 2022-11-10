package id.worx.worx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.File;
import id.worx.worx.entity.Form;

@Repository
public interface FileRepository extends JpaRepository<File, Long>, JpaSpecificationExecutor<Form> {

}