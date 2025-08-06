import { Request, Response } from "express";
import { SUCCESS_CREATED_ITEM, SUCCESS_DELETED_ITEM, SUCCESS_UPDATED_ITEM } from "../utils/messages";
import { ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER, ERROR_INVALID_ID, ERROR_REQUIRED_FIELDS } from "../utils/messages";
import { CreateTaskService, UpdateTaskService, DeleteTaskService, GetTaskByIdService, GetTaskService, PatchTaskService } from "../services/task";

export class CreateTaskController {
    async handle(request: Request, response: Response) {
        const {title, description_task, id_user} = request.body;

        if(!title || !description_task || !id_user) {
            return response.status(400).json({...ERROR_REQUIRED_FIELDS});
        }

        try {
            const createTaskService = new CreateTaskService();

            const task = await createTaskService.execute({title, description_task, id_user})

            return response.status(201).json({...SUCCESS_CREATED_ITEM,data: task});
        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER}, error);
        }
    }
}

export class UpdateTaskController {
    async handle(request: Request, response: Response) {
        const  id  = Number(request.params.id);
        const { title, description_task, id_user } = request.body;

        if (!id || !title || !description_task || !id_user) {
            return response.status(400).json({ ...ERROR_REQUIRED_FIELDS });
        }

        try {
            const updateTaskService = new UpdateTaskService();

            const task = await updateTaskService.execute(id, {title, description_task, id_user});

            return response.status(200).json({...SUCCESS_UPDATED_ITEM, data: task});
        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER}, error);
        }
    }

}

export class DeleteTaskController {
    async handle(request: Request, response: Response) {
        const id = Number(request.params.id);

        if (!id) {
            return response.status(400).json({ ...ERROR_INVALID_ID });
        }

        try {
            const deleteTaskService = new DeleteTaskService();

            const task = await deleteTaskService.execute(id)

            return response.status(200).json({ ...SUCCESS_DELETED_ITEM, data: task });
        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER}, error);
        }
    }


}

export class GetTaskController {
    async handle(request: Request, response: Response) {
        try {
            const getTaskService = new GetTaskService();

            const tasks = await getTaskService.execute()
            
            if (tasks?.length === 0) {
                return response.status(404).json({ ...ERROR_NOT_FOUND });
            }

            return response.status(200).json({ Tasks: tasks });
        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER}, error);
        }
    }
}

export class GetTaskByIdController {
    async handle(request: Request, response: Response) {
        const id  = Number(request.params.id);

        if(!id) {
            return response.status(400).json({ ...ERROR_INVALID_ID });
        }

        try {
            const getTaskByIdService = new GetTaskByIdService();

            const task = await getTaskByIdService.execute(id)

            if (!task) {
                return response.status(404).json({ ...ERROR_NOT_FOUND });
            }

            return response.status(200).json(task);

        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER}, error);
        }
    }
}

export class PatchTaskController {
    async handle(request: Request, response: Response) {
        const id = Number(request.params.id);
        const is_done = request.body.is_done;

        if (!id || typeof is_done !== 'boolean') {
            return response.status(400).json({ ...ERROR_REQUIRED_FIELDS });
        }

        if (!id) {
            return response.status(400).json({ ...ERROR_INVALID_ID });
        }

        try {
            const patchTaskService = new PatchTaskService();

            const task = await patchTaskService.execute(id, { is_done });

            return response.status(200).json({ ...SUCCESS_UPDATED_ITEM, data: task });
        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER}, error);
        }

    }
}