import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Navbar.css';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear login state if needed
        navigate("/SignUp");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="POS System Logo" className="logo-img" />
                    <span className='logo-name'>REAL TECH</span>
                </div>
                <ul className="navbar-links">


                </ul>
                <div className="navbar-buttons">
                    <Link to="SignUp"><button className="navbar-btn">Login</button></Link>
                    <button className="navbar-btn" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;