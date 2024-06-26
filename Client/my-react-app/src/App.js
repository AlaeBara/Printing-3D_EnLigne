import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Acceuil from './Acceuil';
import Print from './Print';
import Sign_up from './Sign_in_up/Sign_up/Sign_up';
import Sign_in from './Sign_in_up/sign_in/Sign_in';
import Client from './Client/Client';
import Admin from './Admin/Admin';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/print" element={<Print />} />
          <Route path="/sign-up" element={<Sign_up />} />
          <Route path="/sign-in" element={<Sign_in />} />
          <Route path="/log-in/*" element={<Client />} /> {/* Nested routes for Client */}
          <Route path="/Dashboard/*" element={<Admin />} /> {/* Nested routes for admin */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;