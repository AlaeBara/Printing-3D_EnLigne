import React,{useState } from 'react'
import "./NavBar.css"
import logo from './image/logo_png.png';
import { IoIosMenu } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlineAccountCircle } from "react-icons/md";

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

  return (
    <>
        <header>
            <div class="navbar">
                <div class="logo"><a href="/"><img src={logo} alt="Logo"/></a></div>
                <ul class="links">
                    <li><a href="/">Acceuil</a></li>
                    <li><a href="/print">Imprimez vos pièce</a></li>
                    <li><a href="/sign-in"><MdOutlineAccountCircle class="account-icon"/></a></li>
                </ul>
                <div className="toggle-btn" onClick={toggleMenu}>
                    {isOpen ? <HiOutlineXMark/> : <IoIosMenu/>}
                </div>
            </div>
            <ul className={isOpen ? 'dropdown open' : 'dropdown'}>
                    <li><a href="/">Acceuil</a></li>
                    <li><a href="/print">Imprimez vos pièce</a></li>
                    <li><a href="/sign-in"><MdOutlineAccountCircle class="account-icon"/></a></li>
            </ul>
        </header>
    </>
  )
}

export default NavBar