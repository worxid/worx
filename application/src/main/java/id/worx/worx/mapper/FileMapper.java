package id.worx.worx.mapper;

import id.worx.worx.common.model.response.UrlPresignedResponse;
import id.worx.worx.entity.File;
import id.worx.worx.web.model.request.FileDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FileMapper extends EntityMapper<FileDTO, File, UrlPresignedResponse> {

    @Mapping(target = "url", ignore = true)
    UrlPresignedResponse toResponse(File file);
}
