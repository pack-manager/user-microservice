import { HttpStatusCode } from "../protocol/HttpStatusCode";

export class AppError extends Error {
    constructor(
        public status: HttpStatusCode,
        public message: string
    ) {
        super(message);
    }
}

export class AppErrorFactory {
    static create(status: HttpStatusCode, message = "Something went wrong") {
        return new AppError(status, message)
    }
}