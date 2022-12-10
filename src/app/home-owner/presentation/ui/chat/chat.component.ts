import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { addMessage, getHomeOwner, markMessageViewed } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { AddMessageRequest } from 'src/app/home-owner/domain/contracts/requests/add-message';
import { HomeOwner } from 'src/app/home-owner/domain/entities/home-owner';
import { Message } from 'src/app/home-owner/domain/entities/message';
import { messageRecieved } from 'src/app/shared/+state/shared.actions';
import { AbstractImageStorageService } from 'src/app/shared/domain/services/iimage-storage.service';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {


  subscription?: Subscription
  image?: Photo;
  @ViewChild('chatBox') private chatBox!: ElementRef;
  text: string = '';
  isScrollUpdated = false;
  homeOwner$: Observable<HomeOwner> = this._store.select(selectHomeOwner());
  selectedImageIndex: number = 0;
  showMedia = false;
  media: any[] = []
  readSASToken = environment.azureRWSASToken;
  _subscription?: Subscription;
  _actionsSubscription: Subscription;

  constructor(private _store: Store,
    private _actions$: ActionsSubject,
    private _imageService: AbstractImageStorageService) {
    this._store.dispatch(markMessageViewed())
    this._actionsSubscription = this._actions$.pipe(
      ofType(messageRecieved)).subscribe(_ => {
        this._store.dispatch(markMessageViewed())
      })
    this._reloadMedia();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {

    this.subscription?.unsubscribe()
    this._subscription?.unsubscribe()
    this._actionsSubscription.unsubscribe()
  }

  ngAfterViewChecked() {
    this._scrollToBottom();
  }

  private _reloadMedia() {
    this._subscription = this.homeOwner$.subscribe(x => {
      this.media = x.messages.filter(x => x.type === 'IMAGE').map(x => {
        const val = {
          id: x.entityId,
          image: x.imageUrl + this.readSASToken
        }
        return val
      })


      setTimeout(() => {
        this.isScrollUpdated = false;
        this._scrollToBottom()
      }, 300);
    })
  }



  private _scrollToBottom() {
    if (this.chatBox && !this.isScrollUpdated) {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
      if (this.chatBox.nativeElement.scrollTop > 0) {
        this.isScrollUpdated = true
      }
    }
  }




  sendMessage() {
    this.isScrollUpdated = false;
    this.homeOwner$.pipe(take(1)).subscribe(x => {
      const request: AddMessageRequest = {
        type: 'TEXT',
        text: this.text
      }
      this._store.dispatch(addMessage({ homeOwnerId: x.entityId, request }))
      this.text = ''
    });
  }

  async selectImage() {
    await this.takePicture();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    this.image = image;

    if (this.image?.base64String) {
      this._imageService.saveImage(uuidv4(), this.image.base64String, this.image.format).pipe(take(1)).subscribe(imageUrl => {
        this.homeOwner$.pipe(take(1)).subscribe(x => {
          const request: AddMessageRequest = {
            type: 'IMAGE',
            imageUrl
          }
          this._store.dispatch(addMessage({ homeOwnerId: x.entityId, request }))
          this.isScrollUpdated = false;
          this.text = ''
        });
      });
    }
  }

  openLightbox($event: Message) {
    this.selectedImageIndex = this.media.map(x => x.id).indexOf($event.entityId);
    this.showMedia = true;
  }

  closeMedia() {
    this.showMedia = false;
  }
}
