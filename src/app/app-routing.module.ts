import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantsPageComponent} from "./pages/restaurants-page/restaurants-page.component";
import {RestaurantDetailsComponent} from "./pages/restaurant-details/restaurant-details.component";

const routes: Routes = [
  {path: '', redirectTo: '/restaurants', pathMatch: "full"},
  {path: 'restaurants', component: RestaurantsPageComponent},
  {path: 'restaurants/:id', component: RestaurantDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
