package id.worx.worx.repository;

import id.worx.worx.entity.DeviceGroups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceGroupsRepository  extends JpaRepository<DeviceGroups, Long> {
    void deleteByGroupId(Long groupId);
}
