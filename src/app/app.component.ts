import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StorageService } from './shared/infrastructure/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private _storageService: StorageService,
    private _router: Router) {

    this.matIconRegistry.addSvgIcon('tab_profile', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/tabicon_profile.svg'));
  }

  ngOnInit(): void {
    // this._storageService.logout()
    if (!this._storageService.isAuthenticated()) {
      this._router.navigate(['/auth/phone'])
    }
  }

}
