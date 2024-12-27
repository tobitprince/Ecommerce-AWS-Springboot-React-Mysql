package com.princetobit.Ecommerce.service.interf;

import com.princetobit.Ecommerce.dto.AddressDto;
import com.princetobit.Ecommerce.dto.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}
