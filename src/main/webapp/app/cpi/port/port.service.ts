import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { IPort } from './port.model';
import { createRequestOption, optionMax } from 'app/shared';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<IPort>;

@Injectable({ providedIn: 'root' })
export class PortService {
  private resourceUrl = SERVER_API_URL + 'cpicommunication/api/ports';

  constructor(private http: HttpClient) {}

  create(port: IPort): Observable<EntityResponseType> {
    const copy = this.convert(port);
    return this.http
      .post<IPort>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  update(port: IPort): Observable<EntityResponseType> {
    const copy = this.convert(port);
    return this.http
      .put<IPort>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPort>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
  }

  query(req?: any): Observable<HttpResponse<IPort[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<IPort[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<IPort[]>) => this.convertArrayResponse(res)));
  }

  queryIdByCodeOrName(portCode?: string, portName?: string, countryIds?: number[], sort?: any): Observable<HttpResponse<number[]>> {
    const _params = {};
    if (portCode && portCode.length > 0) {
      _params['portCode.contains'] = portCode;
    }
    if (portName && portName.length > 0) {
      _params['portName.contains'] = portName;
    }
    if (countryIds && countryIds.length > 0) {
      _params['countryId.in'] = countryIds;
    }
    if (sort && sort.length > 0) {
      _params['sort'] = sort;
    }
    const options = optionMax(_params);
    return this.http
      .get<IPort[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<IPort[]>) => this.convertIdArrayFromServer(res)));
  }

  queryByCountry(countryId?: number, req?: any): Observable<HttpResponse<IPort[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<IPort[]>(`${this.resourceUrl}/country/${countryId}`, { params: options, observe: 'response' })
      .pipe(map((res: HttpResponse<IPort[]>) => this.convertArrayResponse(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  private convertResponse(res: EntityResponseType): EntityResponseType {
    const body: IPort = this.convertItemFromServer(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: HttpResponse<IPort[]>): HttpResponse<IPort[]> {
    const jsonResponse: IPort[] = res.body;
    const body: IPort[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convertItemFromServer(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object to Port.
   */
  private convertItemFromServer(port: IPort): IPort {
    const copy: IPort = Object.assign({}, port);
    return copy;
  }

  /**
   * Convert a Port to a JSON which can be sent to the server.
   */
  private convert(port: IPort): IPort {
    const copy: IPort = Object.assign({}, port);
    return copy;
  }

  private convertIdArrayFromServer(res: HttpResponse<IPort[]>): HttpResponse<number[]> {
    const jsonResponse: IPort[] = res.body;
    const body: number[] = [];
    jsonResponse.forEach(port => {
      body.push(port.id);
    });
    return res.clone({ body });
  }
}
