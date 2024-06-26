import React, { useState, useEffect } from 'react';
import styles from './Article.css';

const images = [
  require('./image/rocket-2365907_1920.jpg'),
  require('./image/4k.jpg'),
  require('./image/REP2_PRESS_15x10_high17-e1434091899903.jpg')
];

const Article = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <div className='article-container'>
            <img src={images[currentImageIndex]} alt="" className='article-image'/>
        </div>
        <div className='content'> 
            <p className='big-title'>Meilleur service d'impression 3D au Maroc</p>
            <p className='_title'>L'impression 3D à portée de main</p>
            <a href="/print" className='link'>Commencer maintenant</a>
        </div>
    </>
  );
}

export default Article;
