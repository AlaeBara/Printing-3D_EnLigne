import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./NavBar.css";
import logo from './image/logo.png';
import { IoIosMenu } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); 

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:8000/logout',{withCredentials:true});
            navigate('/sign-in'); 
            localStorage.clear();
        } catch (error) {
            console.error('Logout failed:', error);
            alert("Logout failed");
        }
    };
    
    return (
        <>
            <header>
                <div className="navbar">
                    <div className="logo"><a href="/"><img src={logo} alt="Logo" /></a></div>
                    <ul className="print_page">
                        <li><a href="/log-in/upload/3d">Demander un nouveau devis</a></li>
                        <li><a href="/log-in/votre_demande">mon demande</a></li>
                        <li><a onClick={handleLogout}>Déconnecter</a></li>
                    </ul>
                    <div className="toggle-btn toggle_print_page" onClick={toggleMenu}>
                        {isOpen ? <HiOutlineXMark /> : <IoIosMenu />}
                    </div>
                </div>
                <ul className={isOpen ? 'dropdown_print open' : 'dropdown'}>
                    <li><a href="/log-in/upload/3d">Demander un nouveau devis</a></li>
                    <li><a href="/votre_demande">mon demande</a></li>
                    <li><a onClick={handleLogout}>Déconnecter</a></li>
                </ul>
            </header>
        </>
    )
}

export default NavBar;
