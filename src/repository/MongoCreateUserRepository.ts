import { MongoClient } from "../app/database/Mongo";
import { IUser } from "../domain/model/IUser";
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
            throw new Error("User not created")
        }

        const { _id, ...rest } = user
        return { id: _id.toHexString(), ...rest }
    }
}