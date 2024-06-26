const jwt = require("jsonwebtoken");

const authenticateToken = (secretKey) => (req, res, next) => {
    const token = req.cookies.token;
    console.log('token access', token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = decoded;
        next();
    });
};

module.exports = { authenticateToken };
