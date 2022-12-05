import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/home-owner/domain/entities/message';

@Component({
  selector: 'app-other-image-message',
  templateUrl: './other-image-message.component.html',
  styleUrls: ['./other-image-message.component.scss']
})
export class OtherImageMessageComponent implements OnInit {

  @Input() message?: Message
  @Output() onClick = new EventEmitter<Message>()

  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.onClick.emit(this.message)
  }

}
