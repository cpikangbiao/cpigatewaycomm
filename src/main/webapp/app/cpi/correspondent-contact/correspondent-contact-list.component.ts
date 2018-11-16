import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {CorrespondentContact} from './correspondent-contact.model';
import {CorrespondentContactService} from './correspondent-contact.service';
import {ITEMS_PER_PAGE_LIST} from 'app/shared';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-correspondent-contact-list',
    templateUrl: './correspondent-contact-list.component.html'
})
export class CorrespondentContactListComponent implements OnInit, OnDestroy {
    correspondentId: number;
    correspondentContacts: CorrespondentContact[];
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    predicate: any;
    totalItems: any;
    queryCount: any;
    routeSub: Subscription;
    correspondentContactInitSubscription: Subscription;
    searchCorrespondentContactSubscription: Subscription;
    correspondentContactSubscription: Subscription;

    constructor(
        private correspondentContactService: CorrespondentContactService,
        private jhiAlertService: JhiAlertService,
        private correspondentContactEventManager: JhiEventManager,
        private correspondentContactInitEventManager: JhiEventManager
    ) {
        this.correspondentId = null;
        this.correspondentContacts = [];
        this.itemsPerPage = ITEMS_PER_PAGE_LIST;
        this.page = 1;
        this.previousPage = 1;
        this.reverse = 'asc';
        this.predicate = 'id';
    }

    ngOnInit() {
        this.correspondentContactListInit();
        this.registerChangeInCorrespondentContact();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.searchCorrespondentContactSubscription.unsubscribe();
        this.correspondentContactEventManager.destroy(this.correspondentContactSubscription);
    }

    registerChangeInCorrespondentContact() {
        this.correspondentContactSubscription = this.correspondentContactEventManager
            .subscribe('correspondentContactListModification', correspondentContact => this.searchCorrespondentContact());
    }

    correspondentContactListInit() {
        this.correspondentContactInitSubscription = this.correspondentContactInitEventManager
            .subscribe('correspondentContactListInit', correspondent => {
                this.correspondentId = correspondent.content.id;
                this.searchCorrespondentContact();
                this.correspondentContactInitEventManager.destroy(this.correspondentContactInitSubscription);
            });
    }

    transition() {
        this.searchCorrespondentContact();
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
            sort: this.sort(),
            'correspondentId.equals': this.correspondentId
        };
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
        this.correspondentContacts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    searchCorrespondentContact() {
        this.searchCorrespondentContactSubscription = this.correspondentContactService.query(this.criteria())
            .subscribe(correspondentContacts => this.onSuccess(correspondentContacts.body, correspondentContacts.headers));
    }
}
