import express from "express"
import models from "../models/models"


class CartController {

    async create(req: any, res: express.Response) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const productId = req.params.id
            if (!productId) return res.status(400).send()

            const cart = await models.Cart.findOne({ where: { userId } })
            if (!cart) return res.status(404).send()
            const inCart = await models.CartProduct.findOne({ where: { productId } })
            if (inCart) return res.status(400).send()

            await models.CartProduct.create({ cartId: cart.id, productId })
            const cartProduct = await models.CartProduct.findOne({
                where: { cartId: cart.id, productId },
                include: { model: models.Product }
            })

            return res.json(cartProduct)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async getAll(req: any, res: express.Response) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const cart = await models.Cart.findOne({ where: { userId } })
            if (!cart) return res.status(400).send()

            const cartProducts = await models.CartProduct.findAll({
                where: { cartId: cart.id },
                include: { model: models.Product }
            })

            return res.json(cartProducts)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async delete(req: any, res: express.Response) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const productId = req.params.id
            if (!productId) return res.status(400).send()

            const cart = await models.Cart.findOne({ where: { userId } })
            if (!cart) return res.status(400).send()

            const prod = await models.CartProduct.findOne({
                where: { cartId: cart.id, productId },
                include: { model: models.Product }
            })
            if (!prod) return res.status(404).send()

            await models.CartProduct.destroy({ where: { productId, cartId: cart.id } })
            return res.json(prod)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async addOne(req: any, res: express.Response) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const productId = req.params.id
            if (!productId) return res.status(400).send()

            const cart = await models.Cart.findOne({ where: { userId } })
            if (!cart) return res.status(400).send()

            const product = await models.CartProduct.findOne({
                where: { cartId: cart.id, id: productId },
                include: { model: models.Product }
            })
            if (!product) return res.status(404).send()
            product.quan += 1
            await product.save()

            return res.json(product)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }

    async removeOne(req: any, res: express.Response) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const productId = req.params.id
            if (!productId) return res.status(400).send()

            const cart = await models.Cart.findOne({ where: { userId } })
            if (!cart) return res.status(400).send()

            const product = await models.CartProduct.findOne({
                where: { cartId: cart.id, id: productId },
                include: { model: models.Product }
            })
            if (!product) return res.status(404).send()
            product.quan -= 1
            await product.save()

            return res.json(product)

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }

}
export default new CartController()