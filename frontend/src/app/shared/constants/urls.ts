import { environment } from "src/environments/environment";

const BASE_URL = environment.production? '' : 'http://localhost:5000';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const GET_ALL_USERS_URL = BASE_URL + '/api/users/getAll';

export const GET_ALL_SEATS_URL = BASE_URL + '/api/seats';
export const BOOK_SEAT_URL = BASE_URL + '/api/book';



