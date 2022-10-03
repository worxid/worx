package id.worx.worx.mapper;

import id.worx.worx.entity.users.Users;
import id.worx.worx.model.request.users.UserRequest;
import id.worx.worx.model.response.users.UserResponse;

public interface UsersMapper extends EntityMapper<UserRequest, Users, UserResponse> {
}
