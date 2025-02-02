import {User} from "./User";

export class Seat{
  id!:string;
  seatNumber!:string;
  isAvailable!:boolean;
  user!: User
}
