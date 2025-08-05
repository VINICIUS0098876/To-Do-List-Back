import { ERROR_INTERNAL_SERVER_DB, ERROR_INVALID_ID, ERROR_REQUIRED_FIELDS } from "../utils/messages";
import prismaClient from "../prisma/index";
import { Jwt } from "jsonwebtoken";
import * as bcrypt from "bcrypt";

interface User {
    name_user: string;
    email: string;
    password_hash: string;
}


export class CreateUserService {
    async execute({ name_user, email, password_hash }:User) {
        try {
            if(!name_user || !email || !password_hash) {
                console.log({...ERROR_REQUIRED_FIELDS});
            }

            const heashedPassword = await bcrypt.hash(password_hash, 10)
            const user = await prismaClient.users.create({
                data: {
                    name_user,
                    email,
                    password_hash: heashedPassword
                }
            })

            return user;

        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER_DB}, error);
        }
}
}

export class ListUsersService {
    async execute() {
        try {
            const user = await prismaClient.users.findMany()

            return user;

        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER_DB}, error);
        }
    }
}


export class DeleteUserService {
    async execute(id: number) {
        try {
            const user = await prismaClient.users.delete({
                where: {
                    id_user: id
                }
            })

            return user;

        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER_DB}, error);
        }
    }
}

export class UpdateUserService {
    async execute(id: number, { name_user, email, password_hash }: User) {
        try {
            if(!name_user || !email || !password_hash) {
                console.log({...ERROR_REQUIRED_FIELDS});
            }
            const heashedPassword = await bcrypt.hash(password_hash, 10)
            const user = await prismaClient.users.update({
                where: {
                    id_user: id
                },
                data: {
                    name_user,
                    email,
                    password_hash: heashedPassword
                }
            })

            return user;

        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER_DB}, error);
        }
    }
}


export class GetUserByIdService {
    async execute(id: number) {

        if (!id) {
            console.log({...ERROR_INVALID_ID});
        }
        
        try {
            const user = await prismaClient.users.findUnique({
                where: {
                    id_user: id
                }
            })

            return user;

        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER_DB}, error);
        }
    }

}
