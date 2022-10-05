package id.worx.worx.mapper;

import id.worx.worx.entity.devices.Devices;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;
import id.worx.worx.model.dto.DeviceDTO;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DeviceMapper extends EntityMapper<MobileRegisterRequest, Devices, DeviceDTO> {
}
