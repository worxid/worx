package id.worx.worx.mapper;

import id.worx.worx.entity.devices.Devices;
import id.worx.worx.model.request.devices.DeviceRequest;
import id.worx.worx.model.response.devices.DeviceResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DeviceMapper extends EntityMapper<DeviceRequest, Devices, DeviceResponse>{
}
