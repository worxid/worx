package id.worx.worx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.FileSubmission;

@Repository
public interface FileSubmissionRepository
        extends JpaRepository<FileSubmission, Long>, JpaSpecificationExecutor<FileSubmission> {

}
