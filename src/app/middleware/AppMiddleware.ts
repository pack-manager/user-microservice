import express, { Express } from "express"
import routes from "../routes"

export class AppMiddleware {
    private app: Express

    constructor(app: Express) {
        this.app = app
    }

    handle() {
        this.app.use(express.json())
        this.app.use(routes)
    }
}