import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IPort, Port } from './port.model';
import { PortService } from './port.service';
import { ITEMS_PER_PAGE_SMALL } from 'app/shared';
import { ActivatedRoute } from '@angular/router';
import { PortSelectPopupService } from './port-select.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-port-select',
    templateUrl: './port-select.component.html'
})
export class PortSelectComponent implements OnInit, OnDestroy {
    selectPortPagingParams: any;
    port: IPort;
    ports: IPort[];
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    predicate: any;
    totalItems: any;
    queryCount: any;
    searchPortSubscription: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private portService: PortService,
        private jhiAlertService: JhiAlertService
    ) {
        this.port = new Port();
        this.ports = [];
    }

    ngOnInit() {
        this.itemsPerPage = ITEMS_PER_PAGE_SMALL;
        this.page = this.selectPortPagingParams.page;
        this.previousPage = this.selectPortPagingParams.page;
        this.reverse = this.selectPortPagingParams.ascending;
        this.predicate = this.selectPortPagingParams.predicate;
        this.port.portCode = this.selectPortPagingParams.portCode;
        this.port.portName = this.selectPortPagingParams.portName;
        this.port.portNameChinese = this.selectPortPagingParams.portNameChinese;
        this.port.countryCountryName = this.selectPortPagingParams.countryCountryName;
        this.searchPort();
    }

    ngOnDestroy() {
        this.searchPortSubscription.unsubscribe();
    }

    trackId(index: number, item: IPort) {
        return item.id;
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
            result['portCode.contains'] = this.port.portCode;
        }
        if (this.port.portName && this.port.portName.length > 0) {
            result['portName.contains'] = this.port.portName;
        }
        if (this.port.portNameChinese && this.port.portNameChinese.length > 0) {
            result['portNameChinese.contains'] = this.port.portNameChinese;
        }
        if (this.port.countryCountryName && this.port.countryCountryName.length > 0) {
            result['countryCountryName.contains'] = this.port.countryCountryName;
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

    private onSuccess(data, headers) {
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.ports = data;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    searchPort() {
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

    selectPort(port: any) {
        this.eventManager.broadcast({
            name: 'selectPort',
            content: port
        });
        this.activeModal.close('cancel');
    }

    searchKeyup($event) {
        if ($event.keyCode === 13) {
            this.resetPage();
            this.searchPort();
        }
        if ($event.keyCode === 27) {
            this.clear();
        }
    }
}

@Component({
    selector: 'jhi-port-select-popup',
    template: ''
})
export class PortSelectPopupComponent implements OnInit, OnDestroy {
    routeSub: Subscription;

    constructor(private route: ActivatedRoute, private portSelectPopupService: PortSelectPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.data.subscribe((data: any) => {
            this.portSelectPopupService.open(data.selectPortPagingParams);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
