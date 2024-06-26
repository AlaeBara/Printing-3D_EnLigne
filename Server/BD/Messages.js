const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    date:{
        type: String,
        default: () => {
            const date = new Date();
            const year = String(date.getFullYear()).padStart(4, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },
    email: {
        type: String,
        required: true,
    },
    telephone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true,
    }
});

const Message = mongoose.model("Message", newSchema);

module.exports = { Message };
