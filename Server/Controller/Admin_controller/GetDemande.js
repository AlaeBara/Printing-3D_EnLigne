const { Commandes } = require("../../BD/Commandes");

const GetDemande = async (req, res) => {
    try {

        const demandes = await  Commandes.find({printerStatus:"Prêt"});
        return res.json({ Demandes: demandes });
        
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { GetDemande };
