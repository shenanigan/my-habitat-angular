import { Component, OnInit } from '@angular/core';
export { }; declare global { interface Window { Calendly: any; } }

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.Calendly.initInlineWidget({
      url: 'https://calendly.com/arjav-dave?hide_gdpr_banner=1',
      parentElement: document.querySelector('.calendly-inline-widget'),
    });
  }

}
