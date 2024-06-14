const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateAccessToken = (user) => {
    return jwt.sign({ email: user }, SECRET_KEY, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ email: user }, SECRET_KEY, { expiresIn: '30d' });
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    authenticateToken,
    hashPassword,
    comparePassword
};


