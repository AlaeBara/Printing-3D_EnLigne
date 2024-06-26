const { Message } = require("../../BD/Messages");

const GetMessages = async (req, res) => {
    try {
        const { date } = req.body;
        if (date) {
            const messages = await Message.find({ date: date });
            return res.json({ Messages: messages });
        } else {
           const messages = await Message.find();
           return res.json({ Messages: messages });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { GetMessages };
