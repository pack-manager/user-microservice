import { Router } from "express"
import { createUserController } from "../../useCases/createUser"
import { deleteUserController } from "../../useCases/deleteUser"
import { getUserController } from "../../useCases/getUser"

const routes = Router()

routes.post("/users", async (req, res) => {
    const { body, statusCode } = await createUserController.handle({ body: req.body })
    res.status(statusCode).json(body)
})

routes.get("/users/:id", async (req, res) => {
    const { body, statusCode } = await getUserController.handle({ params: req.params })
    res.status(statusCode).json(body)
})

routes.delete("/users/:id", async (req, res) => {
    const { body, statusCode } = await deleteUserController.handle({ params: req.params })
    res.status(statusCode).json(body)
})

export default routes