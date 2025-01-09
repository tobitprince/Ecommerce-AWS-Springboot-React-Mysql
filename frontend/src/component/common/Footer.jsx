import React from 'react'
import "../../style/footer.css"
import { NavLink } from 'react-router-dom'


const Footer = () =>{
    return (
        <footer className="footer">
            <div className="footer-links">
                <ul>
                    <NavLink to="/">About Us</NavLink>
                    <NavLink to="/">Contact</NavLink>
                    <NavLink to="/">Terms & Conditions</NavLink>
                    <NavLink to="/">Privacy Policy</NavLink>
                    <NavLink to="/">FAQS</NavLink>
                </ul>
            </div>
            <div className="footer-info">
                <p>&copy; 2024 Tobit Mart. All right reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;