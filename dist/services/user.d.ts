interface User {
    name_user: string;
    email: string;
    password_hash: string;
}
export declare class CreateUserService {
    execute({ name_user, email, password_hash }: User): Promise<{
        name_user: string;
        email: string;
        password_hash: string;
        id_user: number;
    } | undefined>;
}
export declare class ListUsersService {
    execute(): Promise<{
        name_user: string;
        email: string;
        password_hash: string;
        id_user: number;
    }[] | undefined>;
}
export declare class DeleteUserService {
    execute(id: number): Promise<{
        name_user: string;
        email: string;
        password_hash: string;
        id_user: number;
    } | undefined>;
}
export declare class UpdateUserService {
    execute(id: number, { name_user, email, password_hash }: User): Promise<{
        name_user: string;
        email: string;
        password_hash: string;
        id_user: number;
    } | undefined>;
}
export declare class GetUserByIdService {
    execute(id: number): Promise<{
        name_user: string;
        email: string;
        password_hash: string;
        id_user: number;
    } | null | undefined>;
}
export declare class LoginUserService {
    execute(email: string, password_hash: string): Promise<{
        user: {
            id_user: number;
            name_user: string;
            email: string;
        };
        token: string;
    }>;
}
export {};
//# sourceMappingURL=user.d.ts.map