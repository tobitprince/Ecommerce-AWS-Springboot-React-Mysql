import React, { useState } from 'react';
import '../../style/navbar.css'
import { NavLink, useNavigate} from "react-router-dom"
import ApiService from "../../service/ApiService";

const Navbar = () => {
     
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin()
    const isAuthenticated = ApiService.isAuthenticated()

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
            {isAuthenticated &&<NavLink to="/profile" >myAccount</NavLink>}
            {isAdmin &&<NavLink to="/admin" >Admin</NavLink>}
            {!isAuthenticated &&<NavLink to="/login" >Login</NavLink>}
            {isAuthenticated &&<NavLink onClick={handleLogout}>LogOut</NavLink>}
            <NavLink to="/cart" >Cart</NavLink>
            </div>

        </nav>
    )
};

export default Navbar;