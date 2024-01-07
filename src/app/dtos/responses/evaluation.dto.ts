export interface Evaluation {

  id: number;
  evaluateur: string;
  commentaire: string;
  note: Note;
  illustrationUrl?: string;

}

export type Note = 0 | 1 | 2 | 3;
