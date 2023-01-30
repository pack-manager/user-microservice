import { IUser } from "../../domain/model/IUser";

export interface IGetUserRepository {
    getUser(id: string): Promise<IUser>
}