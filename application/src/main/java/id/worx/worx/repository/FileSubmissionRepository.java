package id.worx.worx.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import id.worx.worx.entity.File;
import id.worx.worx.entity.FileSubmission;

@Repository
public interface FileSubmissionRepository
        extends JpaRepository<FileSubmission, Long>, JpaSpecificationExecutor<FileSubmission> {

    Optional<FileSubmission> findByFile(File file);

}
