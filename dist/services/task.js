"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchTaskService = exports.GetTaskByIdService = exports.GetTaskService = exports.DeleteTaskService = exports.UpdateTaskService = exports.CreateTaskService = void 0;
const messages_1 = require("../utils/messages");
const prisma_1 = require("../prisma");
class CreateTaskService {
    async execute({ title, description_task, id_user }) {
        try {
            if (!title || !description_task || !id_user) {
                console.log({ ...messages_1.ERROR_REQUIRED_FIELDS });
            }
            const task = await prisma_1.default.tasks.create({
                data: {
                    id_user: id_user,
                    title: title,
                    description_task: description_task
                }
            });
            return task;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.CreateTaskService = CreateTaskService;
class UpdateTaskService {
    async execute(id, { title, description_task, id_user, is_done }) {
        try {
            if (title === undefined &&
                description_task === undefined &&
                id_user === undefined &&
                is_done === undefined) {
                return messages_1.ERROR_REQUIRED_FIELDS;
            }
            const task = await prisma_1.default.tasks.update({
                where: {
                    id_task: id
                },
                data: {
                    id_user: id_user,
                    title: title,
                    description_task: description_task,
                    is_done: is_done
                }
            });
            return task;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.UpdateTaskService = UpdateTaskService;
class DeleteTaskService {
    async execute(id) {
        try {
            if (!id) {
                console.log({ ...messages_1.ERROR_INVALID_ID });
            }
            const task = await prisma_1.default.tasks.delete({
                where: {
                    id_task: id
                }
            });
            return task;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.DeleteTaskService = DeleteTaskService;
class GetTaskService {
    async execute() {
        try {
            const task = await prisma_1.default.tasks.findMany();
            return task;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.GetTaskService = GetTaskService;
class GetTaskByIdService {
    async execute(id) {
        try {
            if (!id) {
                console.log({ ...messages_1.ERROR_INVALID_ID });
            }
            const task = await prisma_1.default.tasks.findUnique({
                where: {
                    id_task: id
                }
            });
            return task;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.GetTaskByIdService = GetTaskByIdService;
class PatchTaskService {
    async execute(id, { is_done }) {
        try {
            const task = await prisma_1.default.tasks.update({
                where: {
                    id_task: id
                },
                data: {
                    is_done: is_done
                }
            });
            return task;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.PatchTaskService = PatchTaskService;
//# sourceMappingURL=task.js.map