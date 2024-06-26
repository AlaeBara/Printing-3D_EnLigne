const bcrypt = require('bcrypt');
const { Client } = require("../BD/Client");
const { Admin } = require("../BD/Admin");
const jwt = require("jsonwebtoken");


function generateToken(email, secretKey) {
    return jwt.sign({ email }, secretKey, { expiresIn: "1h" }); 
}

function Authentification(secretKey) {
    return async function(req, res) {
        try {
            const { email, password } = req.body;

            const user = await Client.findOne({ email });
            const admin = await Admin.findOne({ email });

            if (!user && !admin) {
                return res.status(400).json({ status: "failure", message: "Informations d'authentification incorrectes." });
            }

            const match = user ? await bcrypt.compare(password, user.password) : await bcrypt.compare(password, admin.password);

            if (match) {
                const userType = user ? "client" : "admin";
                const token = generateToken(email, secretKey);
                const responseData = {
                    status: "success",
                    type_user: userType,
                    message: "Authentification réussie",
                };
                if (user) {
                    responseData.telephone = user.telephone;
                }
                res.cookie("token", token, {
                    httpOnly: true, // Prevents access the cookie from  JavaScript 
                    secure: true, // Ensures the cookie is sent over HTTPS
                    sameSite: "strict", // Protects against CSRF
                });
                return res.json(responseData);
            } else {
                return res.status(400).json({ status: "failure", message: "Informations d'authentification incorrectes." });
            }
        } catch (error) {
            console.error("Error occurred:", error);
            return res.status(500).json({ status: "fail", message: "Erreur Interne du Serveur" });
        }
    };
}

module.exports = {Authentification};
