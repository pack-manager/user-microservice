import { MongoCreateUserRepository } from "../../repository/MongoCreateUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const repository = new MongoCreateUserRepository()
const createUserUseCase = new CreateUserUseCase(repository)
const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }