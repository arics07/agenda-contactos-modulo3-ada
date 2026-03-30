const express = require('express');
const fs = require('fs');
const path = require('path');

//Crear un enrutador
const router = express.Router();

// Ruta al archivo JSON que funciona como BBDD
const dataPath = path.join(__dirname, '../data/contacts.json');

// RUTAS

// Obtener todos los contactos: GET
router.get('/', (req, res) => {
    const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8')); //lee los datos existentes
    res.json(contacts);
});

// Agregar un nuevo contacto: POST
router.post('/', (req, res) => {
    const newContact = req.body; //obtenemos el nuevo contacto desde la solicitud
    const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    contacts.push(newContact);
    fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
    res.json({ message: 'Contacto agregado: ', contact: newContact });
});

// Actualizar un contacto existente: PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updateContact = req.body;
    let contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    contacts = contacts.map(contact => { contact.id === id ? updateContact : contact });
    fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
    res.json({ message: 'Contacto actualizado', contact: updateContact });
});

// Eliminar un contacto: DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    contacts = contacts.filter(contact => contact.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
    res.json({ message: 'Contacto eliminado.' });
});

module.exports = router;