export class Day {
    readonly id: string
    category: string
    createdAt: string

    userId?: string | null

    constructor() {
        this.createdAt = new Date().toLocaleDateString()
    }
}