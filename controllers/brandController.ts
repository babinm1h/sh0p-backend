import express from "express"
import models from "../models/models"


class BrandController {

    async create(req: express.Request, res: express.Response) {
        try {
            const { name } = req.body
            if (!name) return res.status(400).json({ message: "Отстутствуют нужные данные" })
            const candidate = await models.Brand.findOne({ where: { name } })
            if (candidate) return res.status(400).json({ message: "Такой бренд уже существует" })

            const brand = await models.Brand.create({ name })
            return res.status(201).json(brand)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async getAll(req: express.Request, res: express.Response) {
        try {
            const brands = await models.Brand.findAll()
            return res.json(brands)
        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


}

export default new BrandController()