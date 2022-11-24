import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Log } from 'src/app/home-owner/domain/entities/log';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  @Input() log?: Log
  @Output() onDeny = new EventEmitter<void>()
  @Output() onApprove = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  deny() {
    this.onDeny.emit()
  }

  approve() {
    this.onApprove.emit()
  }

}
