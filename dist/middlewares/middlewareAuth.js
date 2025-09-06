"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const middlewareJWT_1 = require("./middlewareJWT"); // aqui sim você importa do JWT
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res.status(401).json({ message: "Token não fornecido" });
    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: "Token inválido" });
    const decoded = middlewareJWT_1.TokenJWT.verifyToken(token);
    if (!decoded || !decoded.id)
        return res.status(401).json({ message: "Token inválido" });
    req.userId = Number(decoded.id); // injeta o id do usuário
    next();
}
//# sourceMappingURL=middlewareAuth.js.map