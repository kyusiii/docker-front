import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant.service";
import {Restaurant} from "../../dtos/responses/restaurant.dto";
import {RestaurantFormModel} from "../../dtos/restaurant-form.model";
import {EvaluationService} from "../../services/evaluation.service";

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css']
})
export class RestaurantsPageComponent implements OnInit {

  public restaurants: Restaurant[] = [];
  public errorWhileLoadingRestaurants: boolean = false;

  constructor(private restaurantService: RestaurantService,
              private evaluationService: EvaluationService) {
  }

  public ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: value => {
        this.errorWhileLoadingRestaurants = false;
        this.restaurants = value;
        this.restaurants.forEach(restaurant => {
          this.restaurantService.getRestaurantPhoto(restaurant.id).subscribe(photoResponse => {
            restaurant.photoUrl = photoResponse.url;
          })
        })
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
