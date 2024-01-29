import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {concatMap, map, Observable} from "rxjs";
import {Evaluation, Note} from "../dtos/responses/evaluation.dto";
import {environment} from "../../environments/environment";
import {AddEvaluationDto} from "../dtos/requests/add-evaluation.dto";
import {GetS3UrlResponseDto} from "../dtos/responses/get-s3-url-response.dto";

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private httpClient: HttpClient) {
  }

  public addEvaluation(restaurantId: number, evaluateur: string, commentaire: string, note: Note, illustration: File): Observable<Evaluation> {

    const body: AddEvaluationDto = {
      evaluateur,
      commentaire,
      note
    }

    return this.httpClient.post<Evaluation>(`${environment.backendUrl}/restaurants/${restaurantId}/evaluations`, body)
      .pipe(
        concatMap(evaluation => {
          return this.putEvaluationIllustration(evaluation, restaurantId, illustration)
            .pipe(
              map(value => evaluation)
            )
        }));
  }

  public deleteEvaluation(restaurantId: number, evaluationId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.backendUrl}/restaurants/${restaurantId}/evaluations/${evaluationId}`);
  }

  public getEvaluationIllustration(restaurantId: number, evaluationId: number): Observable<GetS3UrlResponseDto> {
    return this.httpClient.get<GetS3UrlResponseDto>(`${environment.backendUrl}/restaurants/${restaurantId}/evaluations/${evaluationId}/illustration`);
  }

  public putEvaluationIllustration(evaluation: Evaluation, restaurantId: number, file: File): Observable<void> {
    return this.httpClient.put<GetS3UrlResponseDto>(`${environment.backendUrl}/restaurants/${restaurantId}/evaluations/${evaluation.id}/illustration`, {})
      .pipe(
        concatMap(uploadResponse => {
          return this.httpClient.put<void>(uploadResponse.url, file)
        })
      );
  }

}
