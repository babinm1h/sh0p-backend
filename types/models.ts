import { Optional, Model } from "sequelize";


export interface IUser {
    id: number
    email: string
    password: string
    role: "USER" | "ADMIN"
}
export interface IUserCreation extends Optional<IUser, "id"> { }
export interface IUserInstance extends Model, IUser { }



export interface IBrand {
    id: number
    name: string
}
export interface IBrandInstance extends Model, IBrand { }



export interface IProduct {
    id: number
    name: string
    price: number
    rating: number
    img: string

}
export interface IProductInstance extends Model, IProduct { }



export interface IType {
    id: number
    name: string
}
export interface ITypeInstance extends Model, IType { }


export interface ICart {
    id: number
    userId: number
}
export interface ICartInstance extends Model, ICart { }



export interface ICartProduct {
    productId: number
    id: number
    quan: number
}
export interface ICartProductInstance extends Model, ICartProduct { }



export interface IProductInfo {
    description: string
    title: string
    id: string
    deviceId: number
}

export interface IProductInfoInstance extends Model, IProductInfo { }