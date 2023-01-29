import validator from "validator";
import { IUser } from "../../domain/model/IUser";
import { ICreateUserRepository } from "../../repository/protocol/ICreateUserRepository";
import { AppError } from "../../shared/error/AppError";
import { HttpStatusCode } from "../../shared/protocol/HttpStatusCode";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { ICreateUserRequestDTO } from "./ICreateUserParamsDTO";

export class CreateUserUseCase implements IUseCase {
    constructor(private repository: ICreateUserRepository) { }

    async execute(data: ICreateUserRequestDTO): Promise<IUser | AppError> {
        try {
            const emailIsValid = validator.isEmail(data.email)

            if (!emailIsValid) {
                return new AppError(HttpStatusCode.BAD_REQUEST, "E-mail is invalid")
            }

            const user = await this.repository.createUser(data)

            return user
        } catch (error) {
            return error instanceof AppError
                ? new AppError(error.status, error.message)
                : new AppError(HttpStatusCode.SERVER_ERROR)
        }
    }
}