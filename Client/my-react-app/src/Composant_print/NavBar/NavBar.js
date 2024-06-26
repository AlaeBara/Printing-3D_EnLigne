import React,{useState } from 'react'
import "./NavBar.css"
import logo from './image/logo.png';
import { IoIosMenu } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";

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
                <ul class="print_page">
                    <li><a href="/">Acceuil</a></li>
                    <li><a href="/print">Imprimez vos pièce</a></li>
                </ul>
                <div className="toggle-btn toggle_print_page" onClick={toggleMenu}>
                    {isOpen ? <HiOutlineXMark/> : <IoIosMenu/>}
                </div>
            </div>
            <ul className={isOpen ? 'dropdown_print open' : 'dropdown'}>
                    <li><a href="/">Acceuil</a></li>
                    <li><a href="/print">Imprimez vos pièce</a></li>
            </ul>
        </header>
    </>
  )
}

export default NavBar