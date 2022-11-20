export class Role {
    constructor(name: string, type: string) {
        this.name = name
        this.type = type
    }
    name: string
    type: string //FAMILY, DAILY_HELP OR VISITOR
}