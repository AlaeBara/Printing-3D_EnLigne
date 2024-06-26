const bcrypt = require('bcrypt');
const { Client } = require("../BD/Client");
const { Commandes } = require("../BD/Commandes");

// Route Handler for SignUp
const signUpUser = async (req, res) => {
    try {
        const { email, password, nom, prenom, telephone, price,volume,date, file_name } = req.body;

        const checkEmail = await Client.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ status: "failure", message: "Cet e-mail est déjà associé à un compte." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newClient = new Client({ email, password: hashedPassword, nom, prenom, telephone });
        await newClient.save();

        const fileName = `${email}_${date}_${file_name}`;
        const newCommandes = new Commandes({
            file_name: fileName,
            price,
            volume,
            email,
            telephone
        });
        await newCommandes.save();

        return res.json({ status: "success", message: "Inscription réussie" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ status: "fail", message: "Erreur Interne du Serveur" });
    }
};

// Export SignUp Handler
module.exports = { signUpUser };
