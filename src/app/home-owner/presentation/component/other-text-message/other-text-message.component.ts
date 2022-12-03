import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/home-owner/domain/entities/message';

@Component({
  selector: 'app-other-text-message',
  templateUrl: './other-text-message.component.html',
  styleUrls: ['./other-text-message.component.scss']
})
export class OtherTextMessageComponent implements OnInit {

  @Input() message?: Message

  
  constructor() { }

  ngOnInit(): void {
  }

}
