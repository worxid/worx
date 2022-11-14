package id.worx.worx.service.devices;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.request.device.ApproveRequest;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import id.worx.worx.web.model.request.DeviceSearchRequest;
import id.worx.worx.web.model.request.UpdateDeviceRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DeviceService {

    DeviceDTO toDto(Device devices);

    Device registerDevice(MobileRegisterRequest request);

    void softDeleteDeviceForMobile(String deviceCode);

    Device updateInformation(String deviceCode, UpdateDeviceRequest deviceRequest);

    Device getByDeviceCode(String deviceCode);


    Device getById(Long id);

    List<Device> getAllDevices();

    Device updateDeviceLabel(Long id, UpdateDeviceRequest request);

    Device approveDevice(Long id, ApproveRequest request);

    Device updateGroup(Long id, List<Long> groupIds);

    void deleteDevice(Long id);

    void deleteDevice(List<Long> ids);

    DeviceDTO toDTOMobile(Device devices);

    Page<Device> search(DeviceSearchRequest deviceSearchRequest, Pageable pageable);
}
