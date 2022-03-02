import express from "express"
import productController from "../controllers/productController"
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware"


export const productRouter = express.Router()

productRouter.post("/", checkRoleMiddleware("ADMIN"), productController.create)
productRouter.get("/", productController.getAll)
productRouter.get("/:id", productController.getOne)
productRouter.delete(`/:id`, productController.deleteOne)