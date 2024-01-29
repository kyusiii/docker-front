import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RestaurantsPageComponent} from './pages/restaurants-page/restaurants-page.component';
import {RestaurantDetailsComponent} from './pages/restaurant-details/restaurant-details.component';
import {EvaluationTableComponent} from './components/evaluation-table/evaluation-table.component';
import {EvaluationFormComponent} from './components/evaluation-form/evaluation-form.component';
import {HttpClientModule} from "@angular/common/http";
import {RestaurantsTableComponent} from './components/restaurants-table/restaurants-table.component';
import {RestaurantFormComponent} from './components/restaurant-form/restaurant-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MoyenneColorationDirective} from './directives/moyenne-coloration.directive';
import {ImageFormComponent} from "./components/image-form/image-form.component";

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsPageComponent,
    RestaurantDetailsComponent,
    EvaluationTableComponent,
    EvaluationTableComponent,
    EvaluationFormComponent,
    RestaurantsTableComponent,
    RestaurantFormComponent,
    MoyenneColorationDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ImageFormComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
