const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cors());


const users = [
    {
        username: 'admin',
        password: 'root'
    },
];

const authenticateUser = (req, res, next) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.user = user;
    next();
}


app.post('/login', authenticateUser, (req, res) => {
    const token = jwt.sign(req.user, SECRET_KEY);
    res.json({ token });
});


const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.decoded = decoded;
        next();
    });
}


app.post('/add', verifyJWT, (req, res) => {
    const { num1, num2 } = req.body;
    const result = num1 + num2;
    res.json({ result });
});

app.post('/subtract', verifyJWT, (req, res) => {
    const { num1, num2 } = req.body;
    const result = num1 - num2;
    res.json({ result });
});

app.post('/multiply', verifyJWT, (req, res) => {
    const { num1, num2 } = req.body;
    const result = num1 * num2;
    res.json({ result });
});

app.post('/divide', verifyJWT, (req, res) => {
    const { num1, num2 } = req.body;
    try {
        if (num2 === 0) {
            throw new Error('Cannot divide by zero');
        }
        const result = num1 / num2;

        res.json({ result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
