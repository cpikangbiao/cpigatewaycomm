import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Country, ICountry } from './country.model';
import { CountryService } from './country.service';
import { ITEMS_PER_PAGE_SMALL } from 'app/shared';
import { ActivatedRoute } from '@angular/router';
import { CountrySelectPopupService } from './country-select.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-country-select',
    templateUrl: './country-select.component.html'
})
export class CountrySelectComponent implements OnInit, OnDestroy {
    selectCountryPagingParams: any;
    country: ICountry;
    countries: ICountry[];
    itemsPerPage: any;
    page: any;
    previousPage: any;
    reverse: any;
    predicate: any;
    totalItems: any;
    queryCount: any;
    searchCountrySubscription: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private countryService: CountryService,
        private jhiAlertService: JhiAlertService
    ) {
        this.country = new Country();
        this.countries = [];
    }

    ngOnInit() {
        this.itemsPerPage = ITEMS_PER_PAGE_SMALL;
        this.page = this.selectCountryPagingParams.page;
        this.previousPage = this.selectCountryPagingParams.page;
        this.reverse = this.selectCountryPagingParams.ascending;
        this.predicate = this.selectCountryPagingParams.predicate;
        this.country.countryName = this.selectCountryPagingParams.countryName;
        this.searchCountry();
    }

    ngOnDestroy() {
        this.searchCountrySubscription.unsubscribe();
    }

    trackId(index: number, item: ICountry) {
        return item.id;
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
        this.countries = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    searchCountry() {
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

    selectCountry(country) {
        this.eventManager.broadcast({
            name: 'selectCountry',
            content: country
        });
        this.activeModal.close('cancel');
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

@Component({
    selector: 'jhi-country-select-popup',
    template: ''
})
export class CountrySelectPopupComponent implements OnInit, OnDestroy {
    routeSub: Subscription;

    constructor(private route: ActivatedRoute, private countrySelectPopupService: CountrySelectPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.data.subscribe((data: any) => {
            this.countrySelectPopupService.open(data.selectCountryPagingParams);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
