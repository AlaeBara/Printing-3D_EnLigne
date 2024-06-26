import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import DemandeItem from '../DemandeItem/DemandeItem'; 
import './Demande.css'

const Demande = () => {
  const [demandes, setDemandes] = useState([]);
  const encryptionKey = 'MOUSSASOFT';

  useEffect(() => {
    const fetchData = async () => {
      const encryptedEmail = localStorage.getItem('encryptedEmail');
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedEmail, encryptionKey);
      const email = decryptedBytes.toString(CryptoJS.enc.Utf8);
      try {
        const response = await axios.post('http://localhost:8000/get_demande', { email }, {
          withCredentials: true 
        });
        if (response.data.status === "success") {
          setDemandes(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert("Erreur lors de la récupération des données");
      }
    };

    fetchData();
  }, [demandes]);

  const handleDeleteDemande = async (file_name) => {
    try {
      const response =await axios.post('http://localhost:8000/deleteDemande', { file_name });
      setDemandes(response.data.Demandes);
    } catch (error) {
      console.error('Error deleting demande:', error);
      alert("Erreur lors de la suppression de la demande");
    }
  };

  return (
    <>
      {demandes.length > 0 ? (
        <div className='demande-info'>
          {demandes.map((demande, index) => (
            <DemandeItem key={index} demande={demande} onDeleteDemande={handleDeleteDemande} />
          ))}
        </div>
      ) : (
        <p className='msg_demande'>Aucune demande disponible</p>
      )}
    </>
  );
};

export default Demande;
