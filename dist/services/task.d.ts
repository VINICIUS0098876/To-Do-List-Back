interface Task {
    id_user: number;
    title: string;
    description_task: string;
}
interface taskUpdate {
    id_user?: number;
    title?: string;
    description_task?: string;
    is_done?: boolean;
}
export declare class CreateTaskService {
    execute({ title, description_task, id_user }: Task): Promise<{
        id_user: number;
        title: string;
        description_task: string | null;
        is_done: boolean | null;
        due_date: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        id_task: number;
    } | undefined>;
}
export declare class UpdateTaskService {
    execute(id: number, { title, description_task, id_user, is_done }: taskUpdate): Promise<{
        status: boolean;
        status_code: number;
        message: string;
    } | {
        id_user: number;
        title: string;
        description_task: string | null;
        is_done: boolean | null;
        due_date: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        id_task: number;
    } | undefined>;
}
export declare class DeleteTaskService {
    execute(id: number): Promise<{
        id_user: number;
        title: string;
        description_task: string | null;
        is_done: boolean | null;
        due_date: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        id_task: number;
    } | undefined>;
}
export declare class GetTaskService {
    execute(id_user: number): Promise<{
        id_user: number;
        title: string;
        description_task: string | null;
        is_done: boolean | null;
        due_date: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        id_task: number;
    }[] | undefined>;
}
export declare class GetTaskByIdService {
    execute(id: number, id_user: number): Promise<{
        id_user: number;
        title: string;
        description_task: string | null;
        is_done: boolean | null;
        due_date: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        id_task: number;
    } | null | undefined>;
}
export declare class PatchTaskService {
    execute(id: number, id_user: number, { is_done }: taskUpdate): Promise<import(".prisma/client").Prisma.BatchPayload | undefined>;
}
export {};
//# sourceMappingURL=task.d.ts.map