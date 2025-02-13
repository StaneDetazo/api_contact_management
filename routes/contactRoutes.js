const express = require("express"); // importation du framework express
const router = express.Router(); // importation pour l'utilisation des routes
const { 
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
 } = require("../controllers/contactController");
const validateToken = require("../middleware/validationTokenHandler");

router.use(validateToken);
// route pour récupérer tous les contacts.pour créer un contact 
router.route("/").get(getContacts).post(createContact);

// route pour récupérer un contact donné.pour modifier un contact donné.pour supprimer un contact donné
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;