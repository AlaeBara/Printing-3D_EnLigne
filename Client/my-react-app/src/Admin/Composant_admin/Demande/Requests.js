import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from './Confirmation';
import View from '../View/View';
import './Requests.css';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { MdOutlineDeleteSweep } from "react-icons/md";

const Requests = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationDemand, setConfirmationDemand] = useState(null);
  const [deleteDemand, setDeleteDemand] = useState(null);
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
        const response = await axios.post('http://localhost:8000/getDemandes');
        if (response.data.Demandes.length > 0) {
          setDemandes(response.data.Demandes);
        } else {
          setError('Aucune commande disponible');
        }
      } catch (error) {
        console.error('Error fetching demandes data:', error);
        setError('Erreur lors de la récupération des données');
      }
    };
    fetchData();
  }, []);

  // Logic to get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter demandes based on search query with null checks
  const filteredDemandes = demandes.filter(demande =>
    Object.values(demande).some(value =>
      value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Calculate total number of pages
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

  const confirmDemand = async (demande) => {
    setShowConfirmation(true);
    setConfirmationDemand(demande);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setConfirmationDemand(null);
    setDeleteDemand(null); // Reset delete demand state
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);

    try {
      if (confirmationDemand) {
        const updatedDemandes = await axios.post('http://localhost:8000/confirmDemand', { file_name: confirmationDemand.file_name });
        setDemandes(updatedDemandes.data.demandes);
      } else if (deleteDemand) {
        const response = await axios.post('http://localhost:8000/deleteDemande', { file_name: deleteDemand.file_name });
        setDemandes(response.data.Demandes);
      }
    } catch (error) {
      console.error('Error confirming or deleting demand:', error);
    }
  };

  // Function to open view modal and set the file to view
  const openViewModal = (file) => {
    setViewFile(file);
    setShowViewModal(true);
  };

  // Function to close view modal
  const closeViewModal = () => {
    setViewFile(null);
    setShowViewModal(false);
  };

  const requestDelete = (demande) => {
    setShowConfirmation(true);
    setDeleteDemand(demande);
  };

  return (
    <div>
      <p>d</p>
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
                <th className='nomfichier-th'>Nom du fichier</th>
                <th>Prix(DH)</th>
                <th>Volume(cm3)</th>
                <th>Date</th>
                <th className='status-th'>État de l'imprimante</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Actions</th>
                <th>Téléchargement</th>
                <th>view</th>
                <th>supprimer</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.slice(indexOfFirstItem, indexOfLastItem).map((demande, index) => (
                <tr key={index}>
                  <td className='nomfichier-td'>{demande.file_name}</td>
                  <td>{demande.price}</td>
                  <td>{demande.volume}</td>
                  <td>{demande.date}</td>
                  <td>{demande.printerStatus}</td>
                  <td>{demande.email}</td>
                  <td>0{demande.telephone}</td>
                  <td>
                    <button className='btn-confirm' onClick={() => confirmDemand(demande)}>Confirmer</button>
                  </td>
                  <td>
                    <button className='btn-downloadFile' onClick={() => downloadFile(`http://localhost:8000/static/${demande.file_name}`)}>Télécharger</button>
                  </td>
                  <td>
                    <button className='btn-viewer' onClick={() => openViewModal(demande.file_name)}><HiOutlineViewfinderCircle /></button>
                  </td>
                  <td>
                    <button className='btn-delete' onClick={() => requestDelete(demande)}><MdOutlineDeleteSweep /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            <button className='button_tabel' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Précédent
            </button>
            <div className='pagination-number'>
              Page {currentPage} sur {totalPages} ({indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredDemandes.length)} sur {filteredDemandes.length})
            </div>
            <button className='button_tabel' onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= filteredDemandes.length}>
              Suivant
            </button>
          </div>
        </div>
      )}
      {showConfirmation && (
        <ConfirmationModal
          message={deleteDemand ? "Voulez-vous vraiment supprimer cette demande ?" : "Voulez-vous vraiment confirmer cette demande ?"}
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

export default Requests;
