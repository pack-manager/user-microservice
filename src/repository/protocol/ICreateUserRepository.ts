import { IUser } from "../../domain/model/IUser"

export type CreateUserParams = {
    name: string
    email: string
    password: string
    isImporter: boolean
}

export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise<IUser>
}