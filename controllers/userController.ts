import express from "express"
import models from "../models/models"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"

const generateJwt = (id: number, email: string, role: string) => {
    const token = jwt.sign(
        { id, email, role }, process.env.JWT_KEY || "somek3y", { expiresIn: "30d" }
    )
    return token
}

class UserController {

    async registr(req: express.Request, res: express.Response) {
        try {
            let errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ message: "Некорректные данные" })

            const { email, password, role } = req.body
            const candidate = await models.User.findOne({ where: { email } })
            if (candidate) return res.status(400).json({ message: "Такой email уже используется" })

            const hashedPass = await bcrypt.hash(password, 6)
            const user = await models.User.create({ email, password: hashedPass, role })
            const cart = await models.Cart.create({ userId: user.id })

            const token = generateJwt(user.id, email, role)
            return res.json(token)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async login(req: express.Request, res: express.Response) {
        try {
            let errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ message: "Некорректные данные" })

            const { email, password } = req.body
            const candidate = await models.User.findOne({ where: { email } })
            if (!candidate) return res.status(404).json({ message: "Пользователь с таким email не найден" })

            const isCorrectPass = await bcrypt.compare(password, candidate.password)
            if (!isCorrectPass) return res.status(404).json({ message: "пароль не совпадает" })

            const token = generateJwt(candidate.id, email, candidate.role)
            return res.json(token)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async check(req: any, res: express.Response) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json(token)
        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }

}

export default new UserController()