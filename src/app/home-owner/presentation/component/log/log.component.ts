import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Log } from 'src/app/home-owner/domain/entities/log';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  @Input() log?: Log
  @Output() onDeny = new EventEmitter<Log>()
  @Output() onApprove = new EventEmitter<Log>()
  readSASToken = environment.azureRWSASToken;

  constructor() { }

  ngOnInit(): void {
  }

  deny() {
    this.onDeny.emit(this.log)
  }

  approve() {
    this.onApprove.emit(this.log)
  }

}
