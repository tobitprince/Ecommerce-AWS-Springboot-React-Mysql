import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import "../../style/address.css"


const AddressPage = () =>{
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state:'',
        zipcode:'',
        country:''
    });
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        if (location.pathname === '/edit-address') {
            fetchUserInfo();

        }
    }, [location.pathname]);

    const fetchUserInfo = async() =>{
        try {
            const response = await ApiService.getLoggedInUserInfo()
            if (response.user.address) {
                setAddress(response.user.address)
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to fetch user information")
        }

    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.saveAndUpdateAddress(address);
            navigate("/profile")
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to save or update address ")
        }
    }

    return(
        <div className="address-page">
            <h2>{location.pathname === '/edit-address'? 'Edit Address' : "Add Address"}</h2>
            {error && <p className='error-message'>{error}</p>}
        </div>
    )
}