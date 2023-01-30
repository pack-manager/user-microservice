import { IUser } from "../../domain/model/IUser"
import { AppError } from "../../shared/error/AppError"
import { badRequest, customErrorMessage, ok, serverError } from "../../shared/error/HttpError"
import { IController } from "../../shared/protocol/IController"
import { IHttpRequest } from "../../shared/protocol/IHttpRequest"
import { IHttpResponse } from "../../shared/protocol/IHttpResponse"
import { IUseCase } from "../../shared/protocol/IUseCase"

export class DeleteUserController implements IController {
    constructor(
        private readonly deleteUserUseCase: IUseCase
    ) { }

    async handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<IUser | string>> {
        try {
            const { id } = httpRequest.params

            if (!id) {
                return badRequest("Missing user id")
            }

            await this.deleteUserUseCase.execute(id)
            return ok<IUser>()
        } catch (error) {
            if (error instanceof AppError) {
                return customErrorMessage(error.status, error.message)
            }
            return serverError()
        }
    }
}