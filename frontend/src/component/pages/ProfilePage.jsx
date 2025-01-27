import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import "../../style/profile.css"

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const navigate = useNavigate()

    useEffect(() =>{
        fetchUserInfo();
    }, [])

    const fetchUserInfo = async() => {
        try {
            const response = await ApiService.getLoggedInUserInfo()
            setUserInfo(response.user)
        } catch (error) {
            setError(error.response?.data?.message || error.response || "Unable to get user info")
        }
    }

    if (!userInfo) {
        <div>Loading....</div>
    }

    const handleAddressClick = () =>{
        navigate(userInfo.address ? 'edit-address' : 'add-address')
    }

    return(
        <div className="profile-page">
            <p>Welcome to your profile</p>
        </div>
    )

}

export default ProfilePage