import {Component, OnInit} from '@angular/core';
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
  currentUser: any;
  users: any = []
  selectedUserId: any;

  constructor(private seatService: SeatService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    if (this.currentUser.isAdmin) {
      this.userService.getAllUsers()
        .subscribe(res => {
          this.users = res;
          console.log(this.users)
        });
    }
    this.loadSeats()
  }

  loadSeats(): void {
    this.seatService.getAllSeats()
      .subscribe(res => {
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
    this.seatService.bookSeat(
      {
        studentId: this.currentUser.isAdmin ? this.selectedUserId : this.currentUser.id,
        seatId: this.selectedSeat,
        isAdvancedBooking: false
      })
      .subscribe(res => {
        this.loadSeats();
      })
  }

  selectUser(user: any) {
    this.selectedUserId = user.target.value;
  }
}
