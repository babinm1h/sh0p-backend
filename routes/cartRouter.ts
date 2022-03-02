import express from "express"
import cartController from "../controllers/cartController"
import { authMiddleware } from "../middleware/authMiddleware"


export const cartRouter = express.Router()

cartRouter.delete("/:id", authMiddleware, cartController.delete)
cartRouter.post("/:id", authMiddleware, cartController.create)
cartRouter.get("/", authMiddleware, cartController.getAll)
cartRouter.put("/add/:id", authMiddleware, cartController.addOne)
cartRouter.put("/remove/:id", authMiddleware, cartController.removeOne)