import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Correspondent } from './correspondent.model';
import { CorrespondentService } from './correspondent.service';
import { ITEMS_PER_PAGE_LIST, KEY_CODE_ENTER, KEY_CODE_ESC } from 'app/shared';
import { ActivatedRoute } from '@angular/router';
import { CorrespondentSelectPopupService } from './correspondent-select.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-correspondent-select',
    templateUrl: './correspondent-select.component.html'
})
export class CorrespondentSelectComponent implements OnInit, OnDestroy {
    correspondent: Correspondent;
    correspondents: Correspondent[];
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    predicate: any;
    totalItems: any;
    queryCount: any;
    searchCorrespondentSubscription: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private correspondentService: CorrespondentService,
        private jhiAlertService: JhiAlertService
    ) {
        this.correspondent = new Correspondent();
        this.correspondents = [];
        this.itemsPerPage = ITEMS_PER_PAGE_LIST;
        this.page = 1;
        this.previousPage = 1;
        this.reverse = 'asc';
        this.predicate = 'id';
    }

    ngOnDestroy() {
        if (this.searchCorrespondentSubscription) {
            this.searchCorrespondentSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.searchCorrespondent();
    }

    transition() {
        this.searchCorrespondent();
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
        if (this.correspondent.correspondentName && this.correspondent.correspondentName.length > 0) {
            result['correspondentName.contains'] = this.correspondent.correspondentName;
        }
        if (this.correspondent.portPortName && this.correspondent.portPortName.length > 0) {
            result['portPortName.contains'] = this.correspondent.portPortName;
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
        this.correspondents = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    searchCorrespondent() {
        this.searchCorrespondentSubscription = this.correspondentService
            .query(this.criteria())
            .subscribe(
                (res: HttpResponse<Correspondent[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res)
            );
    }

    resetPage() {
        this.page = 0;
    }

    clear() {
        this.correspondent = new Correspondent();
        this.page = 0;
        this.predicate = 'id';
        this.searchCorrespondent();
    }

    selectCorrespondent(correspondent) {
        this.eventManager.broadcast({
            name: 'selectCorrespondent',
            content: correspondent
        });
        this.activeModal.close('cancel');
    }

    searchKeyup($event) {
        if ($event.keyCode === KEY_CODE_ENTER) {
            this.resetPage();
            this.searchCorrespondent();
        }
        if ($event.keyCode === KEY_CODE_ESC) {
            this.clear();
        }
    }
}

@Component({
    selector: 'jhi-correspondent-select-popup',
    template: ''
})
export class CorrespondentSelectPopupComponent implements OnInit {
    routeSub: Subscription;

    constructor(private route: ActivatedRoute, private correspondentSelectPopupService: CorrespondentSelectPopupService) {}

    ngOnInit() {
        setTimeout(() => {
            this.correspondentSelectPopupService.open();
        }, 0);
    }
}
