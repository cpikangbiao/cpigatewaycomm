import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CorrespondentContact } from './correspondent-contact.model';
import { CorrespondentContactPopupService } from './correspondent-contact-popup.service';
import { CorrespondentContactService } from './correspondent-contact.service';

@Component({
    selector: 'jhi-correspondent-contact-delete-dialog',
    templateUrl: './correspondent-contact-delete-dialog.component.html'
})
export class CorrespondentContactDeleteDialogComponent {
    correspondentContact: CorrespondentContact;

    constructor(
        private correspondentContactService: CorrespondentContactService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.correspondentContactService.delete(id).subscribe(() => {
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
    routeSub: any;

    constructor(private route: ActivatedRoute, private correspondentContactPopupService: CorrespondentContactPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.correspondentContactPopupService.open(CorrespondentContactDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }
}
