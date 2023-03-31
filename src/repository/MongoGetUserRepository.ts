import { ObjectId } from "mongodb";
import { MongoClient } from "../app/database/Mongo";
import { IUser } from "../domain/model/IUser";
import { AppErrorFactory } from "../shared/error/AppError";
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode";
import { IGetUserRepository } from "./protocol/IGetUserRepository";
import { MongoUser } from "./protocol/MongoUser";

export class MongoGetUserRepository implements IGetUserRepository {
    async getUser(id: string): Promise<IUser> {
        const user = await MongoClient.db
            .collection<MongoUser>("users")
            .findOne({ _id: new ObjectId(id) })

        if (!user) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "User not found")
        }

        const { _id, ...rest } = user
        return { id: _id.toHexString(), ...rest }
    }

    async getUserUid(uid: string): Promise<IUser> {
        const user = await MongoClient.db
            .collection<MongoUser>("users")
            .findOne({ uid })

        if (!user) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "User not found")
        }

        const { _id, ...rest } = user
        return { id: _id.toHexString(), ...rest }
    }
}