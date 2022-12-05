import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { addMessage } from 'src/app/home-owner/+state/home-owner.actions';
import { selectHomeOwner } from 'src/app/home-owner/+state/home-owner.selector';
import { AddMessageRequest } from 'src/app/home-owner/domain/contracts/requests/add-message';
import { HomeOwner } from 'src/app/home-owner/domain/entities/home-owner';
import { AbstractImageStorageService } from 'src/app/shared/domain/services/iimage-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  image?: Photo;
  @ViewChild('chatBox') private chatBox?: ElementRef;
  text: string = '';
  homeOwner$: Observable<HomeOwner> = this._store.select(selectHomeOwner());

  constructor(private _store: Store,
    private _imageService: AbstractImageStorageService) { }

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
          this.text = ''
        });
      });
    }
  }
}
