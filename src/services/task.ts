    import { ERROR_INTERNAL_SERVER_DB, ERROR_INVALID_ID, ERROR_NOT_FOUND, ERROR_REQUIRED_FIELDS } from "../utils/messages";
    import prismaClient from "../prisma";

    interface Task {
        id_user: number
        title: string
        description_task: string,
    }

    interface taskUpdate {
        id_user?: number
        title?: string
        description_task?: string,
        is_done?: boolean
    }

    export class CreateTaskService {
        async execute({title, description_task, id_user}: Task) {
            try {
                if(!title || !description_task || !id_user) {
                    console.log({...ERROR_REQUIRED_FIELDS});
                }

                const task = await prismaClient.tasks.create({
                    data:{
                        id_user:id_user,
                        title: title,
                        description_task: description_task
                    }
                })

                return task

            } catch (error) {
                console.log({...ERROR_INTERNAL_SERVER_DB}, error);
            }
        }
    }

    export class UpdateTaskService {
        async execute(id: number, {title, description_task, id_user, is_done}: taskUpdate){
            try {
            if (
        title === undefined &&
        description_task === undefined &&
        id_user === undefined &&
        is_done === undefined
    ) {
        return ERROR_REQUIRED_FIELDS;
    }

            

                const task = await prismaClient.tasks.update({
                    where:{
                        id_task: id
                    },
                    data:{
                        id_user: id_user,
                        title: title,
                        description_task: description_task,
                        is_done: is_done
                    }
                })

                

                return task

            } catch (error) {
                console.log({...ERROR_INTERNAL_SERVER_DB}, error);
            }
        }
    }

    export class DeleteTaskService {
        async execute(id: number) {
            try {
                if(!id) {
                    console.log({...ERROR_INVALID_ID});
                }

                const task = await prismaClient.tasks.delete({
                    where:{
                        id_task: id
                    }
                })

                return task

            } catch (error) {
                console.log({...ERROR_INTERNAL_SERVER_DB}, error);
            }
        }
    }

    export class GetTaskService {
        async execute(id_user: number) {
            try {

                const task = await prismaClient.tasks.findMany({
                    where: {
                        id_user: id_user
                    }
                })

                return task

            } catch (error) {
                console.log({...ERROR_INTERNAL_SERVER_DB}, error);
            }
        }
    }

    export class GetTaskByIdService {
        async execute(id: number, id_user: number) {
            try {
                if(!id || !id_user) {
                    console.log({...ERROR_INVALID_ID});
                }

                const task = await prismaClient.tasks.findFirst({
                    where: {
                        id_task: id,
                        id_user: id_user
                    }
                })

                return task
                
            } catch (error) {
                console.log({...ERROR_INTERNAL_SERVER_DB}, error);
            }
        }
    }

    export class PatchTaskService{
        async execute(id: number, id_user: number, {is_done}: taskUpdate){
            try {
                const task = await prismaClient.tasks.updateMany({
                    where: {
                        id_task: id, 
                        id_user: id_user
                    },
                    data: {
                        is_done: is_done
                    }
                })

                return task

            } catch (error) {
                console.log({...ERROR_INTERNAL_SERVER_DB}, error);
            }
        }
    }