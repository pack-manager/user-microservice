export interface IHttpRequest<T> {
    params?: any
    headers?: any
    body?: T
}