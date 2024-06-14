import { Console } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SECRET || 'secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers['authorization']);
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        console.log(secretKey);
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
        (req as any).user = decoded;
        console.log((req as any).user);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Failed to authenticate token', error: error });
    }
};

export default authenticateToken;