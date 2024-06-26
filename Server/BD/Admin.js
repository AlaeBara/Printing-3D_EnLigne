const mongoose=require("mongoose")

const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model("Admin", newSchema);

module.exports={Admin}
