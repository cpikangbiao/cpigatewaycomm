import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICountry } from './country.model';
import { CountryService } from './country.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { CountryPopupService } from './country-popup.service';
import { Principal } from 'app/core';

@Component({
    selector: 'jhi-country-search',
    templateUrl: './country-search.component.html'
})
export class CountrySearchComponent implements OnInit, OnDestroy {
    currentAccount: any;
    countries: ICountry[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    filterCountryName: string;

    constructor(
        private countryService: CountryService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data: any) => {
            this.page = 1; // data.pagingParams.page;
            this.previousPage = 1; // data.pagingParams.page;
            this.reverse = 'asc'; // data.pagingParams.ascending;
            this.predicate = 'id'; // data.pagingParams.predicate;
        });
        this.filterCountryName = '';
    }

    cancel() {
        this.activeModal.dismiss('cancel');
    }

    onSelected() {}

    loadAll() {
        this.countryService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                // filter : this.criteria(),
                'countryName.contains': this.filterCountryName
            })
            .subscribe(
                (res: HttpResponse<ICountry[]>) => this.onSuccess(res.body, res.headers),
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
        this.router.navigate(['/country'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.filterCountryName = '';
        this.router.navigate(['/country'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account: any) => {
            this.currentAccount = account;
        });
        this.registerChangeInCountries();
    }

    ngOnDestroy() {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }

    trackId(index: number, item: ICountry) {
        return item.id;
    }

    registerChangeInCountries() {
        this.eventSubscriber = this.eventManager.subscribe('countryListModification', (response: any) => this.loadAll());
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
        this.countries = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    criteria() {
        const result = [{}];

        if (this.filterCountryName && this.filterCountryName.length > 0) {
            result['countryName.contains'] = this.filterCountryName;
        }

        console.log(`contact by edited id is ${result}`);

        return result;
    }
}

@Component({
    selector: 'jhi-country-search-popup',
    template: ''
})
export class CountrySearchPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private countryPopupService: CountryPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: any) => {
            this.countryPopupService.open(CountrySearchComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
