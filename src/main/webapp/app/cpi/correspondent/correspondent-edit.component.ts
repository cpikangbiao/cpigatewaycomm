import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';
import { Correspondent, CorrespondentService } from './';

@Component({
    selector: 'jhi-correspondent-edit',
    templateUrl: './correspondent-edit.component.html'
})
export class CorrespondentEditComponent implements OnInit, OnDestroy {
    correspondent: Correspondent;
    routeSubscription: Subscription;
    selectPortSubscription: Subscription;

    constructor(
        private correspondentService: CorrespondentService,
        private route: ActivatedRoute,
        private eventManager: JhiEventManager,
        private selectPortEventManager: JhiEventManager
    ) {
        this.correspondent = new Correspondent();
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
        if (this.selectPortSubscription) {
            this.selectPortEventManager.destroy(this.selectPortSubscription);
        }
    }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            if (params['id']) {
                this.correspondentService.find(params['id']).subscribe(correspondent => {
                    this.correspondent = correspondent.body;
                });
            }
        });
        this.registerChangeInPort();
    }

    registerChangeInPort() {
        this.selectPortSubscription = this.selectPortEventManager.subscribe('selectPort', port => {
            this.correspondent.portId = port.content.id;
            this.correspondent.portPortName = port.content.portName;
        });
    }

    clearPort() {
        this.correspondent.portId = null;
        this.correspondent.portPortName = null;
    }

    cancel() {
        window.history.back();
    }

    save() {
        if (this.correspondent.id !== undefined) {
            this.subscribeToSaveResponse(this.correspondentService.update(this.correspondent));
        } else {
            this.subscribeToSaveResponse(this.correspondentService.create(this.correspondent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Correspondent>>) {
        result.subscribe((res: HttpResponse<Correspondent>) => this.onSaveSuccess(res));
    }

    private onSaveSuccess(res) {
        this.eventManager.broadcast({
            name: 'correspondentListModification',
            content: res.body
        });
        window.history.back();
    }
}
