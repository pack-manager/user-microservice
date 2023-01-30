import { AppError } from "../../shared/error/AppError"

export interface IFirebaseProvider {
    registerUserWithEmailAndPassword(email: string, password: string): Promise<string | AppError>
    deleteUserByUid(id: string): Promise<void | AppError>
    updatePassword(newValue: string): Promise<void>
}