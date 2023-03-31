import validator from "validator";
import { IUser } from "../../domain/model/IUser";
import { Firebase } from "../../providers/firebase/Firebase";
import { IFirebaseProvider } from "../../providers/firebase/IFirebaseProvider";
import { IGetUserRepository } from "../../repository/protocol/IGetUserRepository";
import { AppError, AppErrorFactory } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { HttpStatusCode } from "../../shared/protocol/HttpStatusCode";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { ISignInParamsDTO } from "./ISignInParamsDTO";

export class SignInUseCase implements IUseCase {
    constructor(
        private readonly firebaseProvider: IFirebaseProvider,
        private readonly repository: IGetUserRepository
    ) { }

    async execute(data: ISignInParamsDTO): Promise<IUser | AppError> {
        const { email, password } = data
        try {
            const emailIsValid = validator.isEmail(email)

            if (!emailIsValid) {
                throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "E-mail is invalid")
            }

            const uid = await this.firebaseProvider.signIn(email, password)

            return await this.repository.getUserUid(uid)
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}