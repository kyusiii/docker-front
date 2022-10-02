import {Note} from "./responses/evaluation.dto";

export interface EvaluationFormModel {
  evaluateur: string;
  commentaire: string;
  note: Note;
}
