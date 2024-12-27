package com.princetobit.Ecommerce.service.impl;

import com.princetobit.Ecommerce.dto.LoginRequest;
import com.princetobit.Ecommerce.dto.Response;
import com.princetobit.Ecommerce.dto.UserDto;
import com.princetobit.Ecommerce.entity.User;
import com.princetobit.Ecommerce.enums.UserRole;
import com.princetobit.Ecommerce.exception.InvalidCredentialsException;
import com.princetobit.Ecommerce.exception.NotFoundException;
import com.princetobit.Ecommerce.mapper.EntityDtoMapper;
import com.princetobit.Ecommerce.repository.UserRepo;
import com.princetobit.Ecommerce.security.JWTUtils;
import com.princetobit.Ecommerce.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtils jwtUtils;
    private final EntityDtoMapper entityDtoMapper;

    @Override
    public Response registerUser(UserDto registrationRequest) {
        UserRole role = UserRole.USER;

        if (registrationRequest.getRole() != null && registrationRequest.getRole().equalsIgnoreCase("admin")){
            role = UserRole.ADMIN;
        }
        User user = User.builder()
                .name(registrationRequest.getName())
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .phoneNumber(registrationRequest.getPhoneNumber())
                .role(role)
                .build();

        User savedUser = userRepo.save(user);

        UserDto userDto = entityDtoMapper.mapUserToDtoBasic(savedUser);
        return Response.builder()
                .status(200)
                .message("User Successfully Added")
                .user(userDto)
                .build();
    }


    @Override
    public Response loginUser(LoginRequest loginRequest) {

        User user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new NotFoundException("Email not found"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new InvalidCredentialsException("Password does not match");
        }
        String token = jwtUtils.generateToken(user);

        return Response.builder()
                .status(200)
                .message("User Logged In Successfully")
                .token(token)
                .expirationTime("6 Months")
                .role(user.getRole().name())
                .build();
    }

    @Override
    public Response getAllUsers() {

        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(entityDtoMapper::mapUserToDtoBasic)
                .toList();
        return Response.builder()
                .status(200)
                .message("Successful")
                .userList(userDtos)
                .build();
    }

    @Override
    public User getLoginUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        log.info("User Email is: {}", email);
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
    }

    @Override
    public Response getUserInfoAndOrderHistory() {

        User user = getLoginUser();
        UserDto userDto = entityDtoMapper.mapUserToDtoPlusAddressAndOrderHistory(user);
        return Response.builder()
                .status(200)
                .user(userDto)
                .build();
    }
}
