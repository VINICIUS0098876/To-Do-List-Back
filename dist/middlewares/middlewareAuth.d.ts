import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    userId?: number;
}
export declare function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=middlewareAuth.d.ts.map