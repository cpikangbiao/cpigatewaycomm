import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from 'app/app.constants';
import { ICountry } from './country.model';
import { createRequestOption } from 'app/shared';
import { map } from 'rxjs/operators';

export type EntityResponseType = HttpResponse<ICountry>;

@Injectable()
export class CountryService {
    private resourceUrl = SERVER_API_URL + 'cpicommunication/api/countries';

    constructor(private http: HttpClient) {}

    create(country: ICountry): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http
            .post<ICountry>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    update(country: ICountry): Observable<EntityResponseType> {
        const copy = this.convert(country);
        return this.http
            .put<ICountry>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICountry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertResponse(res)));
    }

    query(req?: any): Observable<HttpResponse<ICountry[]>> {
        const options = createRequestOption(req);
        return this.http
            .get<ICountry[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<ICountry[]>) => this.convertArrayResponse(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findall(): Observable<HttpResponse<ICountry[]>> {
        const req = {
            page: 0,
            size: 1000
        };
        const options = createRequestOption(req);
        return this.http
            .get<ICountry[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<ICountry[]>) => this.convertArrayResponse(res)));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ICountry = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<ICountry[]>): HttpResponse<ICountry[]> {
        const jsonResponse: ICountry[] = res.body;
        const body: ICountry[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to ICountry.
     */
    private convertItemFromServer(country: ICountry): ICountry {
        const copy: ICountry = Object.assign({}, country);
        return copy;
    }

    /**
     * Convert a ICountry to a JSON which can be sent to the server.
     */
    private convert(country: ICountry): ICountry {
        const copy: ICountry = Object.assign({}, country);
        return copy;
    }
}
