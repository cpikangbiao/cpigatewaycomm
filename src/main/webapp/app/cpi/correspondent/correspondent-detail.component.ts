import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Correspondent } from './correspondent.model';
import { CorrespondentService } from './correspondent.service';

@Component({
    selector: 'jhi-correspondent-detail',
    templateUrl: './correspondent-detail.component.html'
})
export class CorrespondentDetailComponent implements OnInit, OnDestroy {

    correspondent: Correspondent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private correspondentService: CorrespondentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInCorrespondents();
    }

    load(id) {
        this.correspondentService.find(id)
            .subscribe(correspondent => {
                this.correspondent = correspondent.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCorrespondents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'correspondentListModification',
            response => this.load(this.correspondent.id)
        );
    }

    correspondentContactListInit() {
        this.eventManager.broadcast({
            name: 'correspondentContactListInit',
            content: this.correspondent
        });
    }
}
