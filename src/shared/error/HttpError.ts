/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCode } from "../protocol/HttpStatusCode"
import { IHttpResponse } from "../protocol/IHttpResponse"

export const customErrorMessage = (statusCode: HttpStatusCode, message: string): IHttpResponse<string> => {
    return {
        statusCode: statusCode,
        body: message
    }
}

export const ok = <T>(body?: any): IHttpResponse<T> => ({
    statusCode: HttpStatusCode.OK,
    body
})

export const created = <T>(body: any): IHttpResponse<T> => ({
    statusCode: HttpStatusCode.CREATED,
    body
})

export const badRequest = (message: string): IHttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: message
    }
}

export const serverError = (): IHttpResponse<string> => {
    return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: "Something went wrong",
    };
};