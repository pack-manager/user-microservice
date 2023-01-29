import { IHttpRequest } from "./IHttpRequest";
import { IHttpResponse } from "./IHttpResponse";

export interface IController {
    handle(httpRequest: IHttpRequest<unknown>): Promise<IHttpResponse<unknown>>
}