import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { CorrespondentContact } from './correspondent-contact.model';
import { CorrespondentContactService } from './correspondent-contact.service';
import { Correspondent, CorrespondentService } from '../correspondent';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-correspondent-contact-edit',
    templateUrl: './correspondent-contact-edit.component.html'
})
export class CorrespondentContactEditComponent implements OnInit, OnDestroy {
    correspondent: Correspondent;
    correspondentContact: CorrespondentContact;
    routeSubscription: Subscription;
    selectCorrespondentSubscription: Subscription;

    constructor(
        private location: Location,
        private jhiAlertService: JhiAlertService,
        private correspondentContactService: CorrespondentContactService,
        private correspondentService: CorrespondentService,
        private route: ActivatedRoute,
        private eventManager: JhiEventManager,
        private selectCorrespondentEventManager: JhiEventManager
    ) {
        this.correspondent = new Correspondent();
        this.correspondentContact = new CorrespondentContact();
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
        if (this.selectCorrespondentSubscription) {
            this.selectCorrespondentEventManager.destroy(this.selectCorrespondentSubscription);
        }
    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            if (params['correspondentId']) {
                this.correspondentService.find(params['correspondentId']).subscribe(correspondent => {
                    this.correspondent = correspondent.body;
                    this.correspondentContact.correspondentId = this.correspondent.id;
                });
            }
            if (params['id']) {
                this.correspondentContactService.find(params['id']).subscribe(correspondentContact => {
                    this.correspondentContact = correspondentContact.body;
                    if (this.correspondentContact && this.correspondentContact.correspondentId) {
                        this.correspondentService.find(this.correspondentContact.correspondentId).subscribe(correspondent => {
                            this.correspondent = correspondent.body;
                        });
                    }
                });
            }
        });
        this.registerChangeInCorrespondent();
    }

    registerChangeInCorrespondent() {
        this.selectCorrespondentSubscription = this.selectCorrespondentEventManager.subscribe('selectCorrespondent', correspondent => {
            this.correspondent = correspondent.content;
            this.correspondentContact.correspondentId = correspondent.content.id;
        });
    }

    clearCorrespondent() {
        this.correspondent = new Correspondent();
        this.correspondentContact.correspondentId = null;
    }

    cancel() {
        this.location.back();
    }

    save() {
        if (this.correspondentContact.id !== undefined) {
            this.subscribeToSaveResponse(this.correspondentContactService.update(this.correspondentContact));
        } else {
            this.subscribeToSaveResponse(this.correspondentContactService.create(this.correspondentContact));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CorrespondentContact>>) {
        result.subscribe(
            (res: HttpResponse<CorrespondentContact>) => this.onSaveSuccess(res),
            (res: HttpErrorResponse) => this.onError(res)
        );
    }

    private onSaveSuccess(res) {
        this.eventManager.broadcast({
            name: 'correspondentContactListModification',
            content: res.body
        });
        this.location.back();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCorrespondentById(index: number, item: Correspondent) {
        return item.id;
    }
}
