import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Restaurant} from "../../models/responses/restaurant.dto";
import {NgForm} from "@angular/forms";
import {RestaurantFormModel} from "../../models/restaurant-form.model";

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnChanges {

  @Input()
  public restaurant?: Restaurant;

  @Output()
  public emitted: EventEmitter<RestaurantFormModel> = new EventEmitter<RestaurantFormModel>();

  public nomInput: string = "";
  public adresseInput: string = "";
  public idInput: number = -1;

  constructor() {
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.emitted.emit({id: this.idInput, nom: this.nomInput, adresse: this.adresseInput})
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.restaurant) {
      this.nomInput = this.restaurant.nom;
      this.adresseInput = this.restaurant.adresse
      this.idInput = this.restaurant.id
    } else {
      this.idInput = -1;
      this.nomInput = "";
      this.adresseInput = "";
    }
  }

}
