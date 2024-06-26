const { Commandes } = require("../../BD/Commandes");

// Route Handler for SignUp
const AddCommandes = async (req, res) => {
    try {
        const { email,  price,volume,date,telephone, file_name } = req.body;
       
        const fileName = `${email}_${date}_${file_name}`;
        const newCommandes = new Commandes({
            file_name: fileName,
            price,
            volume,
            email,
            telephone
        });
        await newCommandes.save();

        return res.json({ status: "success", message: "Ajouter réussie" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ status: "fail", message: "Erreur Interne du Serveur" });
    }
};

// Export SignUp Handler
module.exports = { AddCommandes };
