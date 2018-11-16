import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { PortComponent, PortDetailComponent, PortEditComponent, PortDeletePopupComponent, PortSelectPopupComponent } from './';

@Injectable()
export class PortResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const _page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const _sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        const _portCode = route.queryParams['portCode'] ? route.queryParams['portCode'] : null;
        const _portName = route.queryParams['portName'] ? route.queryParams['portName'] : null;
        const _portNameChinese = route.queryParams['portNameChinese'] ? route.queryParams['portNameChinese'] : null;
        const _countryCountryName = route.queryParams['countryCountryName'] ? route.queryParams['countryCountryName'] : null;
        const _countryId = route.queryParams['countryId'] ? route.queryParams['countryId'] : null;
        return {
            page: this.paginationUtil.parsePage(_page),
            predicate: this.paginationUtil.parsePredicate(_sort),
            ascending: this.paginationUtil.parseAscending(_sort),
            portCode: _portCode,
            portName: _portName,
            portNameChinese: _portNameChinese,
            countryCountryName: _countryCountryName,
            countryId: _countryId
        };
    }
}

export const portRoute: Routes = [
    {
        path: 'port',
        component: PortComponent,
        resolve: {
            pagingParams: PortResolvePagingParams
        },
        data: {
            authorities: ['ROLE_COMMON'],
            pageTitle: 'cpigatewayApp.port.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'port/:id',
        component: PortDetailComponent,
        data: {
            authorities: ['ROLE_COMMON'],
            pageTitle: 'cpigatewayApp.port.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'port-new',
        component: PortEditComponent,
        data: {
            authorities: ['ROLE_COMMON'],
            pageTitle: 'cpigatewayApp.port.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'port-new/:countryId',
        component: PortEditComponent,
        data: {
            authorities: ['ROLE_COMMON'],
            pageTitle: 'cpigatewayApp.port.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'port/:id/edit',
        component: PortEditComponent,
        data: {
            authorities: ['ROLE_COMMON'],
            pageTitle: 'cpigatewayApp.port.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const portPopupRoute: Routes = [
    {
        path: 'port/:id/delete',
        component: PortDeletePopupComponent,
        data: {
            authorities: ['ROLE_COMMON'],
            pageTitle: 'cpigatewayApp.port.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'port-select',
        component: PortSelectPopupComponent,
        data: {
            authorities: ['ROLE_COMMON'],
            pageTitle: 'cpigatewayApp.port.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
