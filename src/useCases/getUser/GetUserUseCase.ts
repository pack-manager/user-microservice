import { IUser } from "../../domain/model/IUser";
import { IGetUserRepository } from "../../repository/protocol/IGetUserRepository";
import { AppError } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class GetUserUseCase implements IUseCase {
    constructor(
        private readonly repository: IGetUserRepository
    ) { }

    async execute(data: string): Promise<IUser | AppError> {
        try {
            const user = this.repository.getUser(data)
            return user
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}