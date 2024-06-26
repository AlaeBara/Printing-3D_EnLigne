const express = require('express');
const router = express.Router();
const crypto = require('crypto');



const { upload } = require("../Middelware/Multer");
const { messageUser }=require('../Controller/message');
const { signUpUser } = require('../Controller/Sign_up');
const { signUp } = require('../Controller/Sign_up_officiel');
const {Authentification}=require('../Controller/Authentication')
const {authenticateToken}=require('../Middelware/JwtMiddelware');

//client 
const {AddCommandes} = require('../Controller/Client_controller/AddCommandes');
const {GetDemnade} =require('../Controller/Client_controller/GetDemande')

//admin
const { GetMessages } =require('../Controller/Admin_controller/GetMessages')
const { GetDemande} =require('../Controller/Admin_controller/GetDemande')
const {ConfirmDemand  } =require('../Controller/Admin_controller/ConfirmDemande')
const {GetDemandeConfirm}=require('../Controller/Admin_controller/GetDemandeConfirm')
const {DeleteDemande}=require('../Controller/Admin_controller/DeleteDemande')
const {CompleteDemande}=require('../Controller/Admin_controller/CompleteDemande')
const { GetDemandesTerminer}=require('../Controller/Admin_controller/GetDemandesTerminer')
const {GetStatistics }=require('../Controller/Admin_controller/GetStatistics')

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');



router.post('/check_authenticateToken', authenticateToken(secretKey), (req, res) => {
    res.sendStatus(200);
});



//message form 
router.post('/message',messageUser );
//sign up for page model_view
router.post('/sign-Up',upload.single('file'),signUpUser );
//sign up directly
router.post('/signUp',signUp);
//  Authentification
router.post('/sign-In',Authentification(secretKey));




//client routes:
router.post('/Add_model',upload.single('file'),AddCommandes);
router.post('/get_demande',GetDemnade);


//admin routes: 
router.post('/getMessages' ,GetMessages);
router.post('/getDemandes' , GetDemande);
router.post('/getDemandesConfirm' , GetDemandeConfirm);
router.post('/getDemandesTerminer' ,  GetDemandesTerminer);
router.post('/confirmDemand' , ConfirmDemand);
router.post('/deleteDemande' , DeleteDemande);
router.post('/CompleteDemand' , CompleteDemande);
router.post('/statistics' , GetStatistics );





//log out
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});



module.exports = { router };
