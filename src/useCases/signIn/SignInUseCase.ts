import validator from "validator";
import { Firebase } from "../../providers/firebase/Firebase";
import { IFirebaseProvider } from "../../providers/firebase/IFirebaseProvider";
import { AppError, AppErrorFactory } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { HttpStatusCode } from "../../shared/protocol/HttpStatusCode";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { ISignInParamsDTO } from "./ISignInParamsDTO";

export class SignInUseCase implements IUseCase {
    constructor(
        private readonly firebaseProvider: IFirebaseProvider = Firebase.shared
    ) { }

    async execute(data: ISignInParamsDTO): Promise<void | AppError> {
        const { email, password } = data
        try {
            const emailIsValid = validator.isEmail(email)

            if (!emailIsValid) {
                throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "E-mail is invalid")
            }

            await this.firebaseProvider.signIn(email, password)
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}