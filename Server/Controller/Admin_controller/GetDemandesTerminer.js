const { Commandes } = require("../../BD/Commandes");

const GetDemandesTerminer= async (req, res) => {
    try {

        const demandesTerminer = await  Commandes.find({printerStatus:"fin de d'impression"});
        return res.json({ DemandesTerminer: demandesTerminer });
        
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { GetDemandesTerminer};
