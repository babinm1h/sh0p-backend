import express from "express"
import jwt from "jsonwebtoken"
import { IToken } from "../types/IToken"


export const checkRoleMiddleware = (role: "ADMIN" | "USER") => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.method === "OPTIONS") return next()

        try {
            if (!req.headers.authorization) {
                return res.status(401).json({ message: "Не авторизован" })
            }
            const token = req.headers.authorization.split(" ")[1]
            if (!token) return res.status(401).json({ message: "Не авторизован" })

            const decodedToken = jwt.verify(token, process.env.JWT_KEY || `somek3y`)
            if ((decodedToken as IToken).role !== role) {
                return res.status(403).json({ message: "Нет доступа" })
            }

            //@ts-ignore
            req.user = decodedToken
            next()

        } catch (err) {
            return res.status(401).json({ message: "Не авторизован" })
        }
    }
}