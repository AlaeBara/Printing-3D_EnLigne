const bcrypt = require('bcrypt');
const { Commandes } = require("../../BD/Commandes");

// Route Handler for SignUp
const GetDemnade = async (req, res) => {
    try {
        const { email } = req.body;
        
       
        const data = await Commandes.find({email});
        
        if (!data) {
            return res.status(404).json({ status: "aucun data", message: "Demande non trouvée" });
        }

        return res.json({ status: "success", data });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ status: "fail", message: "Erreur Interne du Serveur" });
    }
};

module.exports = { GetDemnade };
