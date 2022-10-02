package id.worx.worx.mapper;

import id.worx.worx.entity.devices.Devices;
import id.worx.worx.model.request.devices.UpdateDeviceRequest;
import id.worx.worx.model.response.devices.DeviceResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MobileDeviceMapper extends EntityMapper<UpdateDeviceRequest, Devices, DeviceResponse> {
}
