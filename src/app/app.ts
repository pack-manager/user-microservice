import express from "express"
import { AppConfig } from "./config/AppConfig"

const app = express()

const appConfig = new AppConfig(app)

appConfig.execute()

export default app