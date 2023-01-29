import { HttpStatusCode } from "../protocol/HttpStatusCode";

export class AppError extends Error {
    constructor(
        public status: HttpStatusCode,
        public message: string = "Something went wrong"
    ) {
        super(message);
    }
}