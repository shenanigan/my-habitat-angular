import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-kid',
  templateUrl: './add-kid.component.html',
  styleUrls: ['./add-kid.component.scss']
})
export class AddKidComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addkid(){
    console.log('kid')
  }
  
}
