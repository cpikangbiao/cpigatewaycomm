import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { IPort } from './port.model';
import { PortPopupService } from './port-popup.service';
import { PortService } from './port.service';

@Component({
    selector: 'jhi-port-delete-dialog',
    templateUrl: './port-delete-dialog.component.html'
})
export class PortDeleteDialogComponent {
    port: IPort;

    constructor(private portService: PortService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.portService.delete(id).subscribe((response: any) => {
            this.eventManager.broadcast({
                name: 'portListModification',
                content: 'Deleted an port'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-port-delete-popup',
    template: ''
})
export class PortDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private portPopupService: PortPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: any) => {
            this.portPopupService.open(PortDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
