import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {

  members:any;
  helpers:any;
  visitors:any;
  constructor() { }

  ngOnInit(){
this.members=[
  { img:'http://bluegalaxy.info/images/sea_captain.jpg',
     Name:'ali mubarak',
  position:'owner'
  },
  { img:'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    Name:'Rehana M.',
  position:'Wife'
  },
  { img:'http://bluegalaxy.info/images/sea_captain.jpg',
     Name:'Kamrul M.',
  position:'Son'
  },
  { img:'http://bluegalaxy.info/images/sea_captain.jpg',
    Name:'Ayesha M.',
  position:'Daughter'
  },
  { img:'http://bluegalaxy.info/images/sea_captain.jpg',
    Name:'Shabbir M.',
  position:'Father'
  },
  { img:'http://bluegalaxy.info/images/sea_captain.jpg',
    Name:'Hajra M.',
  position:'Mother'
  }
]

this.helpers=[
  { img:'http://bluegalaxy.info/images/sea_captain.jpg',
   Name:'Asif Mia',
    Work:'Dog Walker',
    visits:'Daily Help',
    logo:'phone-logo'
  },
  { img:'http://bluegalaxy.info/images/sea_captain.jpg',
   Name:'Rashed Hussain',
    Work:'Car Cleaner',
    visits:'Daily Help',
    logo:'phone-logo',
  }
]

this.visitors=[
  {img:'http://bluegalaxy.info/images/sea_captain.jpg' ,
   Name:'Emon H..',
   relation :'Friend'
  },
  {img:'http://bluegalaxy.info/images/sea_captain.jpg' ,
  Name:'Bianca L.',
  relation :'Friend'
 },
 {img:'http://bluegalaxy.info/images/sea_captain.jpg' ,
 Name:'Jonathan G.',
 relation :'Friend'
},
{img:'http://bluegalaxy.info/images/sea_captain.jpg' ,
Name:'Shuvo A.',
relation :'Relative'
}, {img:'http://bluegalaxy.info/images/sea_captain.jpg' ,
Name:'Saiful T.',
relation :'Relative'
},
{img:'http://bluegalaxy.info/images/sea_captain.jpg' ,
Name:'Monsur Islam',
relation :'Colleague'
},

]
 }  



}
