const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            throw new Error("Authentication failed");
        }
        const token = authorization.split(' ')[1];
        const decode = jwt.verify(token, "sect123");
        
        const  Username  = decode['data']['Username']
      
        
        req.headers.Username = Username;; // Assigning the username to the headers for consistency
        next();
    } catch (error) {
        return res.status(401).json({ status: 'failed', message: 'Authentication failed' });
    }
};