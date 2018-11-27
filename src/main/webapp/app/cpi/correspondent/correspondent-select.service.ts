import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CorrespondentSelectComponent } from './correspondent-select.component';

@Injectable()
export class CorrespondentSelectPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router) {
        this.ngbModalRef = null;
    }

    open(): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            this.ngbModalRef = this.modalService.open(CorrespondentSelectComponent, { size: 'lg', backdrop: 'static' });
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
            resolve(this.ngbModalRef);
        });
    }
}
