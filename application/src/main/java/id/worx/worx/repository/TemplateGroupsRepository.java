package id.worx.worx.repository;

import id.worx.worx.entity.DeviceGroups;
import id.worx.worx.entity.TemplateGroups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateGroupsRepository extends JpaRepository<TemplateGroups, Long> {

    void deleteByGroupId(Long groupId);
}
