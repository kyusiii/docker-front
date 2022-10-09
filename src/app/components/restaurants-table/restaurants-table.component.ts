import {Component, Input} from '@angular/core';
import {Restaurant} from "../../dtos/responses/restaurant.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurants-table',
  templateUrl: './restaurants-table.component.html',
  styleUrls: ['./restaurants-table.component.css']
})
export class RestaurantsTableComponent {

  @Input()
  public restaurants?: Restaurant[];

  constructor(private router: Router) {
  }

  public goToRestaurantDetail(restaurant: Restaurant): void {
    this.router.navigate([`/restaurants/${restaurant.id}`])
  }

}
