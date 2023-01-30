import { IUser } from "../../domain/model/IUser"

export type CreateUserParams = {
    uid: string
    name: string
    isImporter: boolean
}

export interface ICreateUserRepository {
    createUser(params: CreateUserParams): Promise<IUser>
}