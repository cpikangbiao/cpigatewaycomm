import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICorrespondentContact } from 'app/shared/model/cpicommunication/correspondent-contact.model';
import { CorrespondentContactService } from './correspondent-contact.service';
import { ICorrespondent } from 'app/shared/model/cpicommunication/correspondent.model';
import { CorrespondentService } from 'app/cpi/correspondent';

@Component({
    selector: 'jhi-correspondent-contact-update',
    templateUrl: './correspondent-contact-update.component.html'
})
export class CorrespondentContactUpdateComponent implements OnInit {
    private _correspondentContact: ICorrespondentContact;
    isSaving: boolean;

    correspondents: ICorrespondent[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private correspondentContactService: CorrespondentContactService,
        private correspondentService: CorrespondentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ correspondentContact }) => {
            this.correspondentContact = correspondentContact;
        });
        this.correspondentService.query().subscribe(
            (res: HttpResponse<ICorrespondent[]>) => {
                this.correspondents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.correspondentContact.id !== undefined) {
            this.subscribeToSaveResponse(this.correspondentContactService.update(this.correspondentContact));
        } else {
            this.subscribeToSaveResponse(this.correspondentContactService.create(this.correspondentContact));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICorrespondentContact>>) {
        result.subscribe(
            (res: HttpResponse<ICorrespondentContact>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackCorrespondentById(index: number, item: ICorrespondent) {
        return item.id;
    }
    get correspondentContact() {
        return this._correspondentContact;
    }

    set correspondentContact(correspondentContact: ICorrespondentContact) {
        this._correspondentContact = correspondentContact;
    }
}
