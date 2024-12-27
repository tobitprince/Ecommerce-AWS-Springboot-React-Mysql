package com.princetobit.Ecommerce.service.impl;

import com.princetobit.Ecommerce.dto.AddressDto;
import com.princetobit.Ecommerce.dto.Response;
import com.princetobit.Ecommerce.entity.Address;
import com.princetobit.Ecommerce.entity.User;
import com.princetobit.Ecommerce.repository.AddressRepo;
import com.princetobit.Ecommerce.service.interf.AddressService;
import com.princetobit.Ecommerce.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepo addressRepo;
    private final UserService userService;

    @Override
    public Response saveAndUpdateAddress(AddressDto addressDto) {

        User user = userService.getLoginUser();
        Address address = user.getAddress();

        if (address == null){
            address = new Address();
            address.setUser(user);

        }
        if (addressDto.getStreet() != null ) address.setStreet(addressDto.getStreet());
        if (addressDto.getCity() != null ) address.setCity(addressDto.getCity());
        if (addressDto.getZipCode() != null ) address.setZipCode(addressDto.getZipCode());
        if (addressDto.getState() != null ) address.setState(addressDto.getState());
        if (addressDto.getCountry() != null ) address.setCountry(addressDto.getCountry());

        addressRepo.save(address);

        String message = (user.getAddress() == null ) ? "Address successfully created": "Address Successfully updated";
        return Response.builder()
                .status(200)
                .message(message)
                .build();
    }
}
