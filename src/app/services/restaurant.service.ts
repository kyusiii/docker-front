import {Injectable} from '@angular/core';
import {Restaurant} from "../models/responses/restaurant.dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AddRestaurantDto} from "../models/requests/add-restaurant.dto";
import {UpdateRestaurantDto} from "../models/requests/update-restaurant.dto";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllRestaurants(): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${environment.backendUrl}/restaurants`);
  }

  public getRestaurantById(restaurantId: number): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${environment.backendUrl}/restaurants/${restaurantId}`);
  }

  public addRestaurant(nom: string, adresse: string): Observable<Restaurant> {
    const body: AddRestaurantDto = {
      nom,
      adresse
    }

    console.log(body);

    return this.httpClient.post<Restaurant>(`${environment.backendUrl}/restaurants`, body);
  }

  public updateRestaurant(restaurantId: number, nom: string, adresse: string): Observable<Restaurant> {
    const body: UpdateRestaurantDto = {
      nom,
      adresse
    }

    return this.httpClient.put<Restaurant>(`${environment.backendUrl}/restaurants/${restaurantId}`, body);
  }

}
