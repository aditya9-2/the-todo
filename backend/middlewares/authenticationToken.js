import jwt from "jsonwebtoken";

// Authentication
const authenticationToken = (req, res, next) => {
    const autheHeader = req.headers["authorization"];
    const token = autheHeader && autheHeader.split("")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    })
}

export default authenticationToken;