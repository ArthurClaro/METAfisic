import { Exclude } from "class-transformer"
import { randomUUID } from "node:crypto"

export class User {
    readonly id: string
    name: string
    email: string

    gender: "Masculino" | "Feminino" | "Outro" 
    // "ENUM"
    height: string
    weight: string
    createdAt: Date

    @Exclude()
    password: string

    constructor() {
        this.id = randomUUID()
    }


}
