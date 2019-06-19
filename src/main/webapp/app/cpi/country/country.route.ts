import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import {
    CountryComponent,
    CountryDetailComponent,
    CountryEditComponent,
    CountryDeletePopupComponent,
    CountrySelectPopupComponent
} from './';

@Injectable({ providedIn: 'root' })
export class CountryResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const _page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const _sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        const _countryName = route.queryParams['countryName'] ? route.queryParams['countryName'] : null;
        const _countryNameChinese = route.queryParams['countryNameChinese'] ? route.queryParams['countryNameChinese'] : null;
        const _countryNameAbbr = route.queryParams['countryNameAbbr'] ? route.queryParams['countryNameAbbr'] : null;
        const _dialCode = route.queryParams['dialCode'] ? route.queryParams['dialCode'] : null;
        return {
            page: this.paginationUtil.parsePage(_page),
            predicate: this.paginationUtil.parsePredicate(_sort),
            ascending: this.paginationUtil.parseAscending(_sort),
            countryName: _countryName,
            countryNameChinese: _countryNameChinese,
            countryNameAbbr: _countryNameAbbr,
            dialCode: _dialCode
        };
    }
}

export const countryRoute: Routes = [
    {
        path: 'country',
        component: CountryComponent,
        resolve: {
            pagingParams: CountryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country/:id',
        component: CountryDetailComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country-new',
        component: CountryEditComponent,
        resolve: {
            selectCountryPagingParams: CountryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'country/:id/edit',
        component: CountryEditComponent,
        resolve: {
            selectCountryPagingParams: CountryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryPopupRoute: Routes = [
    {
        path: 'country/:id/delete',
        component: CountryDeletePopupComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-select',
        component: CountrySelectPopupComponent,
        data: {
            authorities: ['ROLE_COMMUNICATION'],
            pageTitle: 'cpigatewayApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
