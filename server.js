const express = require("express");
const connectBD = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectBD(); // connection avec la base de donnée
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // permettre la lesture des reponses et requete json
app.use("/api/contacts", require("./routes/contactRoutes")); // route pour les contacts
app.use("/api/users", require("./routes/userRoutes")); // pour les utilisateurs afin de se connecter
app.use(errorHandler); // pour la gestion des erreurs

app.listen(port, () => console.log("helloo"));

