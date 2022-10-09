export interface Evaluation {

  id: number;
  evaluateur: string;
  commentaire: string;
  note: Note

}

export type Note = 0 | 1 | 2 | 3;
