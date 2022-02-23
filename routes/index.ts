import express from "express"
import { brandRouter } from "./brandRouter"
import { cartRouter } from "./cartRouter"
import { productRouter } from "./productRouter"
import { typeRouter } from "./typeRouter"
import { userRouter } from "./userRouter"


export const router = express.Router()


router.use("/user", userRouter)
router.use('/product', productRouter)
router.use("/cart", cartRouter)
router.use("/type", typeRouter)
router.use("/brand",brandRouter)