import React, { useState } from 'react';
import axios from 'axios'; 
import CryptoJS from 'crypto-js'; 
import './Sign_in.css';
import NavBar from '../../Composant_print/NavBar/NavBar';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

const Sign_in = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [captchaToken, setCaptchaToken] = useState('');
    const history = useNavigate();

    // Encryption key (keep this secure)
    const encryptionKey = 'MOUSSASOFT';

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            setError('Please complete the CAPTCHA verification.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/sign-In', {
                email,
                password,
                captchaToken,
            },{
                withCredentials: true, 
            });
    
            if (response.data.status === "success") {
                const { type_user } = response.data;
                if (type_user === 'client') {
                    const encryptedEmail = CryptoJS.AES.encrypt(email,encryptionKey).toString();
                    localStorage.setItem('encryptedEmail', encryptedEmail);
                    localStorage.setItem('tel', response.data.telephone);
                    history('/log-in/upload/3d');
                } else if (type_user === 'admin') {
                    history('/Dashboard/Statistique');
                }
            }
        } catch (error) {
            if (error.response && error.response.data.status === 'failure') {
                setError(error.response.data.message);
            } else {
                console.error('Error occurred:', error);
                setError('Erreur Interne du Serveur!');
            }
        }
    };

    return (
        <>
            <NavBar />

            <div className="container_signin">
                <div>
                    <p className='title_signup'>Connectez-vous à 3D MOUSSASOFT </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">E-mail</label>
                            <input
                                className="input_login form-control"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mot de passe</label>
                            <input
                                className="input_login form-control"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <ReCAPTCHA
                            sitekey="6Lf638gpAAAAANYhNhTYojZStbjl9ucgxfmqNwNK"
                            className='captcha'
                            onChange={handleCaptchaChange}
                        />
                        {error && <p className='error-sing-in'>{error}</p>}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                    <p className='alert_signin'>Vous n'avez pas de compte ? <a href="/sign-up"> Enregistrez-vous <br /> maintenant</a></p>
                </div>
            </div>
        </>
    );
};

export default Sign_in;
