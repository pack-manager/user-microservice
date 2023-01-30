import { AppError } from "../../shared/error/AppError"

export interface IFirebaseProvider {
    registerUserWithEmailAndPassword(email: string, password: string): Promise<string | AppError>
    updatePassword(newValue: string): Promise<void>
}