import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Evaluation} from "../../models/responses/evaluation.dto";

@Component({
  selector: 'app-evaluation-table',
  templateUrl: './evaluation-table.component.html',
  styleUrls: ['./evaluation-table.component.css']
})
export class EvaluationTableComponent {

  @Input()
  public evaluations?: Evaluation[];

  @Output()
  public evaluationDeleted: EventEmitter<Evaluation> = new EventEmitter<Evaluation>();

  constructor() { }

  public onEvaluationDeleted(evaluation: Evaluation): void {
    this.evaluationDeleted.emit(evaluation);
  }

}
