import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { IPort, Port } from './port.model';
import { PortService } from './port.service';
import { ITEMS_PER_PAGE, KEY_CODE_ENTER, KEY_CODE_ESC } from 'app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-port',
    templateUrl: './port.component.html'
})
export class PortComponent implements OnInit, OnDestroy {
    defaultURL: string;
    port: IPort;
    ports: IPort[];
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    predicate: any;
    links: any;
    totalItems: any;
    queryCount: any;
    routeSub: Subscription;
    searchPortSubscription: Subscription;
    portSubscription: Subscription;

    constructor(
        private portService: PortService,
        private jhiAlertService: JhiAlertService,
        private portEventManager: JhiEventManager,
        private route: ActivatedRoute,
        private router: Router,
        private parseLinks: JhiParseLinks
    ) {
        this.port = new Port();
        this.ports = [];
        this.defaultURL = this.router.url;
        this.defaultURL = this.defaultURL.split('?')[0];
    }

    ngOnInit() {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeSub = this.route.data.subscribe((data: any) => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.port.portCode = data.pagingParams.portCode;
            this.port.portName = data.pagingParams.portName;
        });
        this.searchPort();
        this.registerChangeInPorts();
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
        if (this.searchPortSubscription) {
            this.searchPortSubscription.unsubscribe();
        }
        if (this.portSubscription) {
            this.portEventManager.destroy(this.portSubscription);
        }
    }

    registerChangeInPorts() {
        this.portSubscription = this.portEventManager.subscribe('portListModification', (res: any) => this.searchPort());
    }

    modifyURL() {
        this.router.navigate([this.defaultURL], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                portCode: this.port.portCode,
                portName: this.port.portName
            }
        });
    }

    transition() {
        this.searchPort();
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    criteria() {
        const result = {
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        };
        if (this.port.portCode && this.port.portCode.length > 0) {
            result['portCode.equals'] = this.port.portCode;
        }
        if (this.port.portName && this.port.portName.length > 0) {
            result['portName.contains'] = this.port.portName;
        }
        return result;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data: any, headers: any) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.ports = data;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    searchPort() {
        this.modifyURL();
        this.searchPortSubscription = this.portService
            .query(this.criteria())
            .subscribe(
                (res: HttpResponse<IPort[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res)
            );
    }

    resetPage() {
        this.page = 0;
    }

    clear() {
        this.port = new Port();
        this.page = 0;
        this.predicate = 'id';
        this.searchPort();
    }

    searchKeyup($event) {
        if ($event.keyCode === KEY_CODE_ENTER) {
            this.resetPage();
            this.searchPort();
        }
        if ($event.keyCode === KEY_CODE_ESC) {
            this.clear();
        }
    }
}
