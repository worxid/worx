package id.worx.worx.mapper;

import id.worx.worx.data.dto.DeviceDTO;
import id.worx.worx.entity.devices.Devices;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DeviceMapper {

    @Mapping(target = "groups", ignore = true)
    DeviceDTO toDto(Devices device);
}
