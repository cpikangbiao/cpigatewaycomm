import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICorrespondent } from 'app/shared/model/cpicommunication/correspondent.model';
import { CorrespondentService } from './correspondent.service';
import { IPort } from 'app/shared/model/cpicommunication/port.model';
import { PortService } from 'src/main/webapp/app/cpi/port/index';

@Component({
    selector: 'jhi-correspondent-update',
    templateUrl: './correspondent-update.component.html'
})
export class CorrespondentUpdateComponent implements OnInit {
    private _correspondent: ICorrespondent;
    isSaving: boolean;

    ports: IPort[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private correspondentService: CorrespondentService,
        private portService: PortService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ correspondent }) => {
            this.correspondent = correspondent;
        });
        this.portService.query().subscribe(
            (res: HttpResponse<IPort[]>) => {
                this.ports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.correspondent.id !== undefined) {
            this.subscribeToSaveResponse(this.correspondentService.update(this.correspondent));
        } else {
            this.subscribeToSaveResponse(this.correspondentService.create(this.correspondent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICorrespondent>>) {
        result.subscribe((res: HttpResponse<ICorrespondent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPortById(index: number, item: IPort) {
        return item.id;
    }
    get correspondent() {
        return this._correspondent;
    }

    set correspondent(correspondent: ICorrespondent) {
        this._correspondent = correspondent;
    }
}
