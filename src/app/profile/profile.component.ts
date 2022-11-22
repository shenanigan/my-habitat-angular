import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../shared/infrastructure/storage/storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _storageService: StorageService, 
    private _router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this._storageService.logout()
    this._router.navigate(['/auth/phone'])
  }

}
