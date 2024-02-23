export class Day {
    readonly id: string
    category: string
    // dia: string
    // readonly createdAt: Date |string

    // @Exclude()
    createdAt:  string

    userId?: string | null

    constructor() {
        this.createdAt = new Date().toLocaleDateString()
    }

}
