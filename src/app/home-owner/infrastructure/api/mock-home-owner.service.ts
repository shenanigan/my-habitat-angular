import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo } from "apollo-angular";
import { IHomeOwnerService } from "../../domain/services/ihome-owner.service";
import { HomeOwner } from "../../domain/entities/home-owner";
import { Home } from "../../domain/entities/home";
import { Household } from "../../domain/entities/household";
import { AddHouseholdRequest } from "../../domain/contracts/requests/add-household";
import { StorageService } from "src/app/shared/infrastructure/storage/storage.service";
import { KidExitRequest } from "../../domain/contracts/requests/kid-exit";
import { UpdateLogRequest } from "../../domain/contracts/requests/update-log";
import { AddMessageRequest } from "../../domain/contracts/requests/add-message";
import { IMarkPaymentPaidRequest } from "../../domain/contracts/requests/mark-payment-paid-request";
import { IAddReservation } from "../../domain/contracts/requests/add-reservation";
import { IEditReservation } from "../../domain/contracts/requests/edit-reservation";
import { ICancelReservation } from "../../domain/contracts/requests/cancel-reservation";
import { IAddEntity } from "../../domain/contracts/responses/add";
import { CancelKidExitRequest } from "../../domain/contracts/requests/cancel-kid-exit";

@Injectable()
export class MockHomeOwnerService extends BaseService implements IHomeOwnerService {

    constructor(private _apollo: Apollo, _storageService: StorageService) {
        super(_storageService);
    }

    getHomeOwner(): Observable<HomeOwner> {
        return new Observable(subscriber => {
            var homeOwner = new HomeOwner('1234-5678-90')
            homeOwner.name = 'Test Name'
            homeOwner.countryCode = 91
            homeOwner.email = 'email@myhabitat.com'
            homeOwner.phoneNumber = '123-456-789'

            var home = new Home('123-456-789')
            home.unit = 'Test 1A'
            homeOwner.home = home

            var householdWife = new Household('123456789')
            householdWife.countryCode = 91
            householdWife.name = 'Test W.'
            householdWife.role = 'Wife'
            householdWife.phoneNumber = '1234567890'
            householdWife.type = 'FAMILY_ADULT'

            var householdKid = new Household('Test_Kid_Id')
            householdKid.name = 'Test K.'
            householdKid.role = 'Kid'
            householdKid.permission = 'SEND_NOTIFICATION'
            householdKid.type = 'FAMILY_KID'

            var householdKid2 = new Household('Test_Kid_Id_2')
            householdKid2.name = 'Test C.'
            householdKid2.role = 'Kid'
            householdKid2.permission = 'SEND_NOTIFICATION'
            householdKid2.type = 'FAMILY_KID'

            var householdMaid = new Household('Test_Maid_Id')
            householdMaid.countryCode = 91
            householdMaid.name = 'Test MaidName'
            householdMaid.role = 'Maid'
            householdMaid.phoneNumber = '1234567890'
            householdMaid.type = 'DAILY_HELP'

            var householdHelp = new Household('Test_Help_Id')
            householdHelp.countryCode = 91
            householdHelp.name = 'Test HelpName'
            householdHelp.role = 'Driver'
            householdHelp.phoneNumber = '1234567890'
            householdHelp.type = 'DAILY_HELP'

            var householdVisitor1 = new Household('Test_Visitor1_Id')
            householdVisitor1.countryCode = 91
            householdVisitor1.name = 'Test V.'
            householdVisitor1.role = 'Friend'
            householdVisitor1.phoneNumber = '1234567890'
            householdVisitor1.type = 'FREQUENT_VISITOR'

            var householdVisitor2 = new Household('Test_Visitor2_Id')
            householdVisitor2.countryCode = 91
            householdVisitor2.name = 'Test V.'
            householdVisitor2.role = 'Colleague'
            householdVisitor2.phoneNumber = '1234567890'
            householdVisitor2.type = 'FREQUENT_VISITOR'

            homeOwner.households?.push(householdWife)
            homeOwner.households?.push(householdKid)
            homeOwner.households?.push(householdKid2)
            homeOwner.households?.push(householdMaid)
            homeOwner.households?.push(householdHelp)
            homeOwner.households?.push(householdVisitor1)
            homeOwner.households?.push(householdVisitor2)


            subscriber.next(homeOwner)
            subscriber.complete()
        })
    }

    addHousehold(householdRequest: AddHouseholdRequest): Observable<string> {
        return new Observable(subscriber => {
            subscriber.next('123-456-789')
            subscriber.complete()
        })
    }

    allowKidExit(request: KidExitRequest): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    cancelKidExit(request: CancelKidExitRequest): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    updateLog(request: UpdateLogRequest): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    addMessage(request: AddMessageRequest): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    addReservation(request: IAddReservation): Observable<IAddEntity> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    editReservation(request: IEditReservation): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    cancelReservation(request: ICancelReservation): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    markPaymentPaid(request: IMarkPaymentPaidRequest): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    markMessageViewed(): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }
    markPaymentViewed(): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }
    markNoticeboardViewed(): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }
}