const express = require('express');
const db = require('./postgres-config');
const router = require('./router');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/transactions', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});