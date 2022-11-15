export class Token {
    constructor(obj?: any) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
    token?: string
    refreshToken?: string
    validity?: Date
}