import React, { useState, useEffect } from 'react';
import '../../style/navbar.css'
import { NavLink, useNavigate} from "react-router-dom"
import ApiService from "../../service/ApiService";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {

    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin()
    const isAuthenticated = ApiService.isAuthenticated()
    const [userInfo, setUserInfo] = useState(null)

    const handleSearchChange = (e) =>{
        setSearchValue(e.target.value);
    }

    const handleSearchSubmit = async (e) =>{
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }

    const handleLogout = () =>{
        const confirm = window.confirm("Are you sure you want to LogOut?");
        if(confirm){
            ApiService.logout()
            setTimeout(()=>{
                navigate(`/login`)
            },500)
        }
    }

    useEffect(() =>{
        fetchUserInfo()
    }, [])


    const fetchUserInfo = async() => {
        const response = await ApiService.getLoggedInUserInfo()
        setUserInfo(response.user)
    }


    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/"><img src="https://princetobit-ecommerce.s3.eu-north-1.amazonaws.com/image.jpg" alt="logo" /></NavLink>
            </div>
            <form className="navbar-search" onSubmit={handleSearchSubmit}>
                <input type="text"
                placeholder='Search Products'
                value={searchValue}
                onChange={handleSearchChange} />
                <button type='submit'>Search</button>
            </form>

            <div className="navbar-link">
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/categories" >Categories</NavLink>
            <NavLink to="/cart" >Cart</NavLink>
            {isAuthenticated && userInfo &&<NavLink to="/profile" style={{color:'#143e05'}}><i className="fas fa-user"></i>{userInfo?.name}</NavLink>}

            {isAdmin &&<NavLink to="/admin" >Admin</NavLink>}
            {!isAuthenticated &&<NavLink to="/login" >Login</NavLink>}
            {isAuthenticated &&<NavLink onClick={handleLogout}>LogOut</NavLink>}
            </div>

        </nav>
    )
};

export default Navbar;