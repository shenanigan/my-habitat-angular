import { formatDate } from "@angular/common";
import { Entity } from "src/app/shared/domain/entity";
import { Household } from "./household";

export class Log extends Entity {
    constructor(visitId: string, obj?: Partial<Log>) {
        super(visitId)
        if (obj) {
            Object.assign(this, obj)
            if (obj.household) {
                this.household = new Household(obj.household.entityId, obj.household)
            }
        }
    }
    status?: string // PENDING, APPROVED, PRE-APPROVED, DENIED, EXPIRED
    requestTime?: Date
    approvedTime?: Date
    rejectedTime?: Date
    isExit?: boolean
    reason?: string
    household?: Household

    get showLog():boolean{
        let time:Date|undefined
        if(this?.status){
            switch (this.status){
                case 'PENDING':
                    time = this.requestTime
                    break
                case 'APPROVED':
                    time = this.approvedTime
                    break
                case 'DENIED':
                    time = this.rejectedTime
                    break
            }
        }
       return timelineForOneWeek(time)
    }
}

function timelineForOneWeek(date?:Date):boolean{
    if(date==undefined) return false;
        const now= new Date();
        const requestDateTime= new Date(date);
        const oneWeek=24*60*60*1000*7;
        const isMoreThanAWeek = now.getTime() - requestDateTime.getTime() > oneWeek;
        if(!isMoreThanAWeek){
            return true;
        }
        return false;
}
