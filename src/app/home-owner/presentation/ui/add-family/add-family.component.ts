import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { addHousehold } from 'src/app/home-owner/+state/home-owner.actions';
import { AddHouseholdRequest } from 'src/app/home-owner/domain/contracts/requests/add-household';
import { selectDailyHelpRoles, selectFamilyAdultRoles, selectFamilyKidRoles, selectFrequentVisitorRoles } from 'src/app/shared/+state/shared.selector';
import { Role } from 'src/app/shared/domain/role';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.scss']
})
export class AddFamilyComponent implements OnInit {

  @Input() type: string = 'FAMILY_ADULT'
  activeRole?: Role
  isAdultSelected = true

  get showPhoneNumber(): boolean {
    return this.type !== 'FAMILY_KID'
  }

  get showAdultSelection(): boolean {
    return this.type === 'FAMILY_ADULT' || this.type === 'FAMILY_KID'
  }

  roles$: Observable<Role[]> = this._store.select(selectFamilyAdultRoles())

  addHouseholeFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(''),
  })

  constructor(private _store: Store,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.type = data[0].type

    if (this.type === 'DAILY_HELP') {
      this.roles$ = this._store.select(selectDailyHelpRoles())
    }

    if (this.type === 'FREQUENT_VISITOR') {
      this.roles$ = this._store.select(selectFrequentVisitorRoles())
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
      this.type = 'FAMILY_ADULT'
      this.roles$ = this._store.select(selectFamilyAdultRoles())
    } else {
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
    const householdRequest: AddHouseholdRequest = {
      name: this.addHouseholeFormGroup.get('name')?.value ?? '',
      role: this.activeRole?.name ?? '',
      type: this.type,
      countryCode: 973,
      phoneNumber: this.addHouseholeFormGroup.get('phoneNumber')?.value ?? '',
    }
    this._store.dispatch(addHousehold({ household: householdRequest }))
  }
}
