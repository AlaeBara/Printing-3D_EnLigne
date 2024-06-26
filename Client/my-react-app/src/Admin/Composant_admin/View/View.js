import React from 'react';
import { StlViewer } from 'react-stl-viewer';
import { IoIosCloseCircleOutline } from "react-icons/io";

const View = ({ file, onClose }) => {
  return (
    <div className="view-modal-content">
      <button className="close-button" onClick={onClose}><IoIosCloseCircleOutline /></button>
      <StlViewer
        url={`http://localhost:8000/static/${file}`}
        orbitControls
        shadows
        showAxes
      />
    </div>
  );
};

export default View;
