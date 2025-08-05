import { Router } from 'express';
import { CreateUserController, UpdateUserController, ListUsersController, GetUserByIdController, DeleteUserController } from './controllers/user_controller';


const router = Router();

// User routes
router.post('/users', async (request, response) => new CreateUserController().handle(request, response));

router.put('/users/:id', async (request, response) => new UpdateUserController().handle(request, response));

router.get('/users', async (request, response) => new ListUsersController().handle(request, response));

router.get('/users/:id', async (request, response) => new GetUserByIdController().handle(request, response));

router.delete('/users/:id', async (request, response) => new DeleteUserController().handle(request, response));

// Task routes

export default router;



