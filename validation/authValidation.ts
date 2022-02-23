import { body } from "express-validator"


export const authValidation = [
    body("email", "Введите email").isEmail().withMessage("Введите email").isLength({ min: 5, max: 35 })
        .withMessage("Длина email - от 5 до 35 символов"),

    body("password", "Введите пароль").isString().isLength({ max: 35, min: 5 })
        .withMessage("Длина пароля - от 5 до 35 символов"),
]