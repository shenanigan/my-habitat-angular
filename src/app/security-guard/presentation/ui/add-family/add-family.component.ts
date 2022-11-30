import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { addHousehold } from 'src/app/security-guard/+state/security-guard.actions';
import { AddHouseholdRequest } from 'src/app/security-guard/domain/contracts/requests/add-household';
import { selectDailyHelpRoles, selectFamilyAdultRoles, selectFamilyKidRoles, selectFrequentVisitorRoles, selectVisitorRoles } from 'src/app/shared/+state/shared.selector';
import { Role } from 'src/app/shared/domain/role';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { AbstractImageStorageService } from 'src/app/shared/domain/services/iimage-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.scss']
})
export class AddFamilyComponent implements OnInit {

  @Input() type: string = 'FAMILY_ADULT'
  activeRole?: Role
  isAdultSelected = true
  homeOwnerId?: string;
  image?: Photo

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

  get showPhoneNumber(): boolean {
    return this.type !== 'FAMILY_KID'
  }

  get showPermissions(): boolean {
    return this.type === 'FAMILY_KID'
  }

  get showAdultSelection(): boolean {
    return this.type === 'FAMILY_ADULT' || this.type === 'FAMILY_KID'
  }

  roles$: Observable<Role[]> = this._store.select(selectFamilyAdultRoles())
  permissions: string[] = ['Require Permission', 'Permission Not Required']
  currentPermission?: string

  addHouseholeFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
  })

  constructor(private _store: Store,
    private _imageService: AbstractImageStorageService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.type = data[0].type
    this.homeOwnerId = data[0].homeOwnerId;

    if (this.type === 'DAILY_HELP') {
      this.roles$ = this._store.select(selectDailyHelpRoles())
    }

    if (this.type === 'FREQUENT_VISITOR') {
      this.roles$ = this._store.select(selectFrequentVisitorRoles())
    }

    if (this.type === 'VISITOR') {
      this.roles$ = this._store.select(selectVisitorRoles())
    }

    this.roles$.pipe(take(1)).subscribe(roles => {
      if (roles.length > 0) {
        this.activeRole = roles[0]
      }
    })
  }

  ngOnInit(): void { }
  toggleAdult() {

    this.isAdultSelected = !this.isAdultSelected

    if (this.isAdultSelected) {
      this.currentPermission = undefined
      this.type = 'FAMILY_ADULT'
      this.roles$ = this._store.select(selectFamilyAdultRoles())
    } else {
      this.currentPermission = this.permissions[0]
      this.type = 'FAMILY_KID'
      this.roles$ = this._store.select(selectFamilyKidRoles())
    }

    this.roles$.pipe(take(1)).subscribe(roles => {
      if (roles.length > 0) {
        this.activeRole = roles[0]
      }
    })
  }

  addHousehold() {
    if (this.image?.base64String) {
      this._imageService.saveImage(uuidv4(), this.image.base64String, this.image.format).pipe(take(1)).subscribe(imageUrl => {
        this._addHousehold(imageUrl)
      });
    } else {
      this._addHousehold()
    }
  }

  private _addHousehold(imageUrl?: string) {
    if (this.homeOwnerId) {
      const householdRequest: AddHouseholdRequest = {
        homeOwnerId: this.homeOwnerId,
        name: this.addHouseholeFormGroup.get('name')?.value ?? '',
        role: this.activeRole?.name ?? '',
        type: this.type,
        countryCode: 973,
        permission: this.currentPermission,
        phoneNumber: this.addHouseholeFormGroup.get('phoneNumber')?.value ?? '',
        imageUrl: imageUrl
      }
      this._store.dispatch(addHousehold({ household: householdRequest }))
    }
  }
}
