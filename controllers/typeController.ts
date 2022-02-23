import express from "express"
import models from "../models/models"


class TypeController {

    async create(req: express.Request, res: express.Response) {
        try {
            let { name } = req.body
            if (!name) return res.status(400).json({ message: "Отстутствуют нужные данные" })
            const candidate = await models.Type.findOne({ where: { name } })
            if (candidate) return res.status(400).json({ message: "Такой тип уже существует" })

            const type = await models.Type.create({ name })
            return res.status(201).json(type)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async getAll(req: express.Request, res: express.Response) {
        try {
            const types = await models.Type.findAll()
            return res.json(types)
        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


}

export default new TypeController()