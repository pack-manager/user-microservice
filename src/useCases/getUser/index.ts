import { MongoGetUserRepository } from "../../repository/MongoGetUserRepository";
import { GetUserUseCase } from "./GetUserUseCase";
import { GetUserUseCaseController } from "./GetUserUseCaseController";

const repository = new MongoGetUserRepository()
const getUserUseCase = new GetUserUseCase(repository)
const getUserController = new GetUserUseCaseController(getUserUseCase)

export { getUserUseCase, getUserController }