package id.worx.worx.mapper;

import id.worx.worx.common.model.response.users.UserDetailsResponse;
import id.worx.worx.entity.users.Users;
import id.worx.worx.web.model.request.UserUpdateRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsersUpdateMapper extends EntityMapper<UserUpdateRequest, Users, UserDetailsResponse> {
}
