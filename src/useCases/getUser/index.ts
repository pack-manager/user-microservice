import { MongoGetUserRepository } from "../../repository/MongoGetUserRepository";
import { GetUserUseCase } from "./GetUserUseCase";
import { GetUserController } from "./GetUserController";

const repository = new MongoGetUserRepository()
const getUserUseCase = new GetUserUseCase(repository)
const getUserController = new GetUserController(getUserUseCase)

export { getUserUseCase, getUserController }