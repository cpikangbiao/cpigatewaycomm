import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'src/main/webapp/app/core/index';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CorrespondentContact } from 'app/shared/model/cpicommunication/correspondent-contact.model';
import { CorrespondentContactService } from './correspondent-contact.service';
import { CorrespondentContactComponent } from './correspondent-contact.component';
import { CorrespondentContactDetailComponent } from './correspondent-contact-detail.component';
import { CorrespondentContactUpdateComponent } from './correspondent-contact-update.component';
import { CorrespondentContactDeletePopupComponent } from './correspondent-contact-delete-dialog.component';
import { ICorrespondentContact } from 'app/shared/model/cpicommunication/correspondent-contact.model';

@Injectable({ providedIn: 'root' })
export class CorrespondentContactResolve implements Resolve<ICorrespondentContact> {
    constructor(private service: CorrespondentContactService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((correspondentContact: HttpResponse<CorrespondentContact>) => correspondentContact.body));
        }
        return of(new CorrespondentContact());
    }
}

export const correspondentContactRoute: Routes = [
    {
        path: 'correspondent-contact',
        component: CorrespondentContactComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent-contact/:id/view',
        component: CorrespondentContactDetailComponent,
        resolve: {
            correspondentContact: CorrespondentContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent-contact/new',
        component: CorrespondentContactUpdateComponent,
        resolve: {
            correspondentContact: CorrespondentContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'correspondent-contact/:id/edit',
        component: CorrespondentContactUpdateComponent,
        resolve: {
            correspondentContact: CorrespondentContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondentContact.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const correspondentContactPopupRoute: Routes = [
    {
        path: 'correspondent-contact/:id/delete',
        component: CorrespondentContactDeletePopupComponent,
        resolve: {
            correspondentContact: CorrespondentContactResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationCorrespondentContact.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
