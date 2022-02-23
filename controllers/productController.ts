import express from "express"
import path from "path"
import { v4 } from "uuid"
import models from "../models/models"
import { IProduct, IProductInfo } from "../types/models"

interface IGetAllQuery {
    brandId?: string
    typeId?: string
    page?: number
    limit?: number
}

class ProductController {

    async create(req: express.Request, res: express.Response) {
        try {
            let { name, price, typeId, brandId, info } = req.body
            let { img } = req.files as any
            let fileName = v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))

            const product = await models.Product.create({ name, price, typeId, brandId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach((i: IProductInfo) => models.ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: product.id
                }))
            }

            res.status(201).json(product)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async getAll(req: express.Request, res: express.Response) {
        try {
            let { typeId, brandId, limit, page } = req.query as IGetAllQuery
            page = page || 1
            limit = limit || 5
            let offset = page * limit - limit

            let products;

            if (!typeId && !brandId) {
                products = await models.Product.findAndCountAll({ limit, offset })
            }
            if (typeId && brandId) {
                products = await models.Product.findAndCountAll({ where: { typeId, brandId }, limit, offset })
            }
            if (typeId && !brandId) {
                products = await models.Product.findAndCountAll({ where: { typeId }, limit, offset })
            }
            if (!typeId && brandId) {
                products = await models.Product.findAndCountAll({ where: { brandId }, limit, offset })
            }

            return res.json(products)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async getOne(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            if (!id) return res.status(404).json({ message: "ID не найден" })

            const product = await models.Product.findOne({
                where: { id },
                include: [{ model: models.ProductInfo, as: "info" }]
            })
            return res.json(product)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }

}
export default new ProductController()