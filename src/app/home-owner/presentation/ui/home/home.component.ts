import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { getHomeOwner } from '../../../+state/home-owner.actions';
import { KidExitComponent } from '../kid-exit/kid-exit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet,
    private _store: Store) { 
    this._store.dispatch(getHomeOwner());
  }

  ngOnInit(): void {
  }

  openKidExit() {
    this._bottomSheet.open(KidExitComponent)
  }

}
