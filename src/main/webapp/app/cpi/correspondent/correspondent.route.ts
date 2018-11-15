import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'src/main/webapp/app/core/index';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Correspondent } from 'app/shared/model/cpicommunication/correspondent.model';
import { CorrespondentService } from './correspondent.service';
import { CorrespondentComponent } from './correspondent.component';
import { CorrespondentDetailComponent } from './correspondent-detail.component';
import { CorrespondentUpdateComponent } from './correspondent-update.component';
import { CorrespondentDeletePopupComponent } from './correspondent-delete-dialog.component';
import { ICorrespondent } from 'app/shared/model/cpicommunication/correspondent.model';

@Injectable({ providedIn: 'root' })
export class CorrespondentResolve implements Resolve<ICorrespondent> {
    constructor(private service: CorrespondentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((correspondent: HttpResponse<Correspondent>) => correspondent.body));
        }
        return of(new Correspondent());
    }
}

export const correspondentRoute: Routes = [
    {
        path: 'correspondent',
        component: CorrespondentComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent/:id/view',
        component: CorrespondentDetailComponent,
        resolve: {
            correspondent: CorrespondentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent/new',
        component: CorrespondentUpdateComponent,
        resolve: {
            correspondent: CorrespondentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent/:id/edit',
        component: CorrespondentUpdateComponent,
        resolve: {
            correspondent: CorrespondentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const correspondentPopupRoute: Routes = [
    {
        path: 'correspondent/:id/delete',
        component: CorrespondentDeletePopupComponent,
        resolve: {
            correspondent: CorrespondentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
