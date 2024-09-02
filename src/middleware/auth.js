import jwt from "jsonwebtoken";
import IvalidCredentials from "../error/InvalidCredentials.js";

const authmiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const key = process.env.AUTH_SECRET_KEY;

    if (!token) {
        throw new IvalidCredentials("You cannot access this operation without a token!");
    }

    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
}

export default authmiddleware;