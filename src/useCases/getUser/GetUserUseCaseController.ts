import { IUser } from "../../domain/model/IUser";
import { AppError } from "../../shared/error/AppError";
import { badRequest, customErrorMessage, ok, serverError } from "../../shared/error/HttpError";
import { IController } from "../../shared/protocol/IController";
import { IHttpRequest } from "../../shared/protocol/IHttpRequest";
import { IHttpResponse } from "../../shared/protocol/IHttpResponse";
import { IUseCase } from "../../shared/protocol/IUseCase";

export class GetUserUseCaseController implements IController {
    constructor(
        private readonly getUserUseCase: IUseCase
    ) { }

    async handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<IUser | string>> {
        try {
            const { id } = httpRequest.params

            if (!id) {
                return badRequest("Missing user id")
            }

            const user = await this.getUserUseCase.execute(id)
            return ok<IUser>(user)
        } catch (error) {
            if (error instanceof AppError) {
                return customErrorMessage(error.status, error.message)
            }
            return serverError()
        }
    }
}