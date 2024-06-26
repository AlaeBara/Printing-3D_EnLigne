const bcrypt = require('bcrypt');
const { Client } = require("../BD/Client");



const signUp = async (req, res) => {
    try {
        const { email, password, nom, prenom, telephone} = req.body;

        const checkEmail = await Client.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ status: "failure", message: "Cet e-mail est déjà associé à un compte." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newClient = new Client({ email, password: hashedPassword, nom, prenom, telephone });
        await newClient.save();

        return res.json({ status: "success", message: "Inscription réussie" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ status: "fail", message: "Erreur Interne du Serveur" });
    }
};


module.exports = { signUp };
