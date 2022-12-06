package id.worx.worx.mapper;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DeviceMapper extends EntityMapper<MobileRegisterRequest, Device, DeviceDTO> {

    @Mapping(target = "groups", ignore = true)
    DeviceDTO toResponse(Device device);

}
