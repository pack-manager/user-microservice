import { MongoClient } from "../app/database/Mongo";
import { IUser } from "../domain/model/IUser";
import { AppError, AppErrorFactory } from "../shared/error/AppError";
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode";
import { CreateUserParams, ICreateUserRepository } from "./protocol/ICreateUserRepository";
import { MongoUser } from "./protocol/MongoUser";

export class MongoCreateUserRepository implements ICreateUserRepository {
    async createUser(params: CreateUserParams): Promise<IUser> {
        const { insertedId } = await MongoClient.db
            .collection("users")
            .insertOne(params)

        const user = await MongoClient.db
            .collection<MongoUser>("users")
            .findOne({ _id: insertedId })

        if (!user) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "User not created")
        }

        const { _id, ...rest } = user
        return { id: _id.toHexString(), ...rest }
    }
}