"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenJWT = void 0;
const jwt = require("jsonwebtoken");
const SECRET = 'todolist123';
const EXPIRES = 18000;
class TokenJWT {
    static generateToken(payload) {
        return jwt.sign(payload, SECRET, {
            expiresIn: EXPIRES,
        });
    }
    static verifyToken(token) {
        try {
            const decoded = jwt.verify(token, SECRET);
            if (typeof decoded === 'object' && decoded !== null) {
                return decoded;
            }
            return null;
        }
        catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }
}
exports.TokenJWT = TokenJWT;
//# sourceMappingURL=middlewareJWT.js.map