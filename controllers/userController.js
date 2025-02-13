const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// @desc inscrire un utilisateur
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if ( !username || !email || !password ) {
        res.status(400);
        throw new Error("tous les champs sont obligatoire");
    }
    
    const userAvailable = await User.findOne({email}); // vérifier l'existance du email
    
    if (userAvailable) {
        res.status(400);
        throw new Error("Cet email existe déjà");
    }

    const hashpassword = await bcrypt.hash(password, 10); // hasher le mot de pass avec bcrypt
    const user = await User.create({
        username,
        email,
        password: hashpassword,
    });

    if (user) {
        res.status(201).json({username: user.username, email: user.email});
    } else {
        res.status(404);
        throw new Error("donnée non valide");
    }

    // res.json({message: "inscrire un utilisateur"});
});

// @desc connecter un utilisateur
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    res.json({message: "connecter un utilisateur"});
});

// @desc infos sur l' utilisateur actuel
// @route POST /api/users/current
// @access public
const currentUser = asyncHandler(async (req, res) => {
    res.json({message: "information de l'utilisateur actuel"});
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
}