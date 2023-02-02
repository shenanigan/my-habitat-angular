import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Household } from 'src/app/home-owner/domain/entities/household';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-row-pending-kid-exit',
  templateUrl: './row-pending-kid-exit.component.html',
  styleUrls: ['./row-pending-kid-exit.component.scss']
})
export class RowPendingKidExitComponent implements OnInit {
  readSASToken = environment.azureRWSASToken;
  @Input() household?: Household
  @Output() onCancel = new EventEmitter<Household>()
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.onCancel.emit(this.household)
  }

}
