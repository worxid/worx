package id.worx.worx.mapper;

import id.worx.worx.common.model.response.users.UserDetailsResponse;
import id.worx.worx.entity.users.Users;
import id.worx.worx.web.model.request.UserUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsersUpdateMapper extends EntityMapper<UserUpdateRequest, Users, UserDetailsResponse> {
    @Mapping(target = "logoUrl", ignore = true)
    UserDetailsResponse toResponse(Users users);
}
