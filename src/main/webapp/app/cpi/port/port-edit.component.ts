import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IPort, Port, PortService } from '../port';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Country, CountryService } from '../country';

@Component({
    selector: 'jhi-port-edit',
    templateUrl: './port-edit.component.html'
})
export class PortEditComponent implements OnInit, OnDestroy {
    port: IPort;
    country: Country;
    routeSubscription: Subscription;
    selectCountrySubscription: Subscription;

    constructor(
        private location: Location,
        private jhiAlertService: JhiAlertService,
        private portService: PortService,
        private countryService: CountryService,
        private route: ActivatedRoute,
        private eventManager: JhiEventManager,
        private selectCountryEventManager: JhiEventManager
    ) {
        this.port = new Port();
        this.country = new Country();
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.selectCountryEventManager.destroy(this.selectCountrySubscription);
    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe((params: any) => {
            if (params['id']) {
                this.portService.find(params['id']).subscribe(
                    (res: HttpResponse<IPort>) => {
                        this.port = res.body;
                        if (this.port && this.port.countryId) {
                            this.countryService.find(this.port.countryId).subscribe(
                                (subRes: HttpResponse<IPort>) => {
                                    this.country = subRes.body;
                                },
                                (subRes: HttpErrorResponse) => this.onError(subRes)
                            );
                        }
                    },
                    (res: HttpErrorResponse) => this.onError(res)
                );
            }
        });
        this.registerChangeInPort();
    }

    registerChangeInPort() {
        this.selectCountrySubscription = this.selectCountryEventManager.subscribe('selectCountry', (res: any) => {
            this.country = res.content;
            this.port.countryId = this.country.id;
            this.port.countryCountryName = this.country.countryName;
        });
    }

    clearCountry() {
        this.country = new Country();
        this.port.countryId = null;
        this.port.countryCountryName = null;
    }

    cancel() {
        this.location.back();
    }

    save() {
        if (this.port.id !== undefined) {
            this.subscribeToSaveResponse(this.portService.update(this.port));
        } else {
            this.subscribeToSaveResponse(this.portService.create(this.port));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPort>>) {
        result.subscribe((res: HttpResponse<IPort>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    private onSaveSuccess(res) {
        this.eventManager.broadcast({
            name: 'portListModification',
            content: res.body
        });
        this.location.back();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPortById(index: number, item: IPort) {
        return item.id;
    }
}
