import express from "express"
import userController from "../controllers/userController"
import { authMiddleware } from "../middleware/authMiddleware"
import { authValidation } from "../validation/authValidation"


export const userRouter = express.Router()


userRouter.post("/registr", authValidation, userController.registr)
userRouter.post("/login", authValidation, userController.login)
userRouter.get("/check", authMiddleware, userController.check)