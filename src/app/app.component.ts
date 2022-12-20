import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IRealTimeService } from './shared/domain/abstractions/irealtime.service';
import { AblyEvents } from './shared/infrastructure/real-time/ably-events';
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
    @Inject(AblyEvents) private _realtimeService: IRealTimeService,
    private _router: Router) {
    this.matIconRegistry.addSvgIcon('chat_send', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_sendmessage.svg'));
    this.matIconRegistry.addSvgIcon('chat_attach', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_attach.svg'));
    this.matIconRegistry.addSvgIcon('default_camera', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_defaultcamera.svg'));
    this.matIconRegistry.addSvgIcon('member_add_success', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/image_successful.svg'));
    // this.matIconRegistry.addSvgIcon('default_user', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_attach.svg'));
    this.matIconRegistry.addSvgIcon('start_chat', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_chat.svg'));
    this.matIconRegistry.addSvgIcon('call_visitor', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_call_visitor.svg'));
    this.matIconRegistry.addSvgIcon('call_chat', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_call_chat.svg'));
    this.matIconRegistry.addSvgIcon('video_chat', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_video_chat.svg'));
    this.matIconRegistry.addSvgIcon('back', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ic_back.svg'));

    this.matIconRegistry.addSvgIcon('tab_profile', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/tabicon_profile.svg'));
  }

  ngOnInit(): void {
    // this._storageService.logout()
    if (!this._storageService.isAuthenticated()) {
      this._router.navigate(['/auth/phone'])
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler() {
    this._realtimeService.close()
  }

}
