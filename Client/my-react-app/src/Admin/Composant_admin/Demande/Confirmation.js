import React from 'react';
import './Confirmation.css';

const Confirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal-container">
      <div className="confirmation-modal">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm}>Confirmer</button>
          <button onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
