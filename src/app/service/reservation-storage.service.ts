import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationStorageService {

  reservation: Reservation[] = [];

  constructor() { }

  public static setReservation(res: Reservation[]) {
    localStorage.setItem('reservation', JSON.stringify(res));
  }
  public static getReservations(userId: number): Reservation[] {

    let array = localStorage.getItem('reservation');
    if (!array) {
      array = "[]";
    }
    return JSON.parse(array).filter((x: any) => x.userId == userId);
  }

}
