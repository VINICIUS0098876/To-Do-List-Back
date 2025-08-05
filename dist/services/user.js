"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdService = exports.UpdateUserService = exports.DeleteUserService = exports.ListUsersService = exports.CreateUserService = void 0;
const messages_1 = require("../utils/messages");
const index_1 = require("../prisma/index");
const bcrypt = require("bcrypt");
class CreateUserService {
    async execute({ name_user, email, password_hash }) {
        try {
            if (!name_user || !email || !password_hash) {
                console.log({ ...messages_1.ERROR_REQUIRED_FIELDS });
            }
            const heashedPassword = await bcrypt.hash(password_hash, 10);
            const user = await index_1.default.users.create({
                data: {
                    name_user,
                    email,
                    password_hash: heashedPassword
                }
            });
            return user;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.CreateUserService = CreateUserService;
class ListUsersService {
    async execute() {
        try {
            const user = await index_1.default.users.findMany();
            return user;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.ListUsersService = ListUsersService;
class DeleteUserService {
    async execute(id) {
        try {
            const user = await index_1.default.users.delete({
                where: {
                    id_user: id
                }
            });
            return user;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.DeleteUserService = DeleteUserService;
class UpdateUserService {
    async execute(id, { name_user, email, password_hash }) {
        try {
            if (!name_user || !email || !password_hash) {
                console.log({ ...messages_1.ERROR_REQUIRED_FIELDS });
            }
            const heashedPassword = await bcrypt.hash(password_hash, 10);
            const user = await index_1.default.users.update({
                where: {
                    id_user: id
                },
                data: {
                    name_user,
                    email,
                    password_hash: heashedPassword
                }
            });
            return user;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.UpdateUserService = UpdateUserService;
class GetUserByIdService {
    async execute(id) {
        if (!id) {
            console.log({ ...messages_1.ERROR_INVALID_ID });
        }
        try {
            const user = await index_1.default.users.findUnique({
                where: {
                    id_user: id
                }
            });
            return user;
        }
        catch (error) {
            console.log({ ...messages_1.ERROR_INTERNAL_SERVER_DB }, error);
        }
    }
}
exports.GetUserByIdService = GetUserByIdService;
//# sourceMappingURL=user.js.map