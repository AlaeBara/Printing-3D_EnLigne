import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RequestCompleted.css';
import View from '../View/View';
import { HiOutlineViewfinderCircle } from "react-icons/hi2";

const RequestCompleted = () => {
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
        const response = await axios.post('http://localhost:8000/getDemandesTerminer');
        if (response.data.DemandesTerminer.length > 0) {
          setDemandes(response.data.DemandesTerminer);
        } else {
          setError('Aucune commande terminée');
        }
      } catch (error) {
        console.error('Error fetching demandes data:', error);
        setError("Erreur lors de la récupération des données -- Aucune commande terminée");
      }
    };
    fetchData();
  }, []);

  // Logic to get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter demandes based on search query
  const filteredDemandes = demandes.filter(demande =>
    Object.values(demande).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredDemandes.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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

  return (
    <div>
      <h2>Demandes Terminées</h2>
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
                <th>Nom de fichier</th>
                <th>Prix(Dh)</th>
                <th>Volume(Cm3)</th>
                <th>Date</th>
                <th>Date confirmation</th>
                <th>Date résiliation</th>
                <th>État de l'imprimante</th>
                <th>Email</th>
                <th>telephone</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.slice(indexOfFirstItem, indexOfLastItem).map((demande, index) => (
                <tr key={index}>
                  <td>{demande.file_name}</td>
                  <td>{demande.price} Dh</td>
                  <td>{demande.volume}</td>
                  <td>{demande.date}</td>
                  <td>{demande.date_confirmation}</td>
                  <td>{demande.date_résiliation}</td>
                  <td>{demande.printerStatus}</td>
                  <td>{demande.email}</td>
                  <td>0{demande.telephone}</td>
                  <td>
                    <button className='btn-viewer' onClick={() => openViewModal(demande.file_name)}>
                      <HiOutlineViewfinderCircle />
                    </button>
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

      {showViewModal && (
        <div className="view-modal">
          <View file={viewFile} onClose={closeViewModal} />
        </div>
      )}
    </div>
  );
};

export default RequestCompleted;
