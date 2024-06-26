import React,{ useState } from 'react';
import './Five.css';
import svgg from './3DD.svg'
import axios from 'axios';

const Five = () => {

  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [message,  setMessage] = useState('');
  const [message_form, setMessage_form] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/message", {
        fullname,
        email,
        telephone,
        message
      });
  
      setMessage_form(response.data.message);
      if (response.data.status === 'success') {
        e.target.reset();
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Internal Server Error");
    }
  };
  

  return (
    <div className='contact_5er'>
      <p className='titre_5er'>CONTACTEZ-NOUS</p>
      <h2 className='title_5er'>Des questions ? <br /> Nous sommes là pour vous aider !</h2>
      
      <form className='form_5er' onSubmit={handleSubmit}>

        <label htmlFor='name_5er'>Nom et prenom:</label>
        <input type='text' id='name_5er' name='fullname' onChange={(e) => setFullname(e.target.value)} required />

        <label htmlFor='email_5er'>Email:</label>
        <input type='email' id='email_5er' name='email' onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor='phone_5er'>Telephone:</label>
        <input type="tel" id="phone" name="telephone" pattern="[0]{1}[0-9]{9}"  onChange={(e) => setTelephone(e.target.value)} required/>

        <label htmlFor='message_5er'>Message:</label>
        <textarea id='message_5er' name='message' rows='3' onChange={(e) => setMessage(e.target.value)} required/>

        {message_form && <p className='message-forum'>{message_form}</p>}

        <button type='submit' className='button_5er'>Submit</button>
      </form>

      <img src={svgg} alt="" className='funky_svg'/>
     
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="orange" fillOpacity="1" d="M0,192L40,165.3C80,139,160,85,240,69.3C320,53,400,75,480,106.7C560,139,640,181,720,197.3C800,213,880,203,960,181.3C1040,160,1120,128,1200,133.3C1280,139,1360,181,1400,202.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg> */}
    </div>
  );
}

export default Five;
