import { UserCredential } from "firebase/auth"
import { AppError } from "../../shared/error/AppError"

export interface IFirebaseProvider {
    registerUserWithEmailAndPassword(email: string, password: string): Promise<string | AppError>
    signIn(email: string, password: string): Promise<void | AppError>
    deleteUserByUid(id: string): Promise<void | AppError>
    updatePassword(newValue: string): Promise<void>
}