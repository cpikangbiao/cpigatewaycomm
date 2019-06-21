import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';

import { CorrespondentContact } from './correspondent-contact.model';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/internal/operators';

export type EntityResponseType = HttpResponse<CorrespondentContact>;

@Injectable({ providedIn: 'root' })
export class CorrespondentContactService {
  private resourceUrl = SERVER_API_URL + 'cpicommunication/api/correspondent-contacts';

  constructor(private http: HttpClient) {}

  create(correspondentContact: CorrespondentContact): Observable<EntityResponseType> {
    const copy = this.convert(correspondentContact);
    return this.http
      .post<CorrespondentContact>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  update(correspondentContact: CorrespondentContact): Observable<EntityResponseType> {
    const copy = this.convert(correspondentContact);
    return this.http
      .put<CorrespondentContact>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<CorrespondentContact>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  query(req?: any): Observable<HttpResponse<CorrespondentContact[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<CorrespondentContact[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<CorrespondentContact[]>) => this.convertArrayResponse(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: CorrespondentContact = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: HttpResponse<CorrespondentContact[]>): HttpResponse<CorrespondentContact[]> {
    const jsonResponse: CorrespondentContact[] = res.body;
    const body: CorrespondentContact[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to CorrespondentContact.
   */
  private convertItemFromServer(correspondentContact: CorrespondentContact): CorrespondentContact {
    const copy: CorrespondentContact = Object.assign({}, correspondentContact);
    return copy;
  }

  /**
   * Convert a CorrespondentContact to a JSON which can be sent to the server.
   */
  private convert(correspondentContact: CorrespondentContact): CorrespondentContact {
    const copy: CorrespondentContact = Object.assign({}, correspondentContact);
    return copy;
  }
}
