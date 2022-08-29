import { Component, Inject, Injectable, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { bindCallback, Observable } from 'rxjs';
import { Country } from 'src/app/models/country';
import { Cuisine } from 'src/app/models/cusine';
import { Price } from 'src/app/models/price';
import { Reservation } from 'src/app/models/reservation';
import { Restaurant } from 'src/app/models/restaurant';
import { ReservationStorageService } from 'src/app/service/reservation-storage.service';
import { RestaurantApiService } from 'src/app/service/restaurant-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})

export class MyaccountComponent implements OnInit {

  userId = 0;
  restaurants: Restaurant[] = [];
  tempRestaurants: Restaurant[] = [];
  countries: Country[] = [];
  prices: Price[] = [];
  cuisine: Cuisine[] = [];
  public static reservation: Reservation[] = [];

  person: number = 0;
  date: string = "";

  constructor(private ras: RestaurantApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId=this.getUserId();
    this.getCountryData();
    this.getCuisineData();
    this.getPriceData();
    this.getRestaurantData();
    MyaccountComponent.reservation = ReservationStorageService.getReservations(this.userId);

  }
  getUserId(): number {
    let userObj = localStorage.getItem('userObj');
    if (!userObj) {
      userObj = "{}";
    }
    const userId = JSON.parse(userObj).id;
    return userId;
  }
  getUniqueListBy(arr: Restaurant[], key: string) {
    return [...new Map(arr.map((item: any) => [item[key], item])).values()]
  }

  getRestaurantData() {
    this.ras
      .getRestaurant()
      .subscribe({
        next: (rm: Restaurant[]) => {
          // this.countries=this.getUniqueListBy(rm,"country").map(a=>a.country);
          // this.prices=this.getUniqueListBy(rm,"price").map(b=>b.price);
          // this.cusine=this.getUniqueListBy(rm,"cuisine").map(b=>b.cusine);
          this.restaurants = rm;
          this.tempRestaurants = [...this.restaurants];
        },
        complete: () => { },
        error: (err: any) => { console.log(err) }
      });

  }
  getCountryData() {
    this.ras
      .getCountries()
      .subscribe({
        next: (cm: Country[]) => {

          this.countries = cm;
        },
        complete: () => { },
        error: (err: any) => { console.log(err) }
      });



  }
  getCuisineData() {
    this.ras
      .getCuisines()
      .subscribe({
        next: (cum: Cuisine[]) => {

          this.cuisine = cum;
        },
        complete: () => { },
        error: (err: any) => { console.log(err) }
      });



  }
  getPriceData() {
    this.ras
      .getPrices()
      .subscribe({
        next: (pr: Price[]) => {

          this.prices = pr;
        },
        complete: () => { },
        error: (err: any) => { console.log(err) }
      });



  }
  checkCountry() {
    this.cuisine.forEach(function (value, key) {
      value.isChecked = false;
    });
    this.prices.forEach(function (value, key) {
      value.isChecked = false;
    });

    //get my list inside checked value
    let checkedCountry = this.countries.filter(x => x.isChecked);
    // you filter the object of restaurants which you find in the checked list
    let restaurantList = checkedCountry.length == 0 ? this.restaurants : this.restaurants.filter(array => checkedCountry.some(filter => filter.id === array.countryId));
    this.tempRestaurants = restaurantList;
  }

  checkCuisine() {
    this.countries.forEach(function (value, key) {
      value.isChecked = false;
    });
    this.prices.forEach(function (value, key) {
      value.isChecked = false;
    });

    let checkedCuisine = this.cuisine.filter(x => x.isChecked);
    let restaurantList = checkedCuisine.length == 0 ? this.restaurants : this.restaurants.filter(array => checkedCuisine.some(filter => filter.id === array.cuisineId));
    this.tempRestaurants = restaurantList;
  }
  checkPrice() {
    this.countries.forEach(function (value, key) {
      value.isChecked = false;
    });
    this.cuisine.forEach(function (value, key) {
      value.isChecked = false;
    });

    let checkedPrice = this.prices.filter(x => x.isChecked);
    let restaurantList = checkedPrice.length == 0 ? this.restaurants : this.restaurants.filter(array => checkedPrice.some(filter => filter.id === array.priceId));
    this.tempRestaurants = restaurantList;
  }
  openDialog(restuarantName: string): void {
    this.dialog.open(ReservationDialog, {
      width: '250px',
      data: { person: this.person, date: this.date, restuarantName: restuarantName },
    });
  }
  public static addReservation(data: Reservation) {
    let findId = MyaccountComponent.reservation.length + 1;

    MyaccountComponent.reservation.push({
      id: findId,
      restuarantName: data.restuarantName,
      person: data.person,
      date: data.date,
      status: "Pending",
      userId: 1
    });
    console.log(MyaccountComponent.reservation)
    ReservationStorageService.setReservation(MyaccountComponent.reservation)
  }
  removeReservation(id: number) {
    let findIndex = MyaccountComponent.reservation.findIndex(x => x.id == id);
    MyaccountComponent.reservation.splice(findIndex, 1);
    ReservationStorageService.setReservation(MyaccountComponent.reservation);

  }
  public getReservationData(): Reservation[] {
    return MyaccountComponent.reservation;
  }

}


@Component({
  selector: 'reservation',
  templateUrl: 'reservation.html',
})
export class ReservationDialog {
  constructor(
    public dialogRef: MatDialogRef<ReservationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation
  ) {
  }
  onSave(): void {
    MyaccountComponent.addReservation(this.data);
    //console.log(this.myac.reservation);
    this.dialogRef.close();
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
