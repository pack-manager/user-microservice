import express, { Express } from "express"
import routes from "../routes"
import bodyparser from 'body-parser'
import cors from "cors"

export class AppMiddleware {
    private app: Express

    constructor(app: Express) {
        this.app = app
    }

    handle() {
        this.app.use(bodyparser.json())
        this.app.use(bodyparser.urlencoded({ extended: true }))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(routes)
    }
}