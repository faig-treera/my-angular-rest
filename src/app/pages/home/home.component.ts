import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { Cuisine } from 'src/app/models/cusine';
import { Price } from 'src/app/models/price';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantApiService } from 'src/app/service/restaurant-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  restaurants: Restaurant[] = [];
  countries: Country[]=[];
  prices: Price[]=[];
  cuisine:Cuisine[]=[];



  checked = false;
  indeterminate = false;
  abc = "";
  constructor(private ras: RestaurantApiService) { }

  ngOnInit(): void {
    this.getCountryData();
    this.getCuisineData();
    this.getPriceData();
    this.getRestaurantData();
  
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

  checkCountry(){
    let checkedCountry=this.countries.filter(x=>x.isChecked);
    console.log(checkedCountry)
  }

}
