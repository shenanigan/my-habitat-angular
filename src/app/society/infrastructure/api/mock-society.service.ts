import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/infrastructure/api/base.service";
import { Apollo } from "apollo-angular";
import { ISocietyService } from "../../domain/services/isociety.service";
import { Notice } from "../../domain/entities/notice";
import { Society } from "../../domain/entities/society";
import { StorageService } from "src/app/shared/infrastructure/storage/storage.service";

@Injectable()
export class MockSocietyService extends BaseService implements ISocietyService {

    constructor(private _apollo: Apollo, _storageService: StorageService) {
        super(_storageService);
    }
    getSociety(societyId: string): Observable<Society> {
        return new Observable(subscriber => {
            const notice1 = new Notice('1234-5678')
            notice1.createdAt = new Date()
            notice1.text = "<h1>Lorem Ipsum</h1><br><h4>Ipsum Lorem</h4>"
            notice1.tag = "Society"

            const notice2 = new Notice('1234-5678-90')
            notice2.createdAt = new Date()
            notice2.text = "<h1>Lorem Ipsum</h1><br><h4>Ipsum Lorem</h4>"
            notice2.tag = "Payment"
            var society = new Society('1234-5678-90')
            society.address = "Test Address"
            society.name = "Test Society Name"
            society.city = "Test City"
            society.state = "Test State"
            society.country = "Test Country"
            society.notices = [notice1, notice2]
            subscriber.next(society)
            subscriber.complete()
        })
    }

    getSocietyForHO(): Observable<Society> {
        return new Observable(subscriber => {
            const notice1 = new Notice('1234-5678')
            notice1.createdAt = new Date()
            notice1.text = "<h1>Lorem Ipsum</h1><br><h4>Ipsum Lorem</h4>"
            notice1.tag = "Society"

            const notice2 = new Notice('1234-5678-90')
            notice2.createdAt = new Date()
            notice2.text = "<h1>Lorem Ipsum</h1><br><h4>Ipsum Lorem</h4>"
            notice2.tag = "Payment"
            var society = new Society('1234-5678-90')
            society.address = "Test Address"
            society.name = "Test Society Name"
            society.city = "Test City"
            society.state = "Test State"
            society.country = "Test Country"
            society.notices = [notice1, notice2]
            subscriber.next(society)
            subscriber.complete()
        })
    }
}