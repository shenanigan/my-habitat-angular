import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { addMessage } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { AddMessageRequest } from 'src/app/home-owner/domain/contracts/requests/add-message';
import { HomeOwner } from 'src/app/home-owner/domain/entities/home-owner';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('chatBox') private chatBox?: ElementRef;
  text: string = '';
  homeOwner$: Observable<HomeOwner> = this._store.select(selectHomeOwner());

  constructor(private _store: Store) { }

  ngOnInit(): void {
    if (this.chatBox) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }
  }
  ngAfterViewChecked(): void {
    if (this.chatBox) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    }
  }

  sendMessage() {
    this.homeOwner$.pipe(take(1)).subscribe(x => {
      const request: AddMessageRequest = {
        type: 'TEXT',
        text: this.text
      }
      this._store.dispatch(addMessage({ homeOwnerId: x.entityId, request }))
      this.text = ''
    });
  }
}
