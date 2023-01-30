import validator from "validator";
import { IUser } from "../../domain/model/IUser";
import { Firebase } from "../../providers/firebase/Firebase";
import { IFirebaseProvider } from "../../providers/firebase/IFirebaseProvider";
import { ICreateUserRepository } from "../../repository/protocol/ICreateUserRepository";
import { AppError, AppErrorFactory } from "../../shared/error/AppError";
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching";
import { HttpStatusCode } from "../../shared/protocol/HttpStatusCode";
import { IUseCase } from "../../shared/protocol/IUseCase";
import { ICreateUserRequestDTO } from "./ICreateUserParamsDTO";

export class CreateUserUseCase implements IUseCase {
    constructor(
        private readonly repository: ICreateUserRepository,
        private readonly firebaseProvider: IFirebaseProvider = Firebase.shared
    ) { }

    async execute({ name, email, password, isImporter }: ICreateUserRequestDTO): Promise<IUser | AppError> {
        try {
            const emailIsValid = validator.isEmail(email)

            if (!emailIsValid) {
                return AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "E-mail is invalid")
            }

            const firebaseResponse = await this.firebaseProvider.registerUserWithEmailAndPassword(email, password)

            if (firebaseResponse instanceof AppError) {
                return AppErrorFactory.create(firebaseResponse.status, firebaseResponse.message)
            }

            const user = await this.repository.createUser({ uid: firebaseResponse, name, isImporter })

            return user
        } catch (error) {
            return handleErrorCatching(error)
        }
    }
}