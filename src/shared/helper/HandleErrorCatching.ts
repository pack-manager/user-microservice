import { AppError, AppErrorFactory } from "../error/AppError";
import { HttpStatusCode } from "../protocol/HttpStatusCode";

export const handleErrorCatching = (error: unknown): AppError => {
    return error instanceof AppError
        ? AppErrorFactory.create(error.status, error.message)
        : AppErrorFactory.create(HttpStatusCode.SERVER_ERROR)
}