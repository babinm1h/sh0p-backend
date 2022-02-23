import express from "express"
import cartController from "../controllers/cartController"
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware"


export const cartRouter = express.Router()

cartRouter.post("/",checkRoleMiddleware("ADMIN"), cartController.create)
cartRouter.get("/", cartController.getAll)
