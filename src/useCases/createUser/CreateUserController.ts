import { IUser } from "../../domain/model/IUser";
import { AppError } from "../../shared/error/AppError";
import { badRequest, created, customErrorMessage, serverError } from "../../shared/error/HttpError";
import { IController } from "../../shared/protocol/IController";
import { IHttpRequest } from "../../shared/protocol/IHttpRequest";
import { IHttpResponse } from "../../shared/protocol/IHttpResponse";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { ICreateUserRequestDTO } from "./ICreateUserParamsDTO";

export class CreateUserController implements IController {

    constructor(private readonly createUserUseCase: IUseCase) { }

    async handle(httpRequest: IHttpRequest<ICreateUserRequestDTO>): Promise<IHttpResponse<IUser | string>> {
        try {
            const { body } = httpRequest

            if (!body) {
                return badRequest("Please specify a body")
            }

            const response = await this.createUserUseCase.execute(body)

            if (response instanceof AppError) {
                return customErrorMessage(response.status, response.message)
            }

            return created<IUser>(response)
        } catch (error) {
            return serverError()
        }
    }
}