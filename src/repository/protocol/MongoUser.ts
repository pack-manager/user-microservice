import { IUser } from "../../domain/model/IUser";

export type MongoUser = Omit<IUser, "id">