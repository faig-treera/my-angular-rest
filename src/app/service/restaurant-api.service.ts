import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { environment } from '../../environments/environment';
import { Country } from '../models/country';
import { Cuisine } from '../models/cusine';
import { Price } from '../models/price';


 const httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json',
   }),
 };


@Injectable({
  providedIn: 'root'
})
export class RestaurantApiService {
 

  constructor(private http: HttpClient) { }
  public getRestaurant():Observable<Restaurant[]>{
    let url:string=environment.apiUrl+"/assets/fake-api/restaurants.json"
    return this.http.get<Restaurant[]>(url);
  }

  public getCountries():Observable<Country[]>{
    let url:string=environment.apiUrl+"/assets/fake-api/countries.json"
    return this.http.get<Country[]>(url) 
  }

  public getCuisines():Observable<Cuisine[]>{
    let url:string=environment.apiUrl+"/assets/fake-api/cuisines.json"
    return this.http.get<Cuisine[]>(url) 
  }

  public getPrices():Observable<Price[]>{
    let url:string=environment.apiUrl+"/assets/fake-api/prices.json"
    return this.http.get<Price[]>(url) 
  }
}
