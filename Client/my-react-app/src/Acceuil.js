import React from 'react'
import NavBar from './Composant_Acceuil/NavBar/NavBar';
import Article from './Composant_Acceuil/1er/Article'
import Nous from './Composant_Acceuil/2er/Nous';
import Pourquoi from './Composant_Acceuil/3er/Pourquoi';
import Four from './Composant_Acceuil/4er/Four';
import Five from './Composant_Acceuil/5er/Five'
import Footer from './Composant_Acceuil/Footer/Fotter';


const Acceuil = () => {
  return (
    <>
      <NavBar/>
      <Article/>
      <Nous/>
      <Pourquoi/>
      <Four/>
      <Five/>
      <Footer/>

    </>
    


  )
}

export default Acceuil