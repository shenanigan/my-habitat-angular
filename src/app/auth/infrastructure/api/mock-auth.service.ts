import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { ISocietyService } from "../../domain/services/isociety.service";
import { Society } from "../../domain/entities/society";
import { SocietyManager } from "../../domain/entities/society-manager";
import { Notice } from "../../domain/entities/notice";
import { IAddSocietyManagerRequest } from "../../domain/contracts/requests/add-society-manager-request";
import { IUpdateSocietyRequest } from "../../domain/contracts/requests/update-society-request";

@Injectable()
export class MockSocietyService extends BaseService implements ISocietyService {

    society = new Society({
        entityId: '1234-5678-90',
        name: 'Godrej Garden City',
        address: 'Jagatpur',
        city: 'Amdavad',
        state: 'Gujarat',
        country: 'India',
        societyManagers: [
            new SocietyManager(
                {
                    entityId: '1234-5678-90',
                    name: 'Pradip Shah',
                    email: 'pradip.p@godrej.com',
                    phoneNumber: '8573884844',
                    countryCode: 91
                })
        ],
        notices: [
            new Notice({
                entityId: '1234-5678-90',
                notice: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no<br><br>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no.',
                title: 'Vaccination for 16yrs & above'
            })
        ]
    })

    society2 = new Society({
        entityId: '1234-5678-91',
        name: 'Adani Shantigram',
        address: 'SG Road',
        city: 'Amdavad',
        state: 'Gujarat',
        country: 'India',
        societyManagers: [
            new SocietyManager(
                {
                    entityId: '1234-5678-91',
                    name: 'Nilay Patel',
                    email: 'nilay.p@shantigram.com',
                    phoneNumber: '8573884244',
                    countryCode: 91
                })
        ],
        notices: [
            new Notice({
                entityId: '1234-5678-91',
                notice: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no<br><br>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no.',
                title: 'Vaccination for 16yrs & above'
            })
        ]
    })

    societies = [this.society, this.society2];

    getSocieties(): Observable<Society[]> {
        return new Observable(subscriber => {
            subscriber.next(this.societies)
            subscriber.complete()
        })
    }

    getSocietyDetail(societyId: string): Observable<Society> {
        return new Observable(subscriber => {
            const filtered = this.societies.filter(x => x.entityId === societyId)
            if (filtered.length > 0) {
                subscriber.next(filtered[0])
            }
            subscriber.complete()
        })
    }

    updateSociety(request: IUpdateSocietyRequest): Observable<void> {
        return new Observable(subscriber => {
            subscriber.next()
            subscriber.complete()
        })
    }
    addSocietyManager(request: IAddSocietyManagerRequest): Observable<string> {
        return new Observable(subscriber => {
            subscriber.next('1234-5678-92')
            subscriber.complete()
        })
    }
}