import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo } from "apollo-angular";
import { ISecurityGuardService } from "../../domain/services/isecurity-guard.service";
import { SecurityGuard } from "../../domain/entities/security-guard";
import { Home } from "../../domain/entities/home";
import { Household } from "../../domain/entities/household";
import { subscribe } from "graphql";
import { AddHouseholdRequest } from "../../domain/contracts/requests/add-household";
import { HomeOwner } from "../../domain/entities/home-owner";
import { StorageService } from "src/app/shared/infrastructure/storage/storage.service";
import { RequestVisitRequest } from "../../domain/contracts/requests/request-visit";
import { RequestKidExitRequest } from "../../domain/contracts/requests/request-kid-exit";

@Injectable()
export class MockSecurityGuardService extends BaseService implements ISecurityGuardService {

    constructor(private _apollo: Apollo, _storageService: StorageService) {
        super(_storageService);
    }
    getSecurityGuard(): Observable<SecurityGuard> {
        return new Observable(subscriber => {
            var securityGuard = new SecurityGuard('1234-5678-90')
            securityGuard.name = 'Test Name'
            securityGuard.countryCode = 91
            securityGuard.email = 'email@myhabitat.com'
            securityGuard.phoneNumber = '123-456-789'

            subscriber.next(securityGuard)
            subscriber.complete()
        })
    }

    addHousehold(householdRequest: AddHouseholdRequest): Observable<string> {
        return new Observable(subscriber => {
            subscriber.next('123-456-789')
            subscriber.complete()
        })
    }

    requestVisit(request: RequestVisitRequest): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    requestKidExit(request: RequestKidExitRequest): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }

    searchUnit(unit: string): Observable<HomeOwner[]> {
        return new Observable(subscriber => {
            var homeOwner = new HomeOwner('1234-5678-90')
            homeOwner.name = 'Rushang Chauhan'
            homeOwner.countryCode = 91
            homeOwner.email = 'email@myhabitat.com'
            homeOwner.phoneNumber = '123-456-789'
            var home = new Home('123-456-789', {
                unit: 'Block A - 18'
            })
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
            householdKid2.permission = 'REQUEST_PERMISSION'
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

            var homeOwner2 = new HomeOwner('1234-5678-91')
            homeOwner2.name = 'Mohit Garg'
            homeOwner2.countryCode = 91
            homeOwner2.email = 'email@myhabitat.com'
            homeOwner2.phoneNumber = '123-456-789'
            var home2 = new Home('123-456-780', {
                unit: 'Block C - 1'
            })
            homeOwner2.home = home2

            homeOwner2.households?.push(householdWife)
            homeOwner2.households?.push(householdKid)
            homeOwner2.households?.push(householdMaid)
            homeOwner2.households?.push(householdHelp)
            homeOwner2.households?.push(householdVisitor1)
            homeOwner2.households?.push(householdVisitor2)

            subscriber.next([homeOwner, homeOwner2])
            subscriber.complete()
        })
    }
}