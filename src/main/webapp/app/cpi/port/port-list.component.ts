import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IPort } from './port.model';
import { PortService } from './port.service';
import { ITEMS_PER_PAGE_LIST } from 'app/shared';
import { Principal } from 'app/core';

@Component({
    selector: 'jhi-port-list',
    templateUrl: './port-list.component.html'
})
export class PortListComponent implements OnInit, OnDestroy {
    @Input() countryId: number;

    currentAccount: any;
    ports: IPort[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    activateRouteParamsSubscriber: Subscription;
    activateRouteDataSubscriber: Subscription;

    defaultURL: string;

    constructor(
        private portService: PortService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private router: Router,
        private eventManager: JhiEventManager,
        // private countryService: CountryService,
        private activatedRoute: ActivatedRoute
    ) {
        this.defaultURL = this.router.url;
        this.activateRouteParamsSubscriber = this.activatedRoute.params.subscribe((params: any) => {
            this.countryId = params.id;
        });
        this.activateRouteDataSubscriber = this.activatedRoute.data.subscribe((data: any) => {
            this.itemsPerPage = ITEMS_PER_PAGE_LIST;
            this.page = data.portListPagingParams.page;
            this.previousPage = data.portListPagingParams.page;
            this.reverse = data.portListPagingParams.ascending;
            this.predicate = data.portListPagingParams.predicate;
        });
        // this.countryId = 1;

        this.loadAll();
    }

    loadAll() {
        this.portService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                'countryId.equals': this.countryId
            })
            .subscribe(
                (res: HttpResponse<IPort[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate([this.defaultURL], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                'countryId.equals': this.countryId
            }
        });
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account: any) => {
            this.currentAccount = account;
        });
        this.registerChangeInPorts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.activateRouteParamsSubscriber.unsubscribe();
        this.activateRouteDataSubscriber.unsubscribe();
    }

    registerChangeInPorts() {
        this.eventSubscriber = this.eventManager.subscribe('portListModification', (response: any) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.ports = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
