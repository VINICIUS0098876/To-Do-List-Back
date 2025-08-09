import { Router } from 'express';
import { CreateUserController, UpdateUserController, ListUsersController, GetUserByIdController, LoginUserController, DeleteUserController } from './controllers/user_controller';
import { CreateTaskController, UpdateTaskController, DeleteTaskController, GetTaskByIdController, GetTaskController, PatchTaskController } from './controllers/task_controller';

const router = Router();

// User routes
router.post('/users', async (request, response) => new CreateUserController().handle(request, response));

router.put('/users/:id', async (request, response) => new UpdateUserController().handle(request, response));

router.get('/users', async (request, response) => new ListUsersController().handle(request, response));

router.get('/users/:id', async (request, response) => new GetUserByIdController().handle(request, response));

router.delete('/users/:id', async (request, response) => new DeleteUserController().handle(request, response));

router.post('/login', async (request, response) => new LoginUserController().handle(request, response));

// Task routes
router.post('/tasks', async (request, response) => new CreateTaskController().handle(request, response));

router.put('/tasks/:id', async (request, response) => new UpdateTaskController().handle(request, response));

router.delete('/tasks/:id', async (request, response) => new DeleteTaskController().handle(request, response));

router.get('/tasks/:id', async (request, response) => new GetTaskByIdController().handle(request, response));

router.get('/tasks', async (request, response) => new GetTaskController().handle(request, response));

router.patch('/tasks/:id', async (request, response) => new PatchTaskController().handle(request, response));


export default router;



