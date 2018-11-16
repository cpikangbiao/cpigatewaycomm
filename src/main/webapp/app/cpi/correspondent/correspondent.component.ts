import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Correspondent } from './correspondent.model';
import { CorrespondentService } from './correspondent.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-correspondent',
    templateUrl: './correspondent.component.html'
})
export class CorrespondentComponent implements OnInit, OnDestroy {
    defaultURL: string;
    correspondent: Correspondent;
    correspondents: Correspondent[];
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    predicate: any;
    totalItems: any;
    queryCount: any;
    routeSub: Subscription;
    searchCorrespondentSubscription: Subscription;
    correspondentSubscription: Subscription;

    constructor(
        private correspondentService: CorrespondentService,
        private jhiAlertService: JhiAlertService,
        private correspondentEventManager: JhiEventManager,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.correspondent = new Correspondent();
        this.correspondents = [];
        this.defaultURL = this.router.url;
        this.defaultURL = this.defaultURL.split('?')[0];
    }

    ngOnInit() {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeSub = this.route.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            this.correspondent.correspondentName = data.pagingParams.correspondentName;
        });
        this.searchCorrespondent();
        this.registerChangeInCorrespondents();
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
        if (this.searchCorrespondentSubscription) {
            this.searchCorrespondentSubscription.unsubscribe();
        }
        if (this.correspondentEventManager) {
            this.correspondentEventManager.destroy(this.correspondentSubscription);
        }
    }

    registerChangeInCorrespondents() {
        this.correspondentSubscription = this.correspondentEventManager.subscribe('correspondentListModification', () =>
            this.searchCorrespondent()
        );
    }

    trackId(index: number, item: Correspondent) {
        return item.id;
    }

    modifyURL() {
        this.router.navigate([this.defaultURL], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                correspondentName: this.correspondent.correspondentName
            }
        });
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
        this.modifyURL();
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

    searchKeyup($event) {
        if ($event.keyCode === 13) {
            this.resetPage();
            this.searchCorrespondent();
        }
        if ($event.keyCode === 27) {
            this.clear();
        }
    }
}
