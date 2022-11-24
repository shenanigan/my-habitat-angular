import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/shared/infrastructure/storage/storage.service';
import { getSociety } from 'src/app/society/+state/society.actions';
import { selectSociety } from 'src/app/society/+state/society.selector';
import { Society } from 'src/app/society/domain/entities/society';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.scss']
})
export class NoticeboardComponent implements OnInit {

  society$?: Observable<Society>
  constructor(private _store: Store,
    private _storageService: StorageService) {
    this.society$ = this._store.select(selectSociety());
  }

  ngOnInit(): void {
    const societyId = this._storageService.getSocietyId()
    if (societyId) {
      this._store.dispatch(getSociety({ societyId: societyId }))
    }

  }

}
