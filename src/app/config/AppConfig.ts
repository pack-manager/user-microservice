import { Express } from "express"
import { MongoClient } from "../database/Mongo"
import { AppMiddleware } from "../middleware/AppMiddleware"

export class AppConfig {
    private app: Express
    private appMiddleware: AppMiddleware

    constructor(app: Express) {
        this.app = app
        this.appMiddleware = new AppMiddleware(app)
    }

    async execute() {
        await MongoClient.connect()
        this.appMiddleware.handle()
    }
}