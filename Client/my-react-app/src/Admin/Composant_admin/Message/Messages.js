import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filterDate, setFilterDate] = useState("");
  const [originalMessages, setOriginalMessages] = useState([]); // Store original messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/getMessages');
        if (response.data.Messages.length > 0) {
          setMessages(response.data.Messages);
          setOriginalMessages(response.data.Messages); // Set original messages
        } else {
          setError('Aucun message');
        }
      } catch (error) {
        console.error('Error fetching messages data:', error);
        setError("Erreur lors de la récupération des données -- messages data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredMessages = filterDate
      ? originalMessages.filter((message) => new Date(message.date).toISOString().slice(0, 10) === filterDate)
      : originalMessages;
    setMessages(filteredMessages);
    setCurrentPage(1);
  }, [filterDate, originalMessages]);

  // Logic to get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter messages by date
  const handleDateFilter = (e) => {
    const { value } = e.target;
    setFilterDate(value);
  };

  return (
    <div className="messages-container">
      {error ? (
        <div className='check_msg'>{error}</div>
      ) : (
        <>
          <input
            type="date"
            value={filterDate}
            onChange={handleDateFilter}
            className="date-filter"
          />
          <table className='table-message'>
            <thead className='column-table-message'>
              <tr>
                <th className='Fullname-th'>Nom Complete</th>
                <th className='date-th'>Date</th>
                <th>Email</th>
                <th className='tele-th'>Telephone</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody className='data-messages'>
              {currentItems.map((message, index) => (
                <tr key={index}>
                  <td>{message.fullname}</td>
                  <td >{message.date}</td>
                  <td>{message.email}</td>
                  <td >0{message.telephone}</td>
                  <td className='msg-content'>{message.message}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className='button_tabel-message' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <div>
              {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, messages.length)} sur {messages.length} messages
            </div>
            <button className='button_tabel-message' onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= messages.length}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
