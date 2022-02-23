export interface IToken {
    email: string
    password: string
    role: "ADMIN" | "USER"
}