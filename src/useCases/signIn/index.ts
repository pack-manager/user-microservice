import { SignInController } from "./SignInController";
import { SignInUseCase } from "./SignInUseCase";

const signInUseCase = new SignInUseCase()
const signInController = new SignInController(signInUseCase)

export { signInUseCase, signInController }