
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { addHousehold, removeHousehold, updateHousehold } from 'src/app/home-owner/+state/home-owner.actions';
import { AddHouseholdRequest } from 'src/app/home-owner/domain/contracts/requests/add-household';
import { selectDailyHelpRoles, selectFamilyAdultRoles, selectFamilyKidRoles, selectFrequentVisitorRoles } from 'src/app/shared/+state/shared.selector';
import { Role } from 'src/app/shared/domain/role';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { AbstractImageStorageService } from 'src/app/shared/domain/services/iimage-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Household } from 'src/app/home-owner/domain/entities/household';
import { environment } from 'src/environments/environment';
import { Dialog } from '@capacitor/dialog';
import { RemoveHouseholdRequest } from 'src/app/home-owner/domain/contracts/requests/remove-household';
import { UpdateHouseholdRequest } from 'src/app/home-owner/domain/contracts/requests/update-household';

@Component({
  selector: 'app-edit-hsouse-hold',
  templateUrl: './edit-house-hold.component.html',
  styleUrls: ['./edit-house-hold.component.scss']
})
export class EditHouseHoldComponent implements OnInit,OnChanges {

  imageUrl?:string;
  image?: Photo;
  readSASToken = environment.azureRWSASToken;
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

  @Input() type: string = 'FAMILY_ADULT'
  @Input() member?: Household 
  

  activeRole?: Role
  isAdultSelected = true

  get showPhoneNumber(): boolean {
    return this.type !== 'FAMILY_KID'
  }

  get title(): string {
    if (this.type === 'DAILY_HELP') {
      return 'Edit Daily Help'
    } else if (this.type === 'VISITOR' || this.type === 'FREQUENT_VISITOR') {
      return 'Edit Visitor'
    }
    return 'Edit Family'
  }

  get showPermissions(): boolean {
    return this.type === 'FAMILY_KID'
  }

  get showAdultSelection(): boolean {
    return this.type === 'FAMILY_ADULT' || this.type === 'FAMILY_KID'
  }

  roles$: Observable<Role[]> = this._store.select(selectFamilyAdultRoles())
  permissions: string[] = ['Require Permission', 'Permission Not Required']
  permissionValues: string[] = ['REQUIRE_PERMISSION', 'NO_PERMISSION_REQUIRED']
  currentPermission?: string

  editHouseholdFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
    email: new FormControl('')
  })

  constructor(private _store: Store,
    private _imageService: AbstractImageStorageService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.type = data[0].type
    this.member = data[0].member
    
    
    if (this.type === 'DAILY_HELP') {
      this.roles$ = this._store.select(selectDailyHelpRoles())
    }

    if (this.type === 'FREQUENT_VISITOR') {
      this.roles$ = this._store.select(selectFrequentVisitorRoles())
    }

    this.roles$.pipe(take(1)).subscribe(roles => {
      if (roles.length > 0) {
        const role =roles.find(x=>x.name===this.member?.role)
        this.activeRole =role?? roles[0]
      }
    })

    if(this.member?.type==='FAMILY_KID'){
      this.isAdultSelected=false;
    }
      
    
  }

  ngOnInit(): void {
    this.imageUrl=this.member?.imageUrl+this.readSASToken
    
    if(this.member?.name!==undefined)
      this.editHouseholdFormGroup.get('name')?.patchValue(this.member.name);
    if(this.member?.phoneNumber!==undefined) 
      this.editHouseholdFormGroup.get('phoneNumber')?.patchValue(this.member.phoneNumber);
    if(this.member?.email!==undefined) 
      this.editHouseholdFormGroup.get('email')?.patchValue(this.member.email); 
  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }
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

  save(){

    if (this.image?.base64String) {
      this._imageService.saveImage(uuidv4(), this.image.base64String, this.image.format).pipe(take(1)).subscribe(imageUrl => {
        this._updateHousehold(imageUrl)
      });
    } else {
       this._updateHousehold()
      }
  }

    private _updateHousehold(imageUrl?: string){
      var permission: string | undefined
      if (this.currentPermission) {
        const index = this.permissions.indexOf(this.currentPermission);
        if (index >= 0) {
          permission = this.permissionValues[index]
        }
      }
      const household:UpdateHouseholdRequest={
        householdId:this.member!.entityId,
        email:this.editHouseholdFormGroup.get('email')?.value?? '',
        name: this.editHouseholdFormGroup.get('name')?.value ?? '',
        phoneNumber: this.editHouseholdFormGroup.get('phoneNumber')?.value ?? '',
        role: this.activeRole?.name ?? '',
        permission: permission,
        countryCode: 973,
        imageUrl: imageUrl, 
        type: this.member!.type
      }
      this._store.dispatch(updateHousehold({ household }));
    }
  

  async remove() {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      okButtonTitle: 'Remove',
      cancelButtonTitle: 'Close',
      message: `Are you sure you'd like to remove member?`,
    });

    if (value) {
      const household: RemoveHouseholdRequest = {
        householdId: this.member!.entityId
      }

      this._store.dispatch(removeHousehold({ household }));

    }
  }  
}
