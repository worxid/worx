package id.worx.worx.service;

import id.worx.worx.model.request.devices.DeviceSearchRequest;
import id.worx.worx.data.response.PagingResponseModel;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.model.request.devices.UpdateDeviceRequest;
import id.worx.worx.model.response.devices.DeviceResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DeviceWebService {

    Devices getById(Long id);
    List<Devices> getAllDevices();
    Devices updateDeviceLabel(Long id, UpdateDeviceRequest request);
    Devices approveDevice(Long id,UpdateDeviceRequest request);
    Devices updateDeviceGroup(Long id,UpdateDeviceRequest request);
    void deleteDevice(Long id);
    DeviceResponse toDto(Devices devices);
    PagingResponseModel<DeviceResponse> getAllDevicesWithPage(DeviceSearchRequest deviceSearchRequest, Pageable pageable);
}
