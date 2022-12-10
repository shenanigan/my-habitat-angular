export class KeyValue {

    constructor(obj?: Partial<KeyValue>) {
        if (obj) {
            Object.assign(this, obj)
        }
    }

    key?: string
    value?: string
}