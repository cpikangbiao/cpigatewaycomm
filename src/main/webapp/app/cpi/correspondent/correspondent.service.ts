import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';

import { Correspondent } from './correspondent.model';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/internal/operators';

export type EntityResponseType = HttpResponse<Correspondent>;

@Injectable({ providedIn: 'root' })
export class CorrespondentService {
  private resourceUrl = SERVER_API_URL + 'cpicommunication/api/correspondents';

  constructor(private http: HttpClient) {}

  create(correspondent: Correspondent): Observable<EntityResponseType> {
    const copy = this.convert(correspondent);
    return this.http
      .post<Correspondent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  update(correspondent: Correspondent): Observable<EntityResponseType> {
    const copy = this.convert(correspondent);
    return this.http
      .put<Correspondent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<Correspondent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  query(req?: any): Observable<HttpResponse<Correspondent[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<Correspondent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<Correspondent[]>) => this.convertArrayResponse(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: Correspondent = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: HttpResponse<Correspondent[]>): HttpResponse<Correspondent[]> {
    const jsonResponse: Correspondent[] = res.body;
    const body: Correspondent[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to Correspondent.
   */
  private convertItemFromServer(correspondent: Correspondent): Correspondent {
    const copy: Correspondent = Object.assign({}, correspondent);
    return copy;
  }

  /**
   * Convert a Correspondent to a JSON which can be sent to the server.
   */
  private convert(correspondent: Correspondent): Correspondent {
    const copy: Correspondent = Object.assign({}, correspondent);
    return copy;
  }

  createCorrespondentBookPDF() {
    window.open(`${this.resourceUrl}/book/pdf`, '_blank');
  }

  createCorrespondentBookExcel() {
    window.open(`${this.resourceUrl}/book/excel`, '_blank');
  }

  createCorrespondentBookWord() {
    window.open(`${this.resourceUrl}/book/word`, '_blank');
  }
}
