import React, { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './Composant_client/NavBar/NavBar';
import Drag from './Composant_client/Drag/Drag';
import Demande from './Composant_client/demande/Demande';

const Client = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8000/check_authenticateToken', {}, {
                    withCredentials: true // Ensure cookies are sent with the request
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
        <React.Fragment>
            <NavBar />
            <Routes>
              <Route path="/upload/3d" element={<Drag />} />
              <Route path="/votre_demande" element={<Demande />} />
            </Routes>
        </React.Fragment>
    );
}

export default Client;