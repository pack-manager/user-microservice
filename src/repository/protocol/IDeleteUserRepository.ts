import { IUser } from "../../domain/model/IUser";

export interface IDeleteUserRepository {
    deleteUser(id: string): Promise<IUser>
}