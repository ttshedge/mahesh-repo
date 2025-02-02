import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import {BOOK_SEAT_URL, GET_ALL_SEATS_URL} from '../shared/constants/urls';
import { Seat } from '../shared/models/Seat';

// const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class SeatService {
  constructor(private http:HttpClient, private toastrService:ToastrService) {

  }
    getAllSeats():Observable<any>{
      return this.http.get<Seat>(GET_ALL_SEATS_URL).pipe(
        tap({
          next: (seats) =>{
            this.toastrService.success(
              `Successfully fetched seats`,
              'Seat List'
            )
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error, 'Seat fetch Failed');
          }
        })
      );
    }

  bookSeat(payload: any):Observable<any>{
    return this.http.post<Seat>(BOOK_SEAT_URL, payload).pipe(
      tap({
        next: (seats) =>{
          this.toastrService.success(
            `Successfully created booking`,
            'Book Seat'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error?.error, 'Seat Booking Failed');
        }
      })
    );
  }

}
