import React from 'react';
import './Footer.css';
import { SiLinkedin } from "react-icons/si";
import { BsFacebook } from "react-icons/bs";
import { BiLogoWhatsappSquare, BiSolidPhoneCall } from "react-icons/bi";
import { ImMail } from "react-icons/im";


const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer__section">
        <h3>MOUSSASOFT</h3>
        <h6>Bureau TA202 Technopark, quartier Tilila, Agadir.</h6>
        <h6><BiLogoWhatsappSquare/> 06 14 20 87 86</h6>
        <h6><BiSolidPhoneCall /> 05 25 62 62 25</h6>
        <h6><ImMail /> contact@moussasoft.com </h6>
      </div>
      



      <div className="footer__section">
        <h3>Liens</h3>
        <ul>
          <li><a href="/">Acceuil</a></li>
          <li><a href="/print">Commandez</a></li>
        </ul>
      </div>

      <div className="footer__section social">
        <h3>Contactez-nous</h3>
        <li> <a href=""><SiLinkedin /> linkedin</a></li>
        <li> <a href=""><BsFacebook /> Facebok</a></li>
      </div>

      <div className="footer__copy">
        <p >&copy; 2024 MOUSSASOFT| Créé par <a href="https://alaeddinebara.netlify.app/">Alaeddine</a></p>
      </div>
    
    </footer>
  );
}

export default Footer;
