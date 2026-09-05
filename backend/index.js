const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Models/db');

const taskRouter = require('./Routes/TaskRouter');

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ routes
app.use('/tasks', taskRouter);

// test route
app.get('/', (req, res) => {
    res.send('Hello from server');
});

// ✅ PORT (matches frontend)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on PORT=${PORT}`);
});