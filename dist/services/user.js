"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserService = exports.GetUserByIdService = exports.UpdateUserService = exports.DeleteUserService = exports.ListUsersService = exports.CreateUserService = void 0;
const messages_1 = require("../utils/messages");
const index_1 = require("../prisma/index");
const bcrypt = require("bcrypt");
const middlewareJWT_1 = require("../middlewares/middlewareJWT");
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
class LoginUserService {
    async execute(email, password_hash) {
        try {
            const user = await index_1.default.users.findFirst({
                where: { email }
            });
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            const isPasswordValid = await bcrypt.compare(password_hash, user.password_hash);
            if (!isPasswordValid) {
                throw new Error('Credenciais inválidas!');
            }
            const token = middlewareJWT_1.TokenJWT.generateToken({ id: user.id_user });
            return {
                user: {
                    id_user: user.id_user,
                    name_user: user.name_user,
                    email: user.email
                },
                token
            };
        }
        catch (error) {
            console.log('Erro no login:', error);
            throw error; // importante: lança para o controller retornar 400/401
        }
    }
}
exports.LoginUserService = LoginUserService;
//# sourceMappingURL=user.js.map