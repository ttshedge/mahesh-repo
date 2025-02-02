import { Component, OnInit } from '@angular/core';
import {SeatService} from "../../../services/seat.service";
import {Seat} from "../../../shared/models/Seat";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  seats: Seat[] = [];
  selectedSeat: any;
  constructor(private seatService: SeatService, private userService: UserService) {
  }

  ngOnInit(): void {

    this.loadSeats()
  }

  loadSeats():void{
    this.seatService.getAllSeats()
      .subscribe(res=> {
        this.seats = res;
      })
  }
  toggleBooking(chair: any) {
    if (chair.isAvailable) {
      this.selectedSeat = chair.id;
    } else {
      return
    }

  }

  bookSeat() {
    let currentUser = this.userService.currentUser;

    this.seatService.bookSeat(
      {studentId: currentUser.id, seatId: this.selectedSeat, isAdvancedBooking: false})
      .subscribe(res=>{
        this.loadSeats();
      })

  }
}
