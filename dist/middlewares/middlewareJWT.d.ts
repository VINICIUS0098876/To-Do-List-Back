import * as jwt from "jsonwebtoken";
export declare class TokenJWT {
    static generateToken(payload: object): string;
    static verifyToken(token: string): jwt.JwtPayload | null;
}
//# sourceMappingURL=middlewareJWT.d.ts.map