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
        return res.status(401).json({ message: 'Invalid username and passsword' });
    }
    req.user = user;
    next();
}


app.post('/login', authenticateUser, (req, res) => {
    const token = jwt.sign(req.user, SECRET_KEY);
    res.json({ token });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
