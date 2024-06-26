import React, { useEffect, useRef, useState } from 'react';
import { StlViewer } from 'react-stl-viewer';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import './Model.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js'; 

const ModelView = ({ file }) => {
  const viewerRef = useRef(null);
  const focusElementRef = useRef(null);
  const [volume, setVolume] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const navigate =useNavigate ();
  const [notification, setNotification] = useState(null);
  const encryptionKey = 'MOUSSASOFT';

  useEffect(() => {
    if (file.preview) {
      const loader = new STLLoader();
      loader.load(file.preview, function(geometry) {
        const volume = getVolume(geometry);
        setVolume(volume);
        const dimensions = getDimensions(geometry);
        setDimensions(dimensions);
      });
    }
  }, [file.preview]);

  useEffect(() => {
    if (focusElementRef.current) {
      focusElementRef.current.focus();
    }
  }, [file.preview]);

  function getVolume(geometry) {
    let position = geometry.attributes.position;
    let faces = position.count / 3;
    let sum = 0;
    let p1 = new THREE.Vector3(), p2 = new THREE.Vector3(), p3 = new THREE.Vector3();
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, i * 3 + 0);
      p2.fromBufferAttribute(position, i * 3 + 1);
      p3.fromBufferAttribute(position, i * 3 + 2);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
    // Convert volume to cubic centimeters (cm³)
    return Math.abs(sum) / 1000; // 1 unit³ = 1 mm³ = 0.001 cm³
  }

  function signedVolumeOfTriangle(p1, p2, p3) {
    return p1.dot(p2.cross(p3)) / 6.0;
  }

  function getDimensions(geometry) {
    let position = geometry.attributes.position;
    let maxX = -Infinity, minX = Infinity, maxY = -Infinity, minY = Infinity, maxZ = -Infinity, minZ = Infinity;
    for (let i = 0; i < position.count; i++) {
      let x = position.getX(i);
      let y = position.getY(i);
      let z = position.getZ(i);
      maxX = Math.max(maxX, x);
      minX = Math.min(minX, x);
      maxY = Math.max(maxY, y);
      minY = Math.min(minY, y);
      maxZ = Math.max(maxZ, z);
      minZ = Math.min(minZ, z);
    }
    const length = maxX - minX;
    const width = maxY - minY;
    const height = maxZ - minZ;
    return { length, width, height };
  }

  const calculatePrintCost = (volume, filamentCostPerKg, filamentDensity) => {
    // Calculate cost per cm³ , 1,23 g/cm3
    const costPerCm3 = (filamentCostPerKg / 1000) * filamentDensity;
  
    // Calculate total cost
    const totalCost = volume * costPerCm3;
  
    return totalCost.toFixed(2); // Return the cost rounded to 2 decimal places
  };

  const handleDemandeClick =async  (e) => {
    try {
      const encryptedEmail = localStorage.getItem('encryptedEmail');
      const tele = localStorage.getItem('tel');
      // Decrypt the email using the same encryption key
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedEmail, encryptionKey);
      // Convert the decrypted bytes back to a string
      const email = decryptedBytes.toString(CryptoJS.enc.Utf8);

      const currentTime = new Date();
      const formattedTime = `${currentTime.getHours()}-${currentTime.getMinutes()}-${currentTime.getSeconds()}`;
    
      const formData = new FormData();
      formData.append('email', email);
      formData.append('price', calculatePrintCost(volume, 250.00, 1.23));
      formData.append('volume', volume.toFixed(2));
      formData.append('date', formattedTime);
      formData.append('telephone', tele);
      formData.append('file_name', file.path);
      formData.append('file', file);
      const response = await axios.post('http://localhost:8000/Add_model', formData,{
        withCredentials: true, 
      }
      );
      
      if (response.data.message === "Ajouter réussie") {
        navigate('/log-in/votre_demande')
        setNotification("Votre modèle a été ajouté.")
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
      else{
        alert("bad")
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert("catch error")
    }
  };
  

  return (
    <>
      <div className="model-container">
        <div
          ref={focusElementRef}
          tabIndex={-1}
          style={{ position: 'absolute', left: '-9999px' }}
        ></div>
        
        <StlViewer
          ref={viewerRef}
          url={file.preview}
          className='model_view'
          orbitControls
          shadows
          showAxes
        />
        <div className="info-container">
            {dimensions !== null && (
              <div className='info-item'>
                <p className='dimensions'>Dimensions: {dimensions.length.toFixed(2)} x {dimensions.width.toFixed(2)} x {dimensions.height.toFixed(2)} cm</p>
              </div>
            )}

            {volume !== null && (
              <div className='info-item'>
                <p className='volume'>Volume: {volume.toFixed(2)} cm³</p>
              </div>
            )}
            
            {volume !== null && (
              <div className='info-item'>
                <p className='prix'>Prix: {calculatePrintCost(volume, 250.00, 1.23)} DH</p>
              </div>
            )}

            {volume !== null && (
              <div className='info-item damande_link'>
                <a  onClick={handleDemandeClick}>Ajouter</a>
              </div>
            )}
            {notification && (
              <div className='noti'>
                <p className='notification'>{notification}</p>
              </div>
            )}
        </div>

        
      </div>

      
     

    </>
  );
};

export default ModelView;
