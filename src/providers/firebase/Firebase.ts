import { FirebaseApp, initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, updatePassword, Auth } from "firebase/auth"
import { AppError, AppErrorFactory } from "../../shared/error/AppError"
import { config } from "dotenv"
import { HttpStatusCode } from "../../shared/protocol/HttpStatusCode"
import { IFirebaseProvider } from "./IFirebaseProvider"

config()

export class Firebase implements IFirebaseProvider {
    private auth: Auth
    public static shared: IFirebaseProvider = new Firebase()

    private constructor(
        auth: Auth = getAuth(Firebase.initializeFireabaseApp())
    ) {
        this.auth = auth
    }

    async registerUserWithEmailAndPassword(email: string, password: string): Promise<string | AppError> {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
            return userCredential?.user.uid
        } catch (error: any) {
            switch (error.code) {
                case "auth/invalid-email":
                    throw AppErrorFactory.create(HttpStatusCode.UNPROCESSABLE_ENTITY, "Email address is invalid")
                case "auth/weak-password":
                    throw AppErrorFactory.create(HttpStatusCode.UNPROCESSABLE_ENTITY, "Password is not strong enough")
                case "auth/email-already-in-use":
                    throw AppErrorFactory.create(HttpStatusCode.CONFLICT, "User already exists")
                default:
                    throw AppErrorFactory.create(HttpStatusCode.SERVER_ERROR, "An unexpected error occurred")
            }
        }
    }

    async deleteUserByUid(id: string): Promise<void | AppError> {
        try {
            await this.auth.currentUser?.delete()
        } catch (error: any) {
            switch (error.code) {
                case "auth/user-not-found":
                    throw AppErrorFactory.create(HttpStatusCode.NOT_FOUND, "User not found")
                case 'auth/argument-error':
                    throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, `Invalid user id provided: ${id}`)
                case 'auth/internal-error':
                    throw AppErrorFactory.create(HttpStatusCode.SERVER_ERROR, `Internal error while deleting user with id ${id}: ${error}`)
                default:
                    throw AppErrorFactory.create(HttpStatusCode.SERVER_ERROR, `Error deleting user with id ${id}: ${error}`)
            }
        }
    }

    async updatePassword(newValue: string): Promise<void> {
        const user = this.auth.currentUser

        if (!user) {
            throw AppErrorFactory.create(HttpStatusCode.UNAUTHORIZED, "Unauthorized Account")
        }

        await updatePassword(user, newValue)
            .catch(err => {
                switch (err.code) {
                    case "auth/unauthorized-domain":
                        throw AppErrorFactory.create(HttpStatusCode.UNAUTHORIZED, "Unauthorized Account")
                    case "auth/weak-password":
                        throw AppErrorFactory.create(HttpStatusCode.UNPROCESSABLE_ENTITY, "Password is not strong enough")
                    default:
                        throw AppErrorFactory.create(HttpStatusCode.BAD_REQUEST, "An unexpected error occurred")
                }
            })
    }

    private static initializeFireabaseApp(): FirebaseApp {
        const firebaseConfig = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID
        }
        const app = initializeApp(firebaseConfig)

        return app
    }
}