import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SharedModule } from '../../shared.module';
import { throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: SharedModule
})
export class BaseService {

  constructor(protected _storageService: StorageService) { }

  public handleError(body: HttpErrorResponse | any) {
    let errorMessage: any;

    // if (body instanceof HttpErrorResponse) {
    //   const errBody = body.error || '';
    //   const err = errBody || JSON.stringify(errBody);
    //   errorMessage = err.text;
    // } else if (body.status && body.status.code !== 0) {
    //   errorMessage = body.status.message;
    // } else if (body.status && body.status.code == 0) {
    //   // return body.data[0];
    // } else {
    //   errorMessage = 'Unknown Error. Please try again.';
    // }

    return throwError(() => new Error(errorMessage));
  }


  protected headers() {

    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    // header = header.append('apiKey', environment.apiKey);
    // header = header.append('apiPassword', environment.apiPassword);

    if (this._storageService.isAuthenticated()) {
      header = header.append('Authorization', 'Bearer ' + this._storageService.getToken());
    }

    return { headers: header };
  }
}
