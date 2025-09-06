import * as jwt from "jsonwebtoken";

const SECRET = 'todolist123';
const EXPIRES = 18000;

export class TokenJWT {
    static generateToken(payload: object): string {
        return jwt.sign(payload, SECRET, {
            expiresIn: EXPIRES,
        });
    }

    static verifyToken(token: string): jwt.JwtPayload | null {
        try {
            const decoded = jwt.verify(token, SECRET);

            if (typeof decoded === 'object' && decoded !== null) {
                return decoded as jwt.JwtPayload;
            }

            return null;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }
}
