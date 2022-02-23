import sequelize from "../db"
import { DataTypes, Model } from "sequelize"
import { IBrandInstance, ICartInstance, ICartProductInstance, IProductInfoInstance, IProductInstance, ITypeInstance, IUserInstance } from "../types/models"



const User = sequelize.define<IUserInstance>("user", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})


const Cart = sequelize.define<ICartInstance>("cart", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})


const CartProduct = sequelize.define<ICartProductInstance>("cart_product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quan: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false }
})

const Product = sequelize.define<IProductInstance>("product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.STRING, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define<ITypeInstance>("type", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Brand = sequelize.define<IBrandInstance>("brand", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})


const Rating = sequelize.define("rating", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rate: { type: DataTypes.INTEGER, allowNull: false }
})

const ProductInfo = sequelize.define<IProductInfoInstance>("product_info", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
})

const TypeBrand = sequelize.define("type_brand", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
})



//
User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(ProductInfo, { as: "info" })
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })


export default { Product, User, Brand, TypeBrand, Type, CartProduct, Cart, Rating, ProductInfo }