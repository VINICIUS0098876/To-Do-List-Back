import { Request, Response } from "express";
import { SUCCESS_CREATED_ITEM, SUCCESS_DELETED_ITEM, SUCCESS_LOGIN_ITEM, SUCCESS_UPDATED_ITEM } from "../utils/messages";
import { ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER, ERROR_INVALID_ID, ERROR_REQUIRED_FIELDS } from "../utils/messages";
import { CreateUserService, UpdateUserService, DeleteUserService, GetUserByIdService, ListUsersService, LoginUserService } from "../services/user";

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const {name_user, email, password_hash} = request.body;

        if(!name_user || !email || !password_hash) {
            return response.status(400).json({...ERROR_REQUIRED_FIELDS});
        }

        try {
            const createUserService = new CreateUserService();

            const user = await createUserService.execute({name_user, email, password_hash})

            return response.status(201).json({
                ...SUCCESS_CREATED_ITEM,
                data: user
            });
            
        } catch (error) {
            console.log("Error creating user:", error);
            return response.status(500).json({ ...ERROR_INTERNAL_SERVER})
        }
}

}

export class ListUsersController {
    async handle(request: Request, response: Response) {
        try {
            const listUsersService = new ListUsersService();

            const users = await listUsersService.execute()

            return response.status(200).json(users);

        } catch (error) {
            console.log("Error listing users:", error);
            return response.status(500).json({ error: "Internal server error" });
        }
    }
}

export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const  id  = Number(request.params.id);
        const { name_user, email, password_hash } = request.body;

        if (!id || !name_user || !email || !password_hash) {
            return response.status(400).json({ ...ERROR_REQUIRED_FIELDS });
        }

        try {
            const updateUserService = new UpdateUserService();

            const user = await updateUserService.execute(id, {name_user, email, password_hash});

            return response.status(200).json({
                ...SUCCESS_UPDATED_ITEM,
                data: user
            });

        } catch (error) {
            console.log("Error updating user:", error);
            return response.status(500).json({ ...ERROR_INTERNAL_SERVER})
        }
    }
}

export class DeleteUserController {
    async handle(request: Request, response: Response) {
        const  id  = Number(request.params.id);

        if(!id) {
            return response.status(400).json({ ...ERROR_INVALID_ID }); 
        }

        try {
            const deleteUserService = new DeleteUserService();

            const user = await deleteUserService.execute(id)

            return response.status(200).json({
                ...SUCCESS_DELETED_ITEM,
                data: user
            });

        } catch (error) {
            console.log("Error deleting user:", error);
            return response.status(500).json({ ...ERROR_INTERNAL_SERVER})
        }
    }
}

export class GetUserByIdController {
    async handle(request: Request, response: Response) {
        const  id  = Number(request.params.id); 

        if(!id) {
            return response.status(400).json({ ...ERROR_INVALID_ID });
        }

        try {
            const getUserByIdService = new GetUserByIdService();

            const user = await getUserByIdService.execute(id);

            if (!user) {
                return response.status(404).json({ ...ERROR_NOT_FOUND });
            }

            return response.status(200).json(user);

        } catch (error) {
            console.log("Error fetching user by ID:", error);
            return response.status(500).json({ ...ERROR_INTERNAL_SERVER})
        }
    }

}

export class LoginUserController {
    async handle(request: Request, response: Response) {
        const { email, password_hash } = request.body;

        if (!email || !password_hash) {
            return response.status(400).json({ ...ERROR_REQUIRED_FIELDS });
        }

        try {
            const loginUserService = new LoginUserService();
            const login = await loginUserService.execute(email, password_hash);

            return response.status(200).json({...SUCCESS_LOGIN_ITEM, Login: login});

        } catch (error) {
            console.log("Error logging in user:", error);
            return response.status(500).json({ ...ERROR_INTERNAL_SERVER });
        }
    }
}


