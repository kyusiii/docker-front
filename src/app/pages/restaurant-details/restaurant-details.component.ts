import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Restaurant} from "../../models/responses/restaurant.dto";
import {RestaurantService} from "../../services/restaurant.service";
import {Evaluation} from "../../models/responses/evaluation.dto";
import {RestaurantFormModel} from "../../models/restaurant-form.model";
import {EvaluationService} from "../../services/evaluation.service";
import {EvaluationFormModel} from "../../models/evaluation-form.model";

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  public hasIdAnError: boolean = false;
  public restaurantDoesNotExist: boolean = false;

  public restaurant?: Restaurant;

  public evaluationToEdit?: Evaluation;

  constructor(private activatedRoute: ActivatedRoute,
              private restaurantService: RestaurantService,
              private evaluationService: EvaluationService) {
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(value => {
      const newId = parseInt(value['id']);
      if (newId) {
        this.hasIdAnError = false;
        this.restaurantService.getRestaurantById(newId).subscribe(
          {
            next: restaurant => {
              this.restaurant = restaurant;
              this.restaurantDoesNotExist = false;
            },
            error: _ => {
              this.restaurant = undefined;
              this.restaurantDoesNotExist = true;
            }
          });
      } else {
        this.hasIdAnError = true;
        this.restaurant = undefined;
      }
    });
  }

  public addEvaluation(nouvelleEvaluation: EvaluationFormModel): void {
    if (this.restaurant) {
      this.evaluationService.addEvaluation(this.restaurant.id, nouvelleEvaluation.evaluateur, nouvelleEvaluation.commentaire, nouvelleEvaluation.note).subscribe({
        next: value => {
          if (this.restaurant) {
            this.restaurant.evaluations.push(value);
          }
        }
      });
    }
  }

  public deleteEvaluation(evaluationToDelete: Evaluation): void {
    if (this.restaurant) {
      this.evaluationService.deleteEvaluation(this.restaurant.id, evaluationToDelete.id).subscribe({
        next: value => {
          if (this.restaurant) {
            this.restaurant.evaluations = this.restaurant.evaluations.filter(evaluation => evaluation.id !== evaluationToDelete.id);
          }
        }
      });
    }
  }

  public updateRestaurant(restaurant: RestaurantFormModel): void {
    this.restaurantService.updateRestaurant(restaurant.id, restaurant.nom, restaurant.adresse).subscribe({
      next: value => {
        if (this.restaurant) {
          this.restaurant.nom = value.nom;
          this.restaurant.adresse = value.adresse;
        }
      }
    });
  }

}
