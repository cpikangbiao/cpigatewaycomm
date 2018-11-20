import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import {
    CorrespondentComponent,
    CorrespondentDetailComponent,
    CorrespondentEditComponent,
    CorrespondentDeletePopupComponent,
    CorrespondentSelectPopupComponent
} from './';

@Injectable()
export class CorrespondentResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        const _correspondentName = route.queryParams['correspondentName'] ? route.queryParams['correspondentName'] : null;
        const _portName = route.queryParams['portName'] ? route.queryParams['portName'] : null;
        const _countryName = route.queryParams['countryName'] ? route.queryParams['countryName'] : null;
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort),
            correspondentName: _correspondentName,
            portName: _portName,
            countryName: _countryName
        };
    }
}

export const correspondentRoute: Routes = [
    {
        path: 'correspondent',
        component: CorrespondentComponent,
        resolve: {
            pagingParams: CorrespondentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent/:id',
        component: CorrespondentDetailComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent-new',
        component: CorrespondentEditComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent/:id/edit',
        component: CorrespondentEditComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const correspondentPopupRoute: Routes = [
    {
        path: 'correspondent/:id/delete',
        component: CorrespondentDeletePopupComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'correspondent-select',
        component: CorrespondentSelectPopupComponent,
        resolve: {
            selectCorrespondentPagingParams: CorrespondentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
