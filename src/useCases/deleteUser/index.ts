import { MongoDeleteUserRepository } from "../../repository/MongoDeleteUserRepository"
import { DeleteUserController } from "./DeleteUserController"
import { DeleteUserUseCase } from "./DeleteUserUseCase"

const repository = new MongoDeleteUserRepository()
const deleteUserUseCase = new DeleteUserUseCase(repository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserUseCase, deleteUserController }