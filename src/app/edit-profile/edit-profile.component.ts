import { Component,  OnInit } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { ActionsSubject, Store } from '@ngrx/store';
import { async, Observable, Subscription, take } from 'rxjs';
import { selectHomeOwner } from '../home-owner/+state/home-owner.selector';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { AbstractImageStorageService } from '../shared/domain/services/iimage-storage.service';
import { UpdateHomeOwnerRequest } from '../home-owner/domain/contracts/requests/update-homeOwner';
import { updateHomeOwner, updateHomeOwnerSuccess } from '../home-owner/+state/home-owner.actions';

import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
 
  homeOwner$ = this._store.select(selectHomeOwner());
  // userImage='assets/images/ic_default_myprofile.svg';
  image?: Photo;
  imageUrl?:string;
  subscription?: Observable<any>;
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
    this.imageUrl= 'data:image/'+this.image?.format+ ';base64,' + this.image?.base64String
  }
  constructor(private _store:Store,
              private _location: Location,
              private _imageService: AbstractImageStorageService,
              private _actionsSubject:ActionsSubject){
                this._actionsSubscription=this._actionsSubject
                .pipe(ofType(updateHomeOwnerSuccess))
                .subscribe((_)=>{
                  this._location.back()
                })
              }

  private _actionsSubscription:Subscription;

  editProfileFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    email: new FormControl('')
  })
  ngOnInit(): void {
    this.homeOwner$.subscribe((homeOwner)=>{
      this.editProfileFormGroup.get('name')?.patchValue(homeOwner.name!)
      this.editProfileFormGroup.get('phoneNumber')?.patchValue(homeOwner.phoneNumber!)
      this.editProfileFormGroup.get('email')?.patchValue(homeOwner.email!)
    })
    this.editProfileFormGroup.get('phoneNumber')?.disable()
  }

  onSave(){
    if (this.image?.base64String) {
      this._imageService.saveImage(uuidv4(), this.image.base64String, this.image.format).pipe(take(1)).subscribe(imageUrl => {
        this._updateHomeOwner(imageUrl)
      });
      debugger
    } else {
       this._updateHomeOwner()
    }
  }
  
  private _updateHomeOwner(imageUrl?:string){
    const homeOwner:UpdateHomeOwnerRequest={
      name:this.editProfileFormGroup.get('name')?.value??'',
      email:this.editProfileFormGroup.get('email')?.value??'',
      imageUrl:imageUrl
    }
    debugger
    this._store.dispatch(updateHomeOwner({homeOwner}))
  }


  back() {
    this._location.back()
  }
}
