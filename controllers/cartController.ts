import express from "express"


class CartController {

    async create(req: express.Request, res: express.Response) {
        try {

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


    async getAll(req: express.Request, res: express.Response) {
        try {

        } catch (err) {
            return res.status(500).json("Ошибка сервера")
        }
    }


}
export default new CartController()