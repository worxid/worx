package id.worx.worx.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import id.worx.worx.data.response.PagingResponseModel;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.model.dto.DeviceDTO;
import id.worx.worx.model.request.devices.DeviceSearchRequest;
import id.worx.worx.model.request.devices.UpdateDeviceRequest;

public interface DeviceWebService {

    Devices getById(Long id);

    List<Devices> getAllDevices();

    Devices updateDeviceLabel(Long id, UpdateDeviceRequest request);

    Devices approveDevice(Long id, UpdateDeviceRequest request);

    Devices updateDeviceGroup(Long id, UpdateDeviceRequest request);

    void deleteDevice(Long id);

    DeviceDTO toDto(Devices devices);

    PagingResponseModel<DeviceDTO> getAllDevicesWithPage(DeviceSearchRequest deviceSearchRequest, Pageable pageable);
}
