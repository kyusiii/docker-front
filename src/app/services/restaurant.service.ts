import {Injectable} from '@angular/core';
import {Restaurant} from "../dtos/responses/restaurant.dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {concatMap, map, Observable} from "rxjs";
import {AddRestaurantDto} from "../dtos/requests/add-restaurant.dto";
import {UpdateRestaurantDto} from "../dtos/requests/update-restaurant.dto";
import {GetS3UrlResponseDto} from "../dtos/responses/get-s3-url-response.dto";

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
    return this.httpClient.get<Restaurant>(`${environment.backendUrl}/restaurants/${restaurantId}`).pipe(
      concatMap(restaurant => {
        return this.getRestaurantPhoto(restaurant.id)
          .pipe(
            map(photoUrl => {
              restaurant.photoUrl = photoUrl.url;
              return restaurant;
            })
          )
      })
    );
  }

  public addRestaurant(nom: string, adresse: string): Observable<Restaurant> {
    const body: AddRestaurantDto = {
      nom,
      adresse
    }

    return this.httpClient.post<Restaurant>(`${environment.backendUrl}/restaurants`, body);
  }

  public updateRestaurant(restaurantId: number, nom: string, adresse: string): Observable<Restaurant> {
    const body: UpdateRestaurantDto = {
      nom,
      adresse
    }

    return this.httpClient.put<Restaurant>(`${environment.backendUrl}/restaurants/${restaurantId}`, body);
  }

  public getRestaurantPhoto(restaurantId: number): Observable<GetS3UrlResponseDto> {
    return this.httpClient.get<GetS3UrlResponseDto>(`${environment.backendUrl}/restaurants/${restaurantId}/photo`);
  }

  public putRestaurantPhoto(restaurantId: number, file: File): void {
    this.httpClient.put<GetS3UrlResponseDto>(`${environment.backendUrl}/restaurants/${restaurantId}/photo`, {})
      .subscribe(uploadResponse => {
          return this.httpClient.put<void>(uploadResponse.url, file).subscribe();
        }
      );
  }

}
