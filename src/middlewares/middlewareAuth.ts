import { Request, Response, NextFunction } from "express";
import { TokenJWT } from "./middlewareJWT"; // aqui sim você importa do JWT

export interface AuthRequest extends Request {
  userId?: number;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token inválido" });

  const decoded = TokenJWT.verifyToken(token);

  if (!decoded || !decoded.id) return res.status(401).json({ message: "Token inválido" });

  req.userId = Number(decoded.id); // injeta o id do usuário
  next();
}
