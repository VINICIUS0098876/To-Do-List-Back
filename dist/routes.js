"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./controllers/user_controller");
const task_controller_1 = require("./controllers/task_controller");
const router = (0, express_1.Router)();
// User routes
router.post('/users', async (request, response) => new user_controller_1.CreateUserController().handle(request, response));
router.put('/users/:id', async (request, response) => new user_controller_1.UpdateUserController().handle(request, response));
router.get('/users', async (request, response) => new user_controller_1.ListUsersController().handle(request, response));
router.get('/users/:id', async (request, response) => new user_controller_1.GetUserByIdController().handle(request, response));
router.delete('/users/:id', async (request, response) => new user_controller_1.DeleteUserController().handle(request, response));
// Task routes
router.post('/tasks', async (request, response) => new task_controller_1.CreateTaskController().handle(request, response));
router.put('/tasks/:id', async (request, response) => new task_controller_1.UpdateTaskController().handle(request, response));
router.delete('/tasks/:id', async (request, response) => new task_controller_1.DeleteTaskController().handle(request, response));
router.get('/tasks/:id', async (request, response) => new task_controller_1.GetTaskByIdController().handle(request, response));
router.get('/tasks', async (request, response) => new task_controller_1.GetTaskController().handle(request, response));
router.patch('/tasks/:id', async (request, response) => new task_controller_1.PatchTaskController().handle(request, response));
exports.default = router;
//# sourceMappingURL=routes.js.map