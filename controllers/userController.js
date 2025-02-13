const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    
    const userAvailable = await User.findOne({ email }); // vérifier l'existance du email
    
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
});

// @desc connecter un utilisateur
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("tous les champs sont obligatoire");
    }

    const user = await User.findOne({ email }); // vérifier l'existence du email

    if (user && (await bcrypt.compare(password, user.password))) { // comparer le password avec le password hasher de la base de donnée
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("l'email ou le mot de passe est incorrect");
    } 
});

// @desc infos sur l' utilisateur actuel
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
}