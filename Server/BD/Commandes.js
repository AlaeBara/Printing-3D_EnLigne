const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    date:{
        type: String,
        default: () => {
            const date = new Date();
            const year = String(date.getFullYear()).padStart(4, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        }
    },
    date_confirmation:{
        type: String,
        default: null,
    },
    date_résiliation:{
        type: String,
        default: null,
    },
    printerStatus: {
        type: String,
        default: "Prêt"
    },
    email: {
        type: String,
        required: true,
        ref: 'Client',
    },
    telephone: {
        type: Number,
        required: true,
        ref: 'Client',
    }
});

const Commandes = mongoose.model("Commande", newSchema);

module.exports = { Commandes };
