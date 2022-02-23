import { Sequelize } from "sequelize"


export default new Sequelize(
    process.env.DB_NAME || "sh0p",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "root",
    {
        dialect: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432
    }
)