import { Firebase } from "../../providers/firebase/Firebase";
import { IFirebaseProvider } from "../../providers/firebase/IFirebaseProvider";
import { MongoGetUserRepository } from "../../repository/MongoGetUserRepository";
import { SignInController } from "./SignInController";
import { SignInUseCase } from "./SignInUseCase";

const firebaseProvider: IFirebaseProvider = Firebase.shared
const repository = new MongoGetUserRepository()
const signInUseCase = new SignInUseCase(firebaseProvider, repository)
const signInController = new SignInController(signInUseCase)

export { signInUseCase, signInController }