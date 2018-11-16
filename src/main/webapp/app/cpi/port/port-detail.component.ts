import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';
import { IPort } from './port.model';
import { PortService } from './port.service';

@Component({
    selector: 'jhi-port-detail',
    templateUrl: './port-detail.component.html'
})
export class PortDetailComponent implements OnInit, OnDestroy {
    port: any;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private portService: PortService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params: any) => {
            this.load(params['id']);
        });
        this.registerChangeInPorts();
    }

    load(id) {
        this.portService.find(id).subscribe(port => {
            this.port = port.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    }

    registerChangeInPorts() {
        this.eventSubscriber = this.eventManager.subscribe('portListModification', (response: any) => this.load(this.port.id));
    }
}
