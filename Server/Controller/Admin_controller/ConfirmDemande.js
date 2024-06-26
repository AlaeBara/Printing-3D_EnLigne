const { Commandes } = require("../../BD/Commandes");

const ConfirmDemand = async (req, res) => {
    try {
        const { file_name } = req.body;

        
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        await Commandes.findOneAndUpdate(
            { file_name: file_name },
            {
                printerStatus: "En cours d'impression",
                date_confirmation: formattedDate 
            },
            { new: true }
        );
        const demandes = await Commandes.find({ printerStatus: "Prêt" });
        return res.json({ demandes });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { ConfirmDemand };
