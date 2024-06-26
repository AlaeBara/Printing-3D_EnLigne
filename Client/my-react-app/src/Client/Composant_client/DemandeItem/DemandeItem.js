import React from 'react';
import { StlViewer } from 'react-stl-viewer';
import './DemandeItem.css'
import { MdOutlineDeleteSweep } from "react-icons/md";

const DemandeItem = ({ demande, onDeleteDemande }) => {

  const stlUrl = `http://localhost:8000/static/${demande.file_name}`;

  const handleDelete = () => {
    onDeleteDemande(demande.file_name);
  };

  return (
    <>
      <div className="demande-container">
        <div className="model-volume">
          <StlViewer
            url={stlUrl}
            className='model_demande'
            orbitControls
            shadows
            showAxes
          />
          <p><b>Volume:</b> {demande.volume} cm3</p>
        </div>
        <div className="status-price">
          <p><b>Status:</b> {demande.printerStatus}</p>
          <p><b>Prix:</b> {demande.price}</p>
        </div>
        <div className="demande-details">
          <p><b>Envoyé le:</b> {demande.date}</p>
        </div>
        {demande.printerStatus === "Prêt" && (
          <div className='delete-demande-item' onClick={handleDelete}>
            <MdOutlineDeleteSweep/>
          </div>
        )}
      </div>
    </>
  );
};

export default DemandeItem;
