import React from 'react';
import './Nous.css';
import { RxCube } from "react-icons/rx";
import { MdOutlineDesignServices } from "react-icons/md";
import { GiDrill } from "react-icons/gi";

const Nous = () => {
  return (
    <>
      <div className="container">
        <svg className='model' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="fill" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45 0.5 0.5)"><stop offset="0%" stop-color="#ff6545"></stop><stop offset="100%" stop-color="#ffe57d"></stop></linearGradient></defs><path d="M79,63.5Q66,77,49,78.5Q32,80,22.5,65Q13,50,19.5,29Q26,8,45,17Q64,26,78,38Q92,50,79,63.5Z" stroke="none" stroke-width="0" fill="url(#fill)"></path></svg>
        <div className="title-container">
          <p className='p_nous'>CE QU'ON FAIT</p>
          <p className="title">Impression 3D <span>en ligne</span> </p>
        </div>
        <div className="card-container">
          <div className="card">
            <div className="icon"><MdOutlineDesignServices/></div>
            <h3>Vous concevez</h3>
            <p className='p_nous'>Créez votre modèle 3D sur votre logiciel de CAO préféré</p>
          </div>
          <div className="card">
            <div className="icon"><GiDrill/> </div>
            <h3>Nous l'imprimons en 3D</h3>
            <p className='p_nous'>nous utilisons les meilleures imprimantes 3D pour produire vos prototypes et pièces fonctionnelles.</p>
          </div>
          <div className="card">
            <div className="icon"><RxCube/></div>
            <h3>Vous le recevez</h3>
            <p className='p_nous'>Recevez vos pièces imprimées en 3D partout au Maroc grace à une livraison express</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nous;
