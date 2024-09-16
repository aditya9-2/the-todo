import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {

    const token = req.headers.authorization;
    const decodedData = jwt.verify(token, JWT_SECRET)

    if (decodedData) {
        req.userId = token.userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorect Credintials"
        })
    }

}

export default auth;