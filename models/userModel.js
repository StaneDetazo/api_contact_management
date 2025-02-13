const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Veuillez renseigné le nom d'utilisateur"],
        },
        email: {
            type: String,
            required: [true, "Veuillez renseigné l'email"],
            unique: [true, "Cet email existe déjà"],
        },
        password: {
            type: String,
            required: [true, "Veuillez renseigné le mot de passe"],
        },
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);