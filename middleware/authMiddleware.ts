import express from "express"
import jwt from "jsonwebtoken"


export const authMiddleware =
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.method === "OPTIONS") return next()

        try {
            if (!req.headers.authorization) {
                return res.status(401).json({ message: "Не авторизован" })
            }

            const token = req.headers.authorization.split(" ")[1]
            if (!token) return res.status(401).json({ message: "Не авторизован" })

            const decodedToken = jwt.verify(token, process.env.JWT_KEY || `somek3y`)
            //@ts-ignore
            req.user = decodedToken
            next()

        } catch (err) {
            return res.status(401).json({ message: "Не авторизован" })
        }
    }