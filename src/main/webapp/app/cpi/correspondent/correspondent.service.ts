import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'src/main/webapp/app/shared/index';
import { ICorrespondent } from 'app/shared/model/cpicommunication/correspondent.model';

type EntityResponseType = HttpResponse<ICorrespondent>;
type EntityArrayResponseType = HttpResponse<ICorrespondent[]>;

@Injectable({ providedIn: 'root' })
export class CorrespondentService {
    private resourceUrl = SERVER_API_URL + 'cpicommunication/api/correspondents';

    constructor(private http: HttpClient) {}

    create(correspondent: ICorrespondent): Observable<EntityResponseType> {
        return this.http.post<ICorrespondent>(this.resourceUrl, correspondent, { observe: 'response' });
    }

    update(correspondent: ICorrespondent): Observable<EntityResponseType> {
        return this.http.put<ICorrespondent>(this.resourceUrl, correspondent, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICorrespondent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICorrespondent[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
