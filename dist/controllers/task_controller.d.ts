import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/middlewareAuth";
export declare class CreateTaskController {
    handle(request: AuthRequest, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare class UpdateTaskController {
    handle(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare class DeleteTaskController {
    handle(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare class GetTaskController {
    handle(request: AuthRequest, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare class GetTaskByIdController {
    handle(request: AuthRequest, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare class PatchTaskController {
    handle(request: AuthRequest, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=task_controller.d.ts.map