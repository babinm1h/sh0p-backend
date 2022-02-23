import express from "express"
import typeController from "../controllers/typeController"
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware"


export const typeRouter = express.Router()

typeRouter.post("/", checkRoleMiddleware("ADMIN"), typeController.create)
typeRouter.get("/", typeController.getAll)
