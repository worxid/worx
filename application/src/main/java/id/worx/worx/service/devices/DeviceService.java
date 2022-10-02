package id.worx.worx.service.devices;

import id.worx.worx.data.dto.FormTemplateDTO;
import id.worx.worx.entity.FormTemplate;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.model.request.devices.DeviceRequest;
import id.worx.worx.model.request.devices.UpdateDeviceRequest;
import id.worx.worx.model.response.devices.DeviceResponse;
import id.worx.worx.service.BaseService;

public interface DeviceService {

    DeviceResponse toDTO(Devices devices);

    Devices registerDevice(DeviceRequest request);
    void softDeleteDeviceForMobile(String deviceCode);

    Devices updateInformation(String deviceCode, UpdateDeviceRequest deviceRequest);

    Devices getByDeviceCode(String deviceCode);
}
