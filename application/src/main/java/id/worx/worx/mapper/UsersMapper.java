package id.worx.worx.mapper;

import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.common.model.response.users.UserResponse;
import id.worx.worx.entity.users.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UsersMapper extends EntityMapper<UserRequest, Users, UserResponse> {
}
