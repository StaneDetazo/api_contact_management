const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc récupérer tous les contacts
// @route GET /api/getContacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts)
});

// @desc récupérer un contact
// @route GET /api/getContacts/:id
// @access public
const getContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact non trouvé");
    }
    res.status(200).json(contact);
});

// @desc créer un nouveau contact
// @route POST /api/getContacts/
// @access public
const createContact = asyncHandler( async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if ( !name || !email || !phone ) {
        res.status(400);
        throw new Error("tous les champs sont obligatoire");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    
    res.status(200).json(contact);
}); 

// @desc modifier un contact
// @route PUT /api/getContacts/:id
// @access public
const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact non trouvé");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

// @desc supprimer un contact
// @route DELETE /api/getContacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("contact non trouvé");
    }
    await Contact.deleteOne();
    console.log("contact");
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
}