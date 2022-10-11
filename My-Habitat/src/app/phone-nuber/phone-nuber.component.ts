import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-phone-nuber',
  templateUrl: './phone-nuber.component.html',
  styleUrls: ['./phone-nuber.component.scss']
})
export class PhoneNuberComponent implements OnInit {

  constructor(private _router: Router) { }
  ngOnInit() {
  }

  loginFormGroup = new FormGroup({
    phoneNumber: new FormControl('12121212', [Validators.required, Validators.pattern("^\\d{7,12}$")]),
  })

  sendVerificationCode() {
    console.log("HELLO")
    this._router.navigateByUrl('/otp')
  }

}
