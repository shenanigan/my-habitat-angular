import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/home-owner/domain/entities/message';

@Component({
  selector: 'app-my-text-message',
  templateUrl: './my-text-message.component.html',
  styleUrls: ['./my-text-message.component.scss']
})
export class MyTextMessageComponent implements OnInit {

  @Input() message?: Message

  constructor() { }

  ngOnInit(): void {
  }

}
