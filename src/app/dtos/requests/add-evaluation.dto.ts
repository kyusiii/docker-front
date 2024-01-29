import {Note} from "../responses/evaluation.dto";

export interface AddEvaluationDto {
  evaluateur: string;
  commentaire: string;
  note: Note
}
