import {Component, EventEmitter, Output} from '@angular/core';
import {EvaluationFormModel} from "../../models/evaluation-form.model";
import {NgForm} from "@angular/forms";
import {Note} from "../../models/responses/evaluation.dto";

@Component({
  selector: 'app-evaluation-form',
  templateUrl: './evaluation-form.component.html',
  styleUrls: ['./evaluation-form.component.css']
})
export class EvaluationFormComponent {

  @Output()
  public emitted: EventEmitter<EvaluationFormModel> = new EventEmitter<EvaluationFormModel>();

  public evaluateurInput: string = "";
  public commentaireInput: string = "";
  public noteInput: Note = 0;

  constructor() {
  }

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.emitted.emit({
        evaluateur: this.evaluateurInput,
        commentaire: this.commentaireInput,
        note: this.noteInput
      });
    }
  }

}
