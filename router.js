const router = require('express').Router();

const db = require('./postgres-config');

router.post('/', (req, res) => {
    const { dateTime, author, sum, category, comment } = req.body;

    db.query('INSERT INTO transactions (dateTime, author, sum, category, comment) VALUES ($1, $2, $3, $4, $5)', [dateTime, author, sum, category, comment], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Transaction added with ID: ${results.insertId}`);
    });
});

router.get('/', (req, res) => {
    db.query('SELECT * FROM transactions ORDER BY dateTime DESC', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});


router.get('/categories', (req, res) => {
    db.query('SELECT * FROM categories ORDER BY name', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

module.exports = router;