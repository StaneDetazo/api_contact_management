const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Veuillez renseigné le nom"],
        },
        email: {
            type: String,
            required: [true, "Veuillez renseigné l'email"],
        },
        phone: {
            type: String,
            required: [true, "Veuillez renseigné le contact"],
        },
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);