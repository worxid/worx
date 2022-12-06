package id.worx.worx.repository;

import id.worx.worx.entity.Audit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository <T extends Audit, Long> extends JpaRepository<T, Long>, JpaSpecificationExecutor<T> {

}
