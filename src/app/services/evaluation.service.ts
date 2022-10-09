import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Evaluation, Note} from "../dtos/responses/evaluation.dto";
import {environment} from "../../environments/environment";
import {AddEvaluationDto} from "../dtos/requests/add-evaluation.dto";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private httpClient: HttpClient) {
  }

  public addEvaluation(restaurantId: number, evaluateur: string, commentaire: string, note: Note): Observable<Evaluation> {

    const body: AddEvaluationDto = {
      evaluateur,
      commentaire,
      note
    }

    return this.httpClient.post<Evaluation>(`${environment.backendUrl}/restaurants/${restaurantId}/evaluations`, body);
  }

  public deleteEvaluation(restaurantId: number, evaluationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.backendUrl}/restaurants/${restaurantId}/evaluations/${evaluationId}`);
  }

}
