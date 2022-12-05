import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Message } from 'src/app/home-owner/domain/entities/message';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-image-message',
  templateUrl: './my-image-message.component.html',
  styleUrls: ['./my-image-message.component.scss']
})
export class MyImageMessageComponent implements OnInit {

  @Input() message?: Message
  @Output() onClick = new EventEmitter<Message>()
  readSASToken = environment.azureRWSASToken;

  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.onClick.emit(this.message)
  }

}
