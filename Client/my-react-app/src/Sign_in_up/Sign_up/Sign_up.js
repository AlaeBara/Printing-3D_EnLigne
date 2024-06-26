import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Sign_up.css';
import NavBar from '../../Composant_print/NavBar/NavBar'

//sign up directly
const Sign_up = ({file, price}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [message, setMessage] = useState('');
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    
            const response = await axios.post("http://localhost:8000/signUp", {
                email,
                password,
                nom,
                prenom,
                telephone,
                message
            });
    
            console.log("Response:", response.data);
    
            setMessage(response.data.message);
            if (response.data.status === 'success') {
                history('/sign-in');
            }
        } catch (error) {
            if (error.response && error.response.data.status === 'failure') {
                setMessage(error.response.data.message);
            } else {
                console.error("Error occurred:", error);
                alert("Internal Server Error");
            }
        }
    };
    
    
    
    

    return (
        <>
            <NavBar/>
            <div className="container_signup">
                <div>
                    <p className='title_signup'>S'inscrire chez 3D MOUSSASOFT </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">E-mail</label>
                            <input className="input_login form-control" type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mot de passe</label>
                            <input className="input_login form-control" type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Prénom</label>
                            <input className="input_login form-control" type="text" name="prenom" required onChange={(e) => setPrenom(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nom</label>
                            <input className="input_login form-control" type="text" name="nom" required onChange={(e) => setNom(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Téléphone</label>
                            <input className="input_login form-control" type="tel" name="telephone" pattern="[0]{1}[0-9]{9}" required onChange={(e) => setTelephone(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {message && <p style={{ color: "red", textAlign: "center", paddingTop: '10px' }}>{message}</p>}
                    <p className='alert_signup'>Vous avez déjà un compte? <a href="/sign-in">Connectez-vous</a></p>
                </div>
            </div>
        </>
    );
};

export default Sign_up;
