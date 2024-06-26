import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from '../Demande/Confirmation';
import './RequestConform.css';
import View from '../View/View';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdOutlineDeleteSweep } from "react-icons/md";

const RequestConform = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationDemandId, setConfirmationDemandId] = useState(null);
  const [deleteDemandId, setDeleteDemandId] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewFile, setViewFile] = useState(null); 
  const [showViewModal, setShowViewModal] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/getDemandesConfirm');
        if (response.data.DemandesConfirm.length > 0) {
          setDemandes(response.data.DemandesConfirm);
        } else {
          setError('Aucun Commandes confirmées');
        }
      } catch (error) {
        console.error('Error fetching demandes data:', error);
        setError("Erreur lors de la récupération des données -- Aucun Commandes confirmées");
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredDemandes = demandes.filter(demande =>
    Object.values(demande).some(value =>
      (value?.toString() || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const downloadFile = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.click();
  };

  const confirmDemand = (demand) => {
    setShowConfirmation(true);
    setConfirmationDemandId(demand);
  };

  const requestDelete = (demand) => {
    setShowConfirmation(true);
    setDeleteDemandId(demand);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setConfirmationDemandId(null);
    setDeleteDemandId(null);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);

    try {
      if (confirmationDemandId) {
        const updatedDemandes = await axios.post('http://localhost:8000/CompleteDemand', { file_name: confirmationDemandId });
        setDemandes(updatedDemandes.data.demandes);
      } else if (deleteDemandId) {
        const response = await axios.post('http://localhost:8000/deleteDemande', { file_name: deleteDemandId });
        setDemandes(response.data.Demandes);
      }
    } catch (error) {
      console.error('Error confirming or deleting demand:', error);
    }
  };

  const openViewModal = (file) => {
    setViewFile(file);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setViewFile(null);
    setShowViewModal(false);
  };

  return (
    <div>
      <h2>Demandes</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="requests-container">
          <input
            type="text"
            placeholder="Search..."
            className='input_recherche'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="demandes-table">
            <thead>
              <tr>
                <th>nom de fichier</th>
                <th>Price(DH)</th>
                <th>Volume</th>
                <th>Date Envoyee</th>
                <th>Date confirmation</th>
                <th>état d'imprimante</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Actions</th>
                <th>Téléchargement</th>
                <th>View</th>
                <th>supprimer</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.slice(indexOfFirstItem, indexOfLastItem).map((demande, index) => (
                <tr key={index}>
                  <td className='nomfichier-td'>{demande.file_name}</td>
                  <td>{demande.price} Dh</td>
                  <td>{demande.volume}</td>
                  <td>{demande.date}</td>
                  <td>{demande.date_confirmation}</td>
                  <td>{demande.printerStatus}</td>
                  <td>{demande.email}</td>
                  <td>0{demande.telephone}</td>
                  <td>
                    <button className='btn-completed' onClick={() => confirmDemand(demande.file_name)}>Terminé</button>
                  </td>
                  <td>
                    <button className='btn-downloadFile' onClick={() => downloadFile(`http://localhost:8000/static/${demande.file_name}`)}>Télécharger</button>
                  </td>
                  <td>
                    <button className='btn-viewer' onClick={() => openViewModal(demande.file_name)}><HiOutlineViewfinderCircle /></button>
                  </td>
                  <td>
                    <button className='btn-delete' onClick={() => requestDelete(demande.file_name)}><MdOutlineDeleteSweep /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            <button className='button_tabel' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <div className='pagination-number'>
              Page {currentPage} sur {totalPages} ({indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDemandes.length)} sur {filteredDemandes.length})
            </div>
            <button className='button_tabel' onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= filteredDemandes.length}>
              Next
            </button>
          </div>
        </div>
      )}
      {showConfirmation && (
        <ConfirmationModal
          message={deleteDemandId ? "Êtes-vous sûr de vouloir supprimer cette demande confirmée ?" : "Êtes-vous sûr de vouloir confirmer cette demande ?"}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {showViewModal && (
        <div className="view-modal">
          <View file={viewFile} onClose={closeViewModal} />
        </div>
      )}
   

    </div>
  );
};

export default RequestConform;
