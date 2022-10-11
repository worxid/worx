package id.worx.worx.mapper;

import id.worx.worx.common.model.request.users.UserRequest;
import id.worx.worx.common.model.response.users.UserResponse;
import id.worx.worx.entity.users.Users;

public interface UsersMapper extends EntityMapper<UserRequest, Users, UserResponse> {
}
