import { AppError } from "../error/AppError";

export interface IUseCase {
    execute(data: unknown): Promise<unknown | AppError>
}