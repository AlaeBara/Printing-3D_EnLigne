import React from 'react'
// import Spline from '@splinetool/react-spline';
import './Four.css'
import img from './image/3D-4.jpeg'


const Four = () => {
  return (
    <>
     <div className='article-container_'>
            <img src={img} alt="" className='article-image'/>
        </div>
        <div className='content_4er'> 
            <p className='_title_4er'>SERVICE D'IMPRESSION 3D</p>
            <p className='big-title_4er'>Transformez vos concepts en réalisations concrètes grâce à notre expertise</p>
            <a href="/print" className='link'>Commencer maintenant</a>
        </div>
    
    </>
  )
}

export default Four

