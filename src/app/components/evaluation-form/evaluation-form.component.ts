import {Component, EventEmitter, Output} from '@angular/core';
import {EvaluationFormModel} from "../../dtos/evaluation-form.model";
import {NgForm} from "@angular/forms";
import {Note} from "../../dtos/responses/evaluation.dto";

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
  public illustration?: File

  constructor() {
  }

  public onSubmit(form: NgForm): void {
    if (form.valid && this.illustration) {
      this.emitted.emit({
        evaluateur: this.evaluateurInput,
        commentaire: this.commentaireInput,
        note: this.noteInput,
        illustration: this.illustration
      });
    }
  }

  public onIllustrationChange(change: any): void {
    if (change && change.target && change.target.files) {
      this.illustration = change.target.files.item(0);
    }
  }

}
