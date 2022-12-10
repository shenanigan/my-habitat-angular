import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private authenticationChanged = new Subject<boolean>();

  constructor() { }

  public isAuthenticated(): boolean {
    return (!(window.localStorage['token'] === undefined ||
      window.localStorage['token'] === null ||
      window.localStorage['token'] === 'null' ||
      window.localStorage['token'] === 'undefined' ||
      window.localStorage['token'] === ''));
  }

  public isAuthenticationChanged(): any {
    return this.authenticationChanged.asObservable();
  }


  public setToken(data: any): void {
    this.setStorageToken(JSON.stringify(data));
  }

  public logout(): void {
    this.setStorageToken(undefined);
    window.localStorage['userId'] = undefined;
  }

  private setStorageToken(value: any): void {
    window.localStorage['token'] = value;
    this.authenticationChanged.next(this.isAuthenticated());
  }


  private getDecodedAccessToken(): any | undefined {
    try {
      const token = this.getToken();
      if (token) {
        return jwt_decode(token);
      }
    } catch (Error) {

    }
    return undefined;
  }

  isHomeOwner() {
    var decodedToken = this.getDecodedAccessToken()
    return decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'HomeOwner';
  }

  isSecurityGuard() {
    var decodedToken = this.getDecodedAccessToken()
    return decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'SecurityGuard';
  }

  getToken(): string | undefined {

    if (!this.isAuthenticated()) {
      return undefined
    }

    const obj = JSON.parse(window.localStorage['token']);
    return obj.token;
  }

  getSocietyId(): string | undefined {
    var decodedToken = this.getDecodedAccessToken()
    return decodedToken?.['SocietyId'];
  }

  getUserId(): string | undefined {
    var decodedToken = this.getDecodedAccessToken()
    return decodedToken?.['userId'];
  }
}