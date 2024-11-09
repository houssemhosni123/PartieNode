// backend/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',             
    password: '', 
    database: 'gestion_reclamation'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

// CRUD routes
app.post('/reclamations', (req, res) => {
    const { title, description, status } = req.body;
    db.query(
        'INSERT INTO reclamations (title, description, status) VALUES (?, ?, ?)',
        [title, description, status],
        (err, result) => {
            if (err) throw err;
            res.send({ message: 'Reclamation added', id: result.insertId });
        }
    );
});

app.get('/reclamations', (req, res) => {
    db.query('SELECT * FROM reclamations', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/reclamations/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM reclamations WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

app.put('/reclamations/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    db.query(
        'UPDATE reclamations SET title = ?, description = ?, status = ? WHERE id = ?',
        [title, description, status, id],
        (err, result) => {
            if (err) throw err;
            res.send({ message: 'Reclamation updated' });
        }
    );
});
app.get('/reclamations/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM reclamations WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send(result[0]);  // Sending the first result (the reclamation object)
    });
});


app.delete('/reclamations/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM reclamations WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Reclamation deleted' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
