package id.worx.worx.mapper;

import id.worx.worx.common.model.dto.DeviceDTO;
import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.entity.File;
import id.worx.worx.entity.devices.Device;
import id.worx.worx.web.model.request.FileDTO;
import id.worx.worx.web.model.request.FileRequestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FileMapper extends EntityMapper<FileDTO, File, UrlPresignedResponse> {

    @Mapping(target = "url", ignore = true)
    @Mapping(target = "fileId", ignore = true)
    UrlPresignedResponse toResponse(File file);
}
