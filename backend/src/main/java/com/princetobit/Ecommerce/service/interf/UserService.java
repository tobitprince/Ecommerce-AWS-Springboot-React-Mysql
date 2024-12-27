package com.princetobit.Ecommerce.service.interf;

import com.princetobit.Ecommerce.dto.LoginRequest;
import com.princetobit.Ecommerce.dto.Response;
import com.princetobit.Ecommerce.dto.UserDto;
import com.princetobit.Ecommerce.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
}
