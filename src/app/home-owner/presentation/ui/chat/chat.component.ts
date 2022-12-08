import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { addMessage, getHomeOwner } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { AddMessageRequest } from 'src/app/home-owner/domain/contracts/requests/add-message';
import { HomeOwner } from 'src/app/home-owner/domain/entities/home-owner';
import { Message } from 'src/app/home-owner/domain/entities/message';
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

  constructor(private _store: Store,
    private _imageService: AbstractImageStorageService) {
    this._reloadMedia();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  ngAfterViewChecked() {
    this._scrollToBottom();
  }
  private _reloadMedia() {
    this.homeOwner$.pipe(take(1)).subscribe(x => {
      this.media = x.messages.filter(x => x.type === 'IMAGE').map(x => {
        const val = {
          id: x.entityId,
          image: x.imageUrl + this.readSASToken
        }
        return val
      })
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
    console.log(this.selectedImageIndex);
    this.showMedia = true;
  }

  closeMedia() {
    this.showMedia = false;
  }
}
