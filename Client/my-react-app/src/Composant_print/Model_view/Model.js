import React, { useEffect, useRef, useState } from 'react';
import { StlViewer } from 'react-stl-viewer';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import './Model.css'
import Sign_up from '../Sign_up/Sign_up'
import { FaRegCircleXmark } from "react-icons/fa6";

const ModelView = ({ file }) => {
  const viewerRef = useRef(null);
  const focusElementRef = useRef(null);
  const [volume, setVolume] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false); 

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

    //The position attribute of the geometry contains coordinates of all the vertices in the model.
    let position = geometry.attributes.position;

    // the total number of faces is the total number of vertices divided by three:
    let faces = position.count / 3;
    let sum = 0;

    //used to store the coordinates of the triangle vertices: 
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
    //values (Infinity and -Infinity) to ensure they are updated correctly during the first comparison.
    let maxX = -Infinity, minX = Infinity, maxY = -Infinity, minY = Infinity, maxZ = -Infinity, minZ = Infinity;
    for (let i = 0; i < position.count; i++) {
      //retrieves coordinates of the vertices
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

  const handleDemandeClick = (e) => {
    e.preventDefault();
    setShowSignUp(true); 
  };
  const closeSignUp = () => {
    setShowSignUp(false);
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
                <a href="/sign-up" onClick={handleDemandeClick}>Demander</a>
              </div>
            )}
        </div>

        
      </div>

      
      {showSignUp && (
        <div className="signup-popup">
          <div className="popup-content">
            <div className="popup-close" onClick={closeSignUp}>
              <FaRegCircleXmark />
            </div>
            <Sign_up
              file={file}
              price={calculatePrintCost(volume, 250.0, 1.23)}
              volume={volume.toFixed(2)}
            />
          </div>
        </div>
      )}

    </>
  );
};

export default ModelView;
