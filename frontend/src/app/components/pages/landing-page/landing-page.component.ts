import { Component, OnInit } from '@angular/core';
import { SeatService } from 'src/app/services/seat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  loggedInUser: any;
  constructor(private userService: UserService,
    private seatService: SeatService
  ){}

  ngOnInit(): void {
    this.userService.userObservable
   .subscribe(res =>{
    this.loggedInUser = res;
    console.log(this.loggedInUser)
   });
  }

  openBooking(): void {
    this.seatService.openBooking()
    .subscribe(res => {

    })
  }

}
