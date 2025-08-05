"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdController = exports.DeleteUserController = exports.UpdateUserController = exports.ListUsersController = exports.CreateUserController = void 0;
const messages_1 = require("../utils/messages");
const messages_2 = require("../utils/messages");
const user_1 = require("../services/user");
class CreateUserController {
    async handle(request, response) {
        const { name_user, email, password_hash } = request.body;
        if (!name_user || !email || !password_hash) {
            return response.status(400).json({ ...messages_2.ERROR_REQUIRED_FIELDS });
        }
        try {
            const createUserService = new user_1.CreateUserService();
            const user = await createUserService.execute({ name_user, email, password_hash });
            return response.status(201).json({
                ...messages_1.SUCCESS_CREATED_ITEM,
                data: user
            });
        }
        catch (error) {
            console.log("Error creating user:", error);
            return response.status(500).json({ ...messages_2.ERROR_INTERNAL_SERVER });
        }
    }
}
exports.CreateUserController = CreateUserController;
class ListUsersController {
    async handle(request, response) {
        try {
            const listUsersService = new user_1.ListUsersService();
            const users = await listUsersService.execute();
            return response.status(200).json(users);
        }
        catch (error) {
            console.log("Error listing users:", error);
            return response.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.ListUsersController = ListUsersController;
class UpdateUserController {
    async handle(request, response) {
        const id = Number(request.params.id);
        const { name_user, email, password_hash } = request.body;
        if (!id || !name_user || !email || !password_hash) {
            return response.status(400).json({ ...messages_2.ERROR_REQUIRED_FIELDS });
        }
        try {
            const updateUserService = new user_1.UpdateUserService();
            const user = await updateUserService.execute(id, { name_user, email, password_hash });
            return response.status(200).json({
                ...messages_1.SUCCESS_UPDATED_ITEM,
                data: user
            });
        }
        catch (error) {
            console.log("Error updating user:", error);
            return response.status(500).json({ ...messages_2.ERROR_INTERNAL_SERVER });
        }
    }
}
exports.UpdateUserController = UpdateUserController;
class DeleteUserController {
    async handle(request, response) {
        const id = Number(request.params.id);
        if (!id) {
            return response.status(400).json({ ...messages_2.ERROR_INVALID_ID });
        }
        try {
            const deleteUserService = new user_1.DeleteUserService();
            const user = await deleteUserService.execute(id);
            return response.status(200).json({
                ...messages_1.SUCCESS_DELETED_ITEM,
                data: user
            });
        }
        catch (error) {
            console.log("Error deleting user:", error);
            return response.status(500).json({ ...messages_2.ERROR_INTERNAL_SERVER });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
class GetUserByIdController {
    async handle(request, response) {
        const id = Number(request.params.id);
        if (!id) {
            return response.status(400).json({ ...messages_2.ERROR_INVALID_ID });
        }
        try {
            const getUserByIdService = new user_1.GetUserByIdService();
            const user = await getUserByIdService.execute(id);
            if (!user) {
                return response.status(404).json({ ...messages_2.ERROR_NOT_FOUND });
            }
            return response.status(200).json(user);
        }
        catch (error) {
            console.log("Error fetching user by ID:", error);
            return response.status(500).json({ ...messages_2.ERROR_INTERNAL_SERVER });
        }
    }
}
exports.GetUserByIdController = GetUserByIdController;
//# sourceMappingURL=user_controller.js.map