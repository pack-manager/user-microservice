import { IUser } from "../../domain/model/IUser";
import { AppError } from "../../shared/error/AppError";
import { badRequest, created, customErrorMessage, serverError } from "../../shared/error/HttpError";
import { IController } from "../../shared/protocol/IController";
import { IHttpRequest } from "../../shared/protocol/IHttpRequest";
import { IHttpResponse } from "../../shared/protocol/IHttpResponse";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { ISignInParamsDTO } from "./ISignInParamsDTO";

export class SignInController implements IController {

    constructor(private readonly signInUseCase: IUseCase) { }

    async handle(httpRequest: IHttpRequest<ISignInParamsDTO>): Promise<IHttpResponse<IUser | string>> {
        try {
            const { body } = httpRequest

            if (!body) {
                return badRequest("Please specify a body")
            }

            const response = await this.signInUseCase.execute(body)

            return created<IUser>(response)
        } catch (error) {
            if (error instanceof AppError) {
                throw customErrorMessage(error.status, error.message)
            }
            throw serverError()
        }
    }
}