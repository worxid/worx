package id.worx.worx.mapper;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.entity.devices.Devices;
import id.worx.worx.mobile.model.request.MobileRegisterRequest;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DeviceMapper extends EntityMapper<MobileRegisterRequest, Devices, DeviceDTO> {

    @Mapping(target = "groups", ignore = true)
    DeviceDTO toResponse(Devices device);

}