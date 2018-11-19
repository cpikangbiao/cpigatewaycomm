import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import {
    CorrespondentContactComponent,
    CorrespondentContactDetailComponent,
    CorrespondentContactEditComponent,
    CorrespondentContactDeletePopupComponent
} from './';

@Injectable()
export class CorrespondentContactResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        const _correspondentContactName = route.queryParams['correspondentContactName']
            ? route.queryParams['correspondentContactName']
            : null;
        const _telephoneOffice = route.queryParams['telephoneOffice'] ? route.queryParams['telephoneOffice'] : null;
        const _telephone = route.queryParams['telephone'] ? route.queryParams['telephone'] : null;
        const _eMail = route.queryParams['eMail'] ? route.queryParams['eMail'] : null;
        const _webSite = route.queryParams['webSite'] ? route.queryParams['webSite'] : null;
        const _correspondentId = route.queryParams['correspondentId'] ? route.queryParams['correspondentId'] : null;
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort),
            correspondentContactName: _correspondentContactName,
            telephoneOffice: _telephoneOffice,
            telephone: _telephone,
            eMail: _eMail,
            webSite: _webSite,
            correspondentId: _correspondentId
        };
    }
}

export const correspondentContactRoute: Routes = [
    {
        path: 'correspondent-contact',
        component: CorrespondentContactComponent,
        resolve: {
            pagingParams: CorrespondentContactResolvePagingParams
        },
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent-contact/:id',
        component: CorrespondentContactDetailComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent-contact-new/:correspondentId',
        component: CorrespondentContactEditComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent-contact-new',
        component: CorrespondentContactEditComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent-contact/:id/edit',
        component: CorrespondentContactEditComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const correspondentContactPopupRoute: Routes = [
    {
        path: 'correspondent-contact/:id/delete',
        component: CorrespondentContactDeletePopupComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.correspondentContact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
