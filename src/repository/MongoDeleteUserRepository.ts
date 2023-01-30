import { ObjectId } from "mongodb";
import { MongoClient } from "../app/database/Mongo";
import { IUser } from "../domain/model/IUser"
import { AppErrorFactory } from "../shared/error/AppError";
import { HttpStatusCode } from "../shared/protocol/HttpStatusCode";
import { IDeleteUserRepository } from "./protocol/IDeleteUserRepository"
import { MongoUser } from "./protocol/MongoUser"

export class MongoDeleteUserRepository implements IDeleteUserRepository {
    async deleteUser(id: string): Promise<IUser> {
        const user = await MongoClient.db
            .collection<MongoUser>("users")
            .findOne({ _id: new ObjectId(id) })

        if (!user) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "User not found")
        }

        const deleteCount = await MongoClient.db
            .collection("users")
            .deleteOne({ _id: new ObjectId(id) })

        if (!deleteCount) {
            throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "User not deleted")
        }

        const { _id, ...rest } = user

        return { id: _id.toHexString(), ...rest }
    }
}