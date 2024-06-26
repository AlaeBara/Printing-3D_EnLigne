import React, { useState } from 'react';
import './Pourquoi.css';
import image from './image/dd.jpg';
import image1 from './image/3d-1.jpg';
import image2 from './image/3d-2.jpg';

const Pourquoi = () => {
  const [picture,setPicture]=useState(image)

  const First=()=>{
    setPicture(image)
  }
  const second=()=>{
    setPicture(image1)
  }
  const three=()=>{
    setPicture(image2)
  }

  return (
    <div className="pourquoi-container">
      <img className="pourquoi-image" src={picture} alt="Pourquoi" />
      <div className="pourquoi-content">
        <p className='titre'>POURQUOI MOUSSASOFT</p>
        <h1>Commandez vos Impressions 3D en Ligne</h1>
        <p className='description'>Commandez vos Impressions 3D en Ligne. Facile, Rapide et Précis</p>
        <ul>
          <li onClick={First}>.Plateforme en ligne</li>
          <li onClick={second}>.Qualité supérieure</li>
          <li onClick={three}>.Finition sur mesure</li>
        </ul>
        <a href="" className='demande'>Commandez-vous</a>
      </div>
    </div>
  );
}

export default Pourquoi;
