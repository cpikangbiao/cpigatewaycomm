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
        const correspondentName = route.queryParams['correspondentName'] ? route.queryParams['correspondentName'] : null;
        const faxNumber = route.queryParams['faxNumber'] ? route.queryParams['faxNumber'] : null;
        const address = route.queryParams['address'] ? route.queryParams['address'] : null;
        const telephoneOffice = route.queryParams['telephoneOffice'] ? route.queryParams['telephoneOffice'] : null;
        const telephoneAlternate = route.queryParams['telephoneAlternate'] ? route.queryParams['telephoneAlternate'] : null;
        const webSite = route.queryParams['webSite'] ? route.queryParams['webSite'] : null;
        const portPortName = route.queryParams['portPortName'] ? route.queryParams['portPortName'] : null;
        const portId = route.queryParams['portId'] ? route.queryParams['portId'] : null;
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort),
            correspondentName: correspondentName,
            faxNumber: faxNumber,
            address: address,
            telephoneOffice: telephoneOffice,
            telephoneAlternate: telephoneAlternate,
            webSite: webSite,
            portPortName: portPortName,
            portId: portId
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
