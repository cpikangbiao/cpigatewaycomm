import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPort } from 'app/shared/model/cpicommunication/port.model';
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
        this.portService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ port }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PortDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.port = port;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
