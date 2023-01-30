import { IUser } from "../../domain/model/IUser"
import { Firebase } from "../../providers/firebase/Firebase"
import { IFirebaseProvider } from "../../providers/firebase/IFirebaseProvider"
import { IDeleteUserRepository } from "../../repository/protocol/IDeleteUserRepository"
import { AppError } from "../../shared/error/AppError"
import { handleErrorCatching } from "../../shared/helper/HandleErrorCatching"
import { IUseCase } from "../../shared/protocol/IUseCase"

export class DeleteUserUseCase implements IUseCase {
    constructor(
        private readonly repository: IDeleteUserRepository,
        private readonly firebaseProvider: IFirebaseProvider = Firebase.shared
    ) { }

    async execute(data: string): Promise<void | AppError> {
        try {
            const user = await this.repository.deleteUser(data)

            await this.firebaseProvider.deleteUserByUid(user.uid)
        } catch (error) {
            throw handleErrorCatching(error)
        }
    }
}