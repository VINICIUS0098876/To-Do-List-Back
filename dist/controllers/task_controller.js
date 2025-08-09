"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchTaskController = exports.GetTaskByIdController = exports.GetTaskController = exports.DeleteTaskController = exports.UpdateTaskController = exports.CreateTaskController = void 0;
const messages_1 = require("../utils/messages");
const messages_2 = require("../utils/messages");
const task_1 = require("../services/task");
class CreateTaskController {
    async handle(request, response) {
        const { title, description_task, id_user } = request.body;
        if (!title || !description_task || !id_user) {
            return response.status(400).json({ ...messages_2.ERROR_REQUIRED_FIELDS });
        }
        try {
            const createTaskService = new task_1.CreateTaskService();
            const task = await createTaskService.execute({ title, description_task, id_user });
            return response.status(201).json({ ...messages_1.SUCCESS_CREATED_ITEM, data: task });
        }
        catch (error) {
            console.log({ ...messages_2.ERROR_INTERNAL_SERVER }, error);
        }
    }
}
exports.CreateTaskController = CreateTaskController;
class UpdateTaskController {
    async handle(request, response) {
        const id = Number(request.params.id);
        const { title, description_task, id_user } = request.body;
        if (!id || !title || !description_task || !id_user) {
            return response.status(400).json({ ...messages_2.ERROR_REQUIRED_FIELDS });
        }
        try {
            const updateTaskService = new task_1.UpdateTaskService();
            const task = await updateTaskService.execute(id, { title, description_task, id_user });
            return response.status(200).json({ ...messages_1.SUCCESS_UPDATED_ITEM, data: task });
        }
        catch (error) {
            console.log({ ...messages_2.ERROR_INTERNAL_SERVER }, error);
        }
    }
}
exports.UpdateTaskController = UpdateTaskController;
class DeleteTaskController {
    async handle(request, response) {
        const id = Number(request.params.id);
        if (!id) {
            return response.status(400).json({ ...messages_2.ERROR_INVALID_ID });
        }
        try {
            const deleteTaskService = new task_1.DeleteTaskService();
            const task = await deleteTaskService.execute(id);
            return response.status(200).json({ ...messages_1.SUCCESS_DELETED_ITEM, data: task });
        }
        catch (error) {
            console.log({ ...messages_2.ERROR_INTERNAL_SERVER }, error);
        }
    }
}
exports.DeleteTaskController = DeleteTaskController;
class GetTaskController {
    async handle(request, response) {
        try {
            const getTaskService = new task_1.GetTaskService();
            const tasks = await getTaskService.execute();
            if (tasks?.length === 0) {
                return response.status(404).json({ ...messages_2.ERROR_NOT_FOUND });
            }
            return response.status(200).json({ Tasks: tasks });
        }
        catch (error) {
            console.log({ ...messages_2.ERROR_INTERNAL_SERVER }, error);
        }
    }
}
exports.GetTaskController = GetTaskController;
class GetTaskByIdController {
    async handle(request, response) {
        const id = Number(request.params.id);
        if (!id) {
            return response.status(400).json({ ...messages_2.ERROR_INVALID_ID });
        }
        try {
            const getTaskByIdService = new task_1.GetTaskByIdService();
            const task = await getTaskByIdService.execute(id);
            if (!task) {
                return response.status(404).json({ ...messages_2.ERROR_NOT_FOUND });
            }
            return response.status(200).json(task);
        }
        catch (error) {
            console.log({ ...messages_2.ERROR_INTERNAL_SERVER }, error);
        }
    }
}
exports.GetTaskByIdController = GetTaskByIdController;
class PatchTaskController {
    async handle(request, response) {
        const id = Number(request.params.id);
        const is_done = request.body.is_done;
        if (!id || typeof is_done !== 'boolean') {
            return response.status(400).json({ ...messages_2.ERROR_REQUIRED_FIELDS });
        }
        if (!id) {
            return response.status(400).json({ ...messages_2.ERROR_INVALID_ID });
        }
        try {
            const patchTaskService = new task_1.PatchTaskService();
            const task = await patchTaskService.execute(id, { is_done });
            return response.status(200).json({ ...messages_1.SUCCESS_UPDATED_ITEM, data: task });
        }
        catch (error) {
            console.log({ ...messages_2.ERROR_INTERNAL_SERVER }, error);
        }
    }
}
exports.PatchTaskController = PatchTaskController;
//# sourceMappingURL=task_controller.js.map