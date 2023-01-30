import { Router } from "express"
import { createUserController } from "../../useCases/createUser"
import { getUserController } from "../../useCases/getUser"

const routes = Router()

routes.post("/users", async (req, res) => {
    const { body, statusCode } = await createUserController.handle({ body: req.body })
    res.status(statusCode).send(body)
})

routes.get("/users/:id", async (req, res) => {
    const { body, statusCode } = await getUserController.handle({ params: req.params })
    res.status(statusCode).send(body)
})

export default routes