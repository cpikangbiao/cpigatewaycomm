import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { Port } from './port.model';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<Port>;

@Injectable()
export class PortService {
    private resourceUrl = SERVER_API_URL + 'cpicommunication/api/ports';

    constructor(private http: HttpClient) {}

    create(port: Port): Observable<EntityResponseType> {
        const copy = this.convert(port);
        return this.http
            .post<Port>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    update(port: Port): Observable<EntityResponseType> {
        const copy = this.convert(port);
        return this.http
            .put<Port>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<Port>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    query(req?: any): Observable<HttpResponse<Port[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Port[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<Port[]>) => this.convertArrayResponse(res)));
    }

    queryByCountry(countryId?: number, req?: any): Observable<HttpResponse<Port[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<Port[]>(`${this.resourceUrl}/country/${countryId}`, { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<Port[]>) => this.convertArrayResponse(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Port = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<Port[]>): HttpResponse<Port[]> {
        const jsonResponse: Port[] = res.body;
        const body: Port[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to Port.
     */
    private convertItemFromServer(port: Port): Port {
        const copy: Port = Object.assign({}, port);
        return copy;
    }

    /**
     * Convert a Port to a JSON which can be sent to the server.
     */
    private convert(port: Port): Port {
        const copy: Port = Object.assign({}, port);
        return copy;
    }
}
