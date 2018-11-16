import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiParseLinks, JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { ICountry, Country } from './country.model';
import { CountryService } from './country.service';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-country',
    templateUrl: './country.component.html'
})
export class CountryComponent implements OnInit, OnDestroy {
    defaultURL: string;
    country: ICountry;
    countries: ICountry[];
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    predicate: any;
    links: any;
    totalItems: any;
    queryCount: any;
    routeSub: Subscription;
    searchCountrySubscription: Subscription;
    countrySubscription: Subscription;

    constructor(
        private countryService: CountryService,
        private jhiAlertService: JhiAlertService,
        private countryEventManager: JhiEventManager,
        private route: ActivatedRoute,
        private router: Router,
        private parseLinks: JhiParseLinks
    ) {
        this.country = new Country();
        this.countries = [];
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
            this.country.countryName = data.pagingParams.countryName;
            this.country.countryNameAbbr = data.pagingParams.countryNameAbbr;
            this.country.dialCode = data.pagingParams.dialCode;
        });
        this.searchCountry();
        this.registerChangeInCountries();
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
        if (this.searchCountrySubscription) {
            this.searchCountrySubscription.unsubscribe();
        }
        if (this.countrySubscription) {
            this.countryEventManager.destroy(this.countrySubscription);
        }
    }

    registerChangeInCountries() {
        this.countrySubscription = this.countryEventManager.subscribe('countryListModification', (res: any) => this.searchCountry());
    }

    trackId(index: number, item: ICountry) {
        return item.id;
    }

    modifyURL() {
        this.router.navigate([this.defaultURL], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                countryName: this.country.countryName,
                countryNameAbbr: this.country.countryNameAbbr,
                dialCode: this.country.dialCode
            }
        });
    }

    transition() {
        this.searchCountry();
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
        if (this.country.countryName && this.country.countryName.length > 0) {
            result['countryName.contains'] = this.country.countryName;
        }
        if (this.country.countryNameAbbr && this.country.countryNameAbbr.length > 0) {
            result['countryNameAbbr.equals'] = this.country.countryNameAbbr;
        }
        if (this.country.dialCode && this.country.dialCode.length > 0) {
            result['dialCode.equals'] = this.country.dialCode;
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
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.countries = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    searchCountry() {
        this.modifyURL();
        this.searchCountrySubscription = this.countryService
            .query(this.criteria())
            .subscribe(
                (res: HttpResponse<ICountry[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res)
            );
    }

    resetPage() {
        this.page = 0;
    }

    clear() {
        this.country = new Country();
        this.page = 0;
        this.predicate = 'id';
        this.searchCountry();
    }

    searchKeyup($event) {
        if ($event.keyCode === 13) {
            this.resetPage();
            this.searchCountry();
        }
        if ($event.keyCode === 27) {
            this.clear();
        }
    }
}
