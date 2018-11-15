import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPort } from 'app/shared/model/cpicommunication/port.model';
import { PortService } from './port.service';
import { ICountry } from 'app/shared/model/cpicommunication/country.model';
import { CountryService } from 'app/entities/cpicommunication/country';

@Component({
    selector: 'jhi-port-update',
    templateUrl: './port-update.component.html'
})
export class PortUpdateComponent implements OnInit {
    private _port: IPort;
    isSaving: boolean;

    countries: ICountry[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private portService: PortService,
        private countryService: CountryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ port }) => {
            this.port = port;
        });
        this.countryService.query().subscribe(
            (res: HttpResponse<ICountry[]>) => {
                this.countries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.port.id !== undefined) {
            this.subscribeToSaveResponse(this.portService.update(this.port));
        } else {
            this.subscribeToSaveResponse(this.portService.create(this.port));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPort>>) {
        result.subscribe((res: HttpResponse<IPort>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCountryById(index: number, item: ICountry) {
        return item.id;
    }
    get port() {
        return this._port;
    }

    set port(port: IPort) {
        this._port = port;
    }
}
