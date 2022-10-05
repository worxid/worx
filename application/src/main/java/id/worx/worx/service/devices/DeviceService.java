package id.worx.worx.service.devices;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import id.worx.worx.web.model.request.UpdateDeviceRequest;

public interface DeviceService {

    DeviceDTO toDTO(Devices devices);

    Devices registerDevice(MobileRegisterRequest request);

    void softDeleteDeviceForMobile(String deviceCode);

    Devices updateInformation(String deviceCode, UpdateDeviceRequest deviceRequest);

    Devices getByDeviceCode(String deviceCode);
}
