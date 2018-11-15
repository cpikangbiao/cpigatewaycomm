import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICorrespondent } from 'app/shared/model/cpicommunication/correspondent.model';
import { CorrespondentService } from './correspondent.service';

@Component({
    selector: 'jhi-correspondent-delete-dialog',
    templateUrl: './correspondent-delete-dialog.component.html'
})
export class CorrespondentDeleteDialogComponent {
    correspondent: ICorrespondent;

    constructor(
        private correspondentService: CorrespondentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.correspondentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'correspondentListModification',
                content: 'Deleted an correspondent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-correspondent-delete-popup',
    template: ''
})
export class CorrespondentDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ correspondent }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CorrespondentDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.correspondent = correspondent;
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
