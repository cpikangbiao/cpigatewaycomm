import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICorrespondentContact } from 'app/shared/model/cpicommunication/correspondent-contact.model';
import { CorrespondentContactService } from './correspondent-contact.service';

@Component({
    selector: 'jhi-correspondent-contact-delete-dialog',
    templateUrl: './correspondent-contact-delete-dialog.component.html'
})
export class CorrespondentContactDeleteDialogComponent {
    correspondentContact: ICorrespondentContact;

    constructor(
        private correspondentContactService: CorrespondentContactService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.correspondentContactService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'correspondentContactListModification',
                content: 'Deleted an correspondentContact'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-correspondent-contact-delete-popup',
    template: ''
})
export class CorrespondentContactDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ correspondentContact }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CorrespondentContactDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.correspondentContact = correspondentContact;
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
