import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICorrespondentContact } from 'app/shared/model/cpicommunication/correspondent-contact.model';

type EntityResponseType = HttpResponse<ICorrespondentContact>;
type EntityArrayResponseType = HttpResponse<ICorrespondentContact[]>;

@Injectable({ providedIn: 'root' })
export class CorrespondentContactService {
    private resourceUrl = SERVER_API_URL + 'cpicommunication/api/correspondent-contacts';

    constructor(private http: HttpClient) {}

    create(correspondentContact: ICorrespondentContact): Observable<EntityResponseType> {
        return this.http.post<ICorrespondentContact>(this.resourceUrl, correspondentContact, { observe: 'response' });
    }

    update(correspondentContact: ICorrespondentContact): Observable<EntityResponseType> {
        return this.http.put<ICorrespondentContact>(this.resourceUrl, correspondentContact, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICorrespondentContact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICorrespondentContact[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
