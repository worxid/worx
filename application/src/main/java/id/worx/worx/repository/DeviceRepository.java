package id.worx.worx.repository;

import id.worx.worx.entity.devices.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceRepository extends BaseRepository<Device, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM devices " +
        "WHERE (:label is null OR(lower(label)like concat('%',lower(:label),'%'))) " +
        "AND (:deviceModel is null OR(lower(device_model)like concat('%',lower(:deviceModel),'%'))) " +
        "AND (:deviceOsVersion is null OR(lower(device_os_version)like concat('%',lower(:deviceOsVersion),'%'))) " +
        "AND (:deviceAppVersion is null OR(lower(device_app_version)like concat('%',lower(:deviceAppVersion),'%'))) " +
        "AND (:deviceCode is null OR(lower(device_code)like concat('%',lower(:deviceCode),'%'))) " +
        "AND deleted= FALSE " +
        "AND (:globalSearch is null " +
        "   OR (lower(label)like concat('%',lower(:globalSearch),'%')) " +
        "   OR (lower(device_model)like concat('%',lower(:globalSearch),'%')) " +
        "   OR (lower(device_os_version)like concat('%',lower(:globalSearch),'%')) " +
        "   OR (lower(device_app_version)like concat('%',lower(:globalSearch),'%')) " +
        "   OR (lower(device_code)like concat('%',lower(:globalSearch),'%')) "+
        ") ")
    Page<Device> search(String label,
                         String deviceModel,
                         String deviceOsVersion,
                         String deviceAppVersion,
                         String deviceCode,
                         String globalSearch,
                         Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM devices WHERE deleted= FALSE")
    List<Device> getAllDeviceByDeleted();
    Optional<Device> findByDeviceCode(String deviceCode);
    Optional<Device> findByDeviceCodeAndDeleted(String deviceCode, boolean deleted);

    Optional<Device> findByIdAndDeleted(Long deviceNo, boolean deleted);

}
