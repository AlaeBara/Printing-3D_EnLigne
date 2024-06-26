import React, { useState } from 'react';
import './Sidebar.css';
import axios from 'axios';
import logo from './logo_png.png';
import { useNavigate } from 'react-router-dom'; 
import { LuMessagesSquare } from "react-icons/lu";
import { BsFillHouseAddFill } from "react-icons/bs";
import { GiConfirmed } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import { TbCubeSend } from "react-icons/tb";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClass = isOpen ? "sidebar open" : "sidebar";

  const navigate = useNavigate(); 
  const handleLogout = async () => {
    try {
        await axios.get('http://localhost:8000/logout',{withCredentials:true});
        navigate('/sign-in'); 
    } catch (error) {
        console.error('Logout failed:', error);
        alert("Logout failed");
    }
  };

  return (
    <section className="page">
      <aside className={sidebarClass}>
        <div className="inner">
          <header>
            <button
              className="burger"
              onClick={toggleSidebar}
            >
              {isOpen ? "X" : "☰"}
            </button>
            <img src={logo} alt="Logo" />
          </header>
          <nav className='nav-side-bar'>
          <ul>
          <li><a href="/Dashboard/Statistique"><MdOutlineSpaceDashboard/> tableau de bord</a></li>
            <li><a href="/Dashboard/Demandes"><BsFillHouseAddFill /> Commandes</a></li>
            <li><a href="/Dashboard/Demandes-confirmées"><GiConfirmed />Commandes Confirmées</a></li>
            <li><a href="/Dashboard/Demandes-terminer"><TbCubeSend className='Commandes-Terminer'/>Commandes Terminer</a></li>
            <li><a href="/Dashboard/Msg"><LuMessagesSquare/> Messages</a></li>
            <li><a href='#' onClick={handleLogout}><FaSignOutAlt/> Déconnecter</a></li>
          </ul>
          </nav>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
