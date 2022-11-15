import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SharedModule } from '../../shared.module';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: SharedModule
})
export class BaseService {

  constructor() { }

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

    // if (this.helper.isAuthenticated()) {
    //   header = header.append('Authorization', 'Bearer ' + this.helper.getToken());
    // }

    // Admin 
    // header = header.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwidXNlcklkIjoiZDg3MDQ4MmMtYjQ0OC00NzhjLWE5MjQtM2U1MjkyMGE2YjAwIiwiZXhwIjoxOTI2NzcxMTk5LCJpc3MiOiJodHRwczovL215aGFiaXRhdC5jb20iLCJhdWQiOiJodHRwczovL215aGFiaXRhdC5jb20ifQ.gjOoj_17_CWuQ2_4IJWIEuCLzRmF0WEs_3LWGLzoBbg');

    // Society Manager - Godrej
    header = header.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTb2NpZXR5TWFuYWdlciIsIlNvY2lldHlJZCI6IjI5ZmVkMWMyLTIwN2YtNDM2YS05OTU2LTM4YTFhMzhkMGUyZSIsInVzZXJJZCI6ImRlNTk1MmI2LWM5OTQtNDBjZC04NGE3LTgyYzk2OTMzNWE1NSIsImV4cCI6MTkyNjc3MDMyMywiaXNzIjoiaHR0cHM6Ly9teWhhYml0YXQuY29tIiwiYXVkIjoiaHR0cHM6Ly9teWhhYml0YXQuY29tIn0.bPpPdJLNoHAhwc_rW0ByWsxNkwJRbNvwmmGWKloax_s');

    return { headers: header };
  }
}
