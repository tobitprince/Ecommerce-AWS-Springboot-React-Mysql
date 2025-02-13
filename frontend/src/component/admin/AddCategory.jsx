import React, { useState } from 'react';
import ApiService from '../../service/ApiService';
import { useNavigate } from 'react-router-dom';
import "../../style/addCategory.css"

const AddCategory = ()=> {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        try {
            const response = await ApiService.createCategory({name});
            if (response.status === 200) {
                setMessage(response.message)
                setTimeout(()=>{
                    setMessage('')
                    navigate("/admin/categories")
                }, 3000)

            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to Add Category!")
        }
    }

    return(
        <div className="add-category-page">
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className='category-form'></form>
        </div>
    )
}
export default AddCategory