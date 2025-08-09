import { ERROR_INTERNAL_SERVER_DB, ERROR_INVALID_ID, ERROR_NOT_FOUND, ERROR_REQUIRED_FIELDS } from "../utils/messages";
import prismaClient from "../prisma/index";
import * as bcrypt from "bcrypt";
import { TokenJWT } from "../middlewares/middlewareJWT";

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


export class LoginUserService {
    async execute(email: string, password_hash: string) {
        try {
            const user = await prismaClient.users.findFirst({
                where:{
                    email: email
                }
            })

            if(!user){
                console.log({...ERROR_INVALID_ID});
            }

            const isPasswordValid = await bcrypt.compare(password_hash, user?.password_hash || "");

            if(!isPasswordValid) {
                console.log({...ERROR_NOT_FOUND});
            }

            const token = TokenJWT.generateToken({id: user?.id_user})

            return {
                user:{
                id_user: user?.id_user,
                name_user: user?.name_user,
                email: user?.email
            }, 
            token
        }


        } catch (error) {
            console.log({...ERROR_INTERNAL_SERVER_DB}, error);
        }
    }
}