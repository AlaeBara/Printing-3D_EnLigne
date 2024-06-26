const { Commandes } = require("../../BD/Commandes");

const GetDemandeConfirm= async (req, res) => {
    try {

        const demandesConfirm = await  Commandes.find({printerStatus:"En cours d'impression"});
        return res.json({ DemandesConfirm: demandesConfirm });
        
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { GetDemandeConfirm};
