import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import "../../style/profile.css"
import Pagination from '../common/Pagination';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 2
    const navigate = useNavigate()

    useEffect(() =>{
        fetchUserInfo();
    }, [])

    const fetchUserInfo = async() => {
        try {
            const response = await ApiService.getLoggedInUserInfo()
            if (response.status === 200) {
                setUserInfo(response.user)
            }else{
                setError(error.response?.data?.message || error.message || 'unable to fetch products')
            }
        } catch (error) {
            setError(error.response?.data?.message || error.response || "Unable to get user info")
        }
    }

    if (!userInfo) {
        <div>Loading....</div>
    }

    const handleAddressClick = () =>{
        navigate(userInfo.address ? '/edit-address' : '/add-address')
    }

    const orderItemList = userInfo?.orderItemList || [];
    const totalPages = Math.ceil(orderItemList.length / itemsPerPage);
    const paginatedOrders = orderItemList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )



    return(
        <div className="profile-page">
            <h2>Welcome {userInfo?.name}</h2>

            {error? (
                <p className='error-messafe'>{error}</p>
            ):(
                <div className="">
                    <p><strong>Name : {userInfo?.name}</strong></p>
                    <p><strong>Email : {userInfo?.email}</strong></p>
                    <p><strong>Phone Number : {userInfo?.phoneNumber}</strong></p>

                    <div>
                        <h3>Address</h3>
                        {userInfo?.address ? (
                            <div>
                                <p><strong>Street: {userInfo?.address.street}</strong></p>
                                <p><strong>City: {userInfo?.address.city}</strong></p>
                                <p><strong>State: {userInfo?.address.state}</strong></p>
                                <p><strong>Zip Code: {userInfo?.address.zipcode}</strong></p>
                                <p><strong>Country: {userInfo?.address.country}</strong></p>
                            </div>
                        ):(
                            <p>No Address Information Available</p>
                        )}
                        <button className='profile-button' onClick={handleAddressClick}>
                            {userInfo?.address ? "Edit Address" : "Add Address"}
                        </button>
                    </div>

                    <h3>Order History</h3>
                    <ul>
                        {paginatedOrders.map(order => (
                            <li key={order.id} className='order-item'>
                                {order.product ? (
                                    <div>

                                        <img src={order.product?.imageUrl} alt={order.product?.name} />
                                        <div className='order-details'>
                                            <p><strong>Name: </strong> {order.product?.name}</p>
                                            <p><strong>Status: </strong> {order.status}</p>
                                            <p><strong>Quantity: </strong> {order.quantity}</p>
                                            <p><strong>Prices: </strong> {order.price}</p>
                                        </div>
                                    </div>
                                ):(
                                    <div>
                                        <p>Product Information not available</p>
                                        </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}/>
                </div>


            )}
        </div>
    )

}

export default ProfilePage