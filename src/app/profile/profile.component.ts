import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectHomeOwner } from '../home-owner/+state/home-owner.selector';
import { StorageService } from '../shared/infrastructure/storage/storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userImage='assets/images/ic_default_myprofile.svg';
  // userName='Ali Mubarak';
  userEmail='ali@mailinator.com';

  homeOwner$ = this._store.select(selectHomeOwner());


  constructor(private _storageService: StorageService,
    private _location: Location,
    private _router: Router,
    private _store:Store) { }

  ngOnInit(): void {
  }

  logout() {
    this._storageService.logout()
    this._router.navigate(['/auth/phone'])
  }

  back() {
    this._location.back()
  }

}
