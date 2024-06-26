import React, { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './Composant_admin/NavBar/Sidebar'
import Messages from './Composant_admin/Message/Messages';
import Requests from './Composant_admin/Demande/Requests';
import RequestConform from './Composant_admin/Demande_confirmer/RequestConform';
import RequestCompleted from './Composant_admin/Demande_terminer/RequestCompleted'
import Statistique from './Composant_admin/Statistique_page/Statistique'

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.post('http://localhost:8000/check_authenticateToken', {}, {
                  withCredentials: true
              });

              if (response.status === 401) {
                  navigate('/sign-in');
              }
          } catch (error) {
              console.error('Error fetching user data:', error);
              navigate('/sign-in');
          }
      };

      fetchData();
  }, [navigate]);


  return (
    <> 
      <React.Fragment>
        <Sidebar/>
            <Routes>
            <Route path="/Statistique" element={<Statistique/>} />
              <Route path="/Demandes" element={<Requests/>} />
              <Route path="/Demandes-confirmées" element={<RequestConform/>} />
              <Route path="/Demandes-terminer" element={<RequestCompleted/>} />
              <Route path="/Msg" element={<Messages/>} />
            </Routes>
      </React.Fragment>
    </>
  )
}

export default Admin