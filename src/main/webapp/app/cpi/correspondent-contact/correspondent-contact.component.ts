import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {CorrespondentContact} from './correspondent-contact.model';
import {CorrespondentContactService} from './correspondent-contact.service';
import {ITEMS_PER_PAGE} from 'app/shared';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'jhi-correspondent-contact',
    templateUrl: './correspondent-contact.component.html'
})
export class CorrespondentContactComponent implements OnInit, OnDestroy {
    defaultURL: string;
    correspondentContact: CorrespondentContact;
    correspondentContacts: CorrespondentContact[];
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    predicate: any;
    totalItems: any;
    queryCount: any;
    routeSub: Subscription;
    searchCorrespondentContactSubscription: Subscription;
    correspondentContactSubscription: Subscription;

    constructor(private correspondentContactService: CorrespondentContactService,
                private jhiAlertService: JhiAlertService,
                private correspondentContactEventManager: JhiEventManager,
                private route: ActivatedRoute,
                private router: Router) {
        this.correspondentContact = new CorrespondentContact();
        this.correspondentContacts = [];
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
            this.correspondentContact.correspondentContactName = data.pagingParams.correspondentContactName;
        });
        this.searchCorrespondentContact();
        this.registerChangeInCorrespondentContacts();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.searchCorrespondentContactSubscription.unsubscribe();
        this.correspondentContactEventManager.destroy(this.correspondentContactSubscription);
    }

    registerChangeInCorrespondentContacts() {
        this.correspondentContactSubscription = this.correspondentContactEventManager
            .subscribe('correspondentContactListModification', () => this.searchCorrespondentContact());
    }

    trackId(index: number, item: CorrespondentContact) {
        return item.id;
    }

    modifyURL() {
        this.router.navigate([this.defaultURL], {
            queryParams:
                {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                    'correspondentContactName': this.correspondentContact.correspondentContactName
                }
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
            sort: this.sort()
        };
        if (this.correspondentContact.correspondentContactName && this.correspondentContact.correspondentContactName.length > 0) {
            result['correspondentContactName.contains'] = this.correspondentContact.correspondentContactName;
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
        this.correspondentContacts = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    searchCorrespondentContact() {
        this.modifyURL();
        this.searchCorrespondentContactSubscription = this.correspondentContactService.query(this.criteria())
            .subscribe(
                (res: HttpResponse<CorrespondentContact[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res)
            );
    }

    resetPage() {
        this.page = 0;
    }

    clear() {
        this.correspondentContact = new CorrespondentContact();
        this.page = 0;
        this.predicate = 'id';
        this.searchCorrespondentContact();
    }

    searchKeyup($event) {
        if ($event.keyCode === 13) {
            this.resetPage();
            this.searchCorrespondentContact();
        }
        if ($event.keyCode === 27) {
            this.clear();
        }
    }
}
