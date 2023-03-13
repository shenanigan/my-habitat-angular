import { Component,  OnInit } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectHomeOwner } from '../home-owner/+state/home-owner.selector';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
 
  homeOwner$ = this._store.select(selectHomeOwner());

  image?: Photo;
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
  }
  constructor(private _store:Store,
              private _location: Location,){}
  

  editProfileFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    email: new FormControl('')
  })
  ngOnInit(): void {
    
  }

  editProfile(){

  }
  
  back() {
    this._location.back()
  }
}
