import { Router } from "express"
import { createUserController } from "../../useCases/createUser"

const routes = Router()

routes.post("/users", async (req, res) => {
    const { body, statusCode } = await createUserController.handle({ body: req.body })
    res.status(statusCode).send(body)
})

export default routes