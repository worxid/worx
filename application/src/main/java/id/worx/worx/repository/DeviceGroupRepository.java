package id.worx.worx.repository;

import id.worx.worx.entity.devices.DeviceGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DeviceGroupRepository extends JpaRepository<DeviceGroup,Long> {
    @Query(nativeQuery = true,value = "SELECT * FROM device_groups WHERE device_id= :deviceId")
    List<DeviceGroup> getDeviceGroupBydeviceId(Long deviceId);

    @Query(nativeQuery = true, value = "SELECT group_name FROM worx_groups WHERE id in(SELECT group_id FROM device_groups WHERE device_id = :deviceId)")
    List<String> getGroupNameByDeviceId(Long deviceId);
}
