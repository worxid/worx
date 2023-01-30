package id.worx.worx.mapper;

import id.worx.worx.common.model.projection.GroupSearchProjection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import id.worx.worx.common.model.dto.GroupDTO;
import id.worx.worx.common.model.request.GroupRequest;
import id.worx.worx.entity.Group;
import id.worx.worx.web.model.request.GroupUpdateRequest;

@Mapper(componentModel = "spring")
public interface GroupMapper {

    GroupDTO toDTO(Group group);

    GroupDTO toDTO(GroupSearchProjection groupSearchProjection);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "isDefault", ignore = true)
    @Mapping(target = "templates", ignore = true)
    @Mapping(target = "devices", ignore = true)
    Group fromRequest(GroupRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "templates", ignore = true)
    @Mapping(target = "devices", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "createdOn", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "modifiedOn", ignore = true)
    @Mapping(target = "modifiedBy", ignore = true)
    @Mapping(target = "isDefault", ignore = true)
    void update(@MappingTarget Group group, GroupUpdateRequest request);

}
