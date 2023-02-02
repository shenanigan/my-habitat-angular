import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { markNoticeboardViewed } from 'src/app/home-owner/+state/home-owner.actions';
import { StorageService } from 'src/app/shared/infrastructure/storage/storage.service';
import { getSociety, getSocietyForHO } from 'src/app/society/+state/society.actions';
import { selectSociety } from 'src/app/society/+state/society.selector';
import { Society } from 'src/app/society/domain/entities/society';

export interface Filter {
  name: string
}
@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.scss']
})
export class NoticeboardComponent implements OnInit {

  society$?: Observable<Society>
  filters: Filter[] = [
    {
      name: 'All'
    },
    {
      name: 'Society'
    },
    {
      name: 'Payment'
    }
  ]
  activeFilter: Filter = this.filters[0];
  constructor(private _store: Store,
    private _router: Router,
    private _storageService: StorageService) {
    this.society$ = this._store.select(selectSociety());
  }

  ngOnInit(): void {
    const societyId = this._storageService.getSocietyId()
    if (societyId) {
      this._store.dispatch(getSocietyForHO())
      this._store.dispatch(markNoticeboardViewed())
    }
  }

  openChat() {
    this._router.navigate(['home-owner/chat']);
  }

}
