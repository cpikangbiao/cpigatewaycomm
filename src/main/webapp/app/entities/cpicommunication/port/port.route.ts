import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Port } from 'app/shared/model/cpicommunication/port.model';
import { PortService } from './port.service';
import { PortComponent } from './port.component';
import { PortDetailComponent } from './port-detail.component';
import { PortUpdateComponent } from './port-update.component';
import { PortDeletePopupComponent } from './port-delete-dialog.component';
import { IPort } from 'app/shared/model/cpicommunication/port.model';

@Injectable({ providedIn: 'root' })
export class PortResolve implements Resolve<IPort> {
    constructor(private service: PortService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((port: HttpResponse<Port>) => port.body));
        }
        return of(new Port());
    }
}

export const portRoute: Routes = [
    {
        path: 'port',
        component: PortComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'cpigatewaycommApp.cpicommunicationPort.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'port/:id/view',
        component: PortDetailComponent,
        resolve: {
            port: PortResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationPort.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'port/new',
        component: PortUpdateComponent,
        resolve: {
            port: PortResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationPort.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'port/:id/edit',
        component: PortUpdateComponent,
        resolve: {
            port: PortResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationPort.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const portPopupRoute: Routes = [
    {
        path: 'port/:id/delete',
        component: PortDeletePopupComponent,
        resolve: {
            port: PortResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cpigatewaycommApp.cpicommunicationPort.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
