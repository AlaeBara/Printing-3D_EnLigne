const { Message } = require("../BD/Messages");


const messageUser = async (req, res) => {
    try {
        const { fullname, email,  telephone, message} = req.body;
        
        const newModel = new Message({
            fullname,
            email,
            telephone,
            message,
        });
        await newModel.save();

        return res.json({ status: "success", message: "message envoyes" });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ status: "fail", message: "Erreur Interne du Serveur" });
    }
};

module.exports = { messageUser };
