import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CorrespondentContact } from './correspondent-contact.model';
import { CorrespondentContactService } from './correspondent-contact.service';

@Component({
    selector: 'jhi-correspondent-contact-detail',
    templateUrl: './correspondent-contact-detail.component.html'
})
export class CorrespondentContactDetailComponent implements OnInit, OnDestroy {

    correspondentContact: CorrespondentContact;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private correspondentContactService: CorrespondentContactService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInCorrespondentContacts();
    }

    load(id) {
        this.correspondentContactService.find(id)
            .subscribe(correspondentContact => {
                this.correspondentContact = correspondentContact.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCorrespondentContacts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'correspondentContactListModification',
            response => this.load(this.correspondentContact.id)
        );
    }
}
