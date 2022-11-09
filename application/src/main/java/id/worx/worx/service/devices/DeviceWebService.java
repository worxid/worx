package id.worx.worx.service.devices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.request.device.ApproveRequest;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.web.model.request.DeviceSearchRequest;
import id.worx.worx.web.model.request.UpdateDeviceRequest;

public interface DeviceWebService {

    Device getById(Long id);

    List<Device> getAllDevices();

    Device updateDeviceLabel(Long id, UpdateDeviceRequest request);

    Device approveDevice(Long id, ApproveRequest request);

    Device updateGroup(Long id, List<Long> groupIds);

    void deleteDevice(Long id);

    void deleteDevice(List<Long> ids);

    DeviceDTO toDto(Device devices);

    Page<Device> getAllDeviceWithPage(DeviceSearchRequest deviceSearchRequest, Pageable pageable);
}
