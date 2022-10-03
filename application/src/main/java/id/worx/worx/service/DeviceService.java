package id.worx.worx.service;

import id.worx.worx.data.dto.DeviceDTO;
import id.worx.worx.data.request.DeviceRequest;
import id.worx.worx.data.request.DeviceSearchRequest;
import id.worx.worx.data.response.PagingResponseModel;
import id.worx.worx.entity.devices.Devices;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DeviceService {

    Devices getById(Long id);
    List<Devices> getAllDevices();
    Devices updateDeviceLabel(Long id, DeviceRequest request);
    Devices approveDevice(Long id,DeviceRequest request);
    Devices updateDeviceGroup(Long id,DeviceRequest request);
    void deleteDevice(Long id);
    DeviceDTO toDto(Devices devices);
    PagingResponseModel<DeviceDTO> getAllDevicesWithPage(DeviceSearchRequest deviceSearchRequest, Pageable pageable);
}
