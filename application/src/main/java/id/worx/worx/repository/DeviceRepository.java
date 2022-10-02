package id.worx.worx.repository;

import id.worx.worx.entity.devices.Devices;

import java.util.Optional;

public interface DeviceRepository extends BaseRepository<Devices, Long> {

    Optional<Devices> findByDeviceCode(String deviceCode);
    Optional<Devices> findByDeviceCodeAndDeleted(String deviceCode, boolean deleted);
    Optional<Devices> findByIdAndDeleted(Long deviceNo, boolean deleted);

}
