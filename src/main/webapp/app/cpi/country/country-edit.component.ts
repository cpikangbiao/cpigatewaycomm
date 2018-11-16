import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Country, ICountry } from './country.model';
import { CountryService } from './country.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

@Component({
    selector: 'jhi-country-edit',
    templateUrl: './country-edit.component.html'
})
export class CountryEditComponent implements OnInit, OnDestroy {
    country: ICountry;
    routeSub: Subscription;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private countryService: CountryService,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService
    ) {
        this.country = new Country();
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: any) => {
            if (params['id']) {
                this.countryService.find(params['id']).subscribe(
                    (res: HttpResponse<ICountry>) => {
                        this.country = res.body;
                    },
                    (res: HttpErrorResponse) => this.onError(res)
                );
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    save() {
        if (this.country.id !== undefined) {
            this.subscribeToSaveResponse(this.countryService.update(this.country));
        } else {
            this.subscribeToSaveResponse(this.countryService.create(this.country));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICountry>>) {
        result.subscribe((res: HttpResponse<ICountry>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    private onSaveSuccess(res) {
        this.eventManager.broadcast({
            name: 'countryListModification',
            content: res.body
        });
        this.location.back();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    cancel() {
        this.location.back();
    }
}
