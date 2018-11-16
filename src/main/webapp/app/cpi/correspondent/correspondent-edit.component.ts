import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Correspondent } from './correspondent.model';
import { CorrespondentService } from './correspondent.service';
import { Port, PortService } from '../port';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-correspondent-edit',
    templateUrl: './correspondent-edit.component.html'
})
export class CorrespondentEditComponent implements OnInit, OnDestroy {
    port: Port;
    correspondent: Correspondent;
    routeSubscription: Subscription;
    selectPortSubscription: Subscription;

    constructor(
        private location: Location,
        private jhiAlertService: JhiAlertService,
        private correspondentService: CorrespondentService,
        private route: ActivatedRoute,
        private portService: PortService,
        private eventManager: JhiEventManager,
        private selectPortEventManager: JhiEventManager
    ) {
        this.port = new Port();
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
                    if (this.correspondent && this.correspondent.portId) {
                        this.portService.find(this.correspondent.portId).subscribe(port => {
                            this.port = port.body;
                        });
                    }
                });
            }
        });
        this.registerChangeInPort();
    }

    registerChangeInPort() {
        this.selectPortSubscription = this.selectPortEventManager.subscribe('selectPort', port => {
            this.port = port.content;
            this.correspondent.portId = this.port.id;
            this.correspondent.portPortName = this.port.portName;
        });
    }

    clearPort() {
        this.port = new Port();
        this.correspondent.portId = null;
        this.correspondent.portPortName = null;
    }

    cancel() {
        this.location.back();
    }

    save() {
        if (this.correspondent.id !== undefined) {
            this.subscribeToSaveResponse(this.correspondentService.update(this.correspondent));
        } else {
            this.subscribeToSaveResponse(this.correspondentService.create(this.correspondent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Correspondent>>) {
        result.subscribe((res: HttpResponse<Correspondent>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res));
    }

    private onSaveSuccess(res) {
        this.eventManager.broadcast({
            name: 'correspondentListModification',
            content: res.body
        });
        this.location.back();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
