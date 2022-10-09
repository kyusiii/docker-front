import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant.service";
import {Restaurant} from "../../dtos/responses/restaurant.dto";
import {RestaurantFormModel} from "../../dtos/restaurant-form.model";

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css']
})
export class RestaurantsPageComponent implements OnInit {

  public restaurants: Restaurant[] = [];
  public errorWhileLoadingRestaurants: boolean = false;

  constructor(private restaurantService: RestaurantService) {
  }

  public ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: value => {
        this.errorWhileLoadingRestaurants = false;
        this.restaurants = value;
      },
      error: err => {
        this.errorWhileLoadingRestaurants = true;
        this.restaurants = [];
      }
    });
  }

  public addRestaurant(restaurant: RestaurantFormModel): void {
    this.restaurantService.addRestaurant(restaurant.nom, restaurant.adresse).subscribe({
      next: value => {
        this.restaurants.push(value);
      }
    });
  }

}
