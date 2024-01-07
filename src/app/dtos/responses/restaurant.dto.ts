import {Evaluation} from "./evaluation.dto";

export interface Restaurant {

  id: number;
  nom: string;
  adresse: string;
  evaluations: Evaluation[];
  moyenne: number;
  photoUrl?: string;

}
