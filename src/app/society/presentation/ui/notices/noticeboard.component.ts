import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  constructor(private _store: Store) {
    this.society$ = this._store.select(selectSociety());
  }

  ngOnInit(): void {
    this._store.dispatch(getSociety({ societyId: '29fed1c2-207f-436a-9956-38a1a38d0e2e' }))
  }

}
