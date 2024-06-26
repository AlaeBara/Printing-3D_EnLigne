const { Commandes } = require("../../BD/Commandes");
const fs = require('fs');
const path = require('path');

const DeleteDemande = async (req, res) => {
    try {
        const { file_name } = req.body;

        const deleteDemande = await Commandes.deleteOne({ file_name });
        
        // Define the path to the file
        const filePath = path.join(__dirname, '../../Storage', file_name);

        // Delete the file from the storage
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                alert("Error deleting file",err)
                return res.status(500).json({ message: "Error deleting file" });
            }
        });
        
        const demandes = await Commandes.find({ printerStatus: "Prêt" });
        return res.json({ Demandes: demandes });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { DeleteDemande };
