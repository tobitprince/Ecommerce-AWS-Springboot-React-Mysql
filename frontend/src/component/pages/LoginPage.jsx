import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import "../../style/login.css"

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleChange= (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("User Logged In Successfully")
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                setTimeout(() => {
                    navigate('/profile')
                }, 2000);

            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.response || "Unable to Login")

        }

    }

    return (
        <div className="login-page">
            <h2>Login</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label >Email</label>
                <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                required />


                <label >Password</label>
                <input
                type="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                required />

                <button type='submit'>Login</button>

                <p className='login-link'>
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>

    )
}


export default LoginPage