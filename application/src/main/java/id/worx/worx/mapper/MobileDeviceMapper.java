package id.worx.worx.mapper;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.web.model.request.UpdateDeviceRequest;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MobileDeviceMapper extends EntityMapper<UpdateDeviceRequest, Devices, DeviceDTO> {
}
