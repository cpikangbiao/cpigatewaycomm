import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Correspondent } from './correspondent.model';
import { CorrespondentPopupService } from './correspondent-popup.service';
import { CorrespondentService } from './correspondent.service';

@Component({
    selector: 'jhi-correspondent-delete-dialog',
    templateUrl: './correspondent-delete-dialog.component.html'
})
export class CorrespondentDeleteDialogComponent {

    correspondent: Correspondent;

    constructor(
        private correspondentService: CorrespondentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.correspondentService.delete(id).subscribe(() => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private correspondentPopupService: CorrespondentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.correspondentPopupService
                .open(CorrespondentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
