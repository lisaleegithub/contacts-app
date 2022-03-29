const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint /
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

// GET request
app.get('/api/contacts', cors(), async (req, res) => {
    try{
        const { rows: contacts } = await db.query('SELECT * FROM contacts');
        res.send(contacts);
    } catch (e){
        return res.status(400).json({e});
    }
});

// POST request
app.post('/api/contacts', cors(), async (req, res) => {
    const newContact = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone, notes: req.body.notes }
    // console.log([newContact.firstname, newContact.lastname, newContact.email, newContact.phone. newContact.notes]);
    const result = await db.query(
        'INSERT INTO contacts(firstname, lastname, email, phone, notes) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [newContact.firstname, newContact.lastname, newContact.email, newContact.phone, newContact.notes]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});


// app.delete('/api/contacts/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteContact = await db.query("DELETE FROM contacts WHERE id = $1", [id]);
//         res.send({ status: "Deleted"})
//     } catch (error) {
//         console.error(error.message)
//     }
// })

// DELETE request
app.delete("/api/contacts/:id", async (req, res) => {
    const contactId = req.params.id;
    console.log("Deleting", contactId);
    await db.query("DELETE FROM contacts WHERE id=($1)", [contactId]);
    res.send({ status: "successful delete!" });
});

// app.put("/api/contacts/:id", async (req, res) => {
//     const updateContact = { id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone, notes: req.body.notes }
//     console.log("Updating", contactId);
//     await db.query("UPDATE FROM contacts WHERE id=($1)", [contactId]);
//     res.send({ status: "successful update!" });
// });

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
