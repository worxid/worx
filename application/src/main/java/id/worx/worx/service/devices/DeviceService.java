package id.worx.worx.service.devices;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import id.worx.worx.web.model.request.UpdateDeviceRequest;

public interface DeviceService {

    DeviceDTO toDTO(Device devices);

    Device registerDevice(MobileRegisterRequest request);

    void softDeleteDeviceForMobile(String deviceCode);

    Device updateInformation(String deviceCode, UpdateDeviceRequest deviceRequest);

    Device getByDeviceCode(String deviceCode);
}
