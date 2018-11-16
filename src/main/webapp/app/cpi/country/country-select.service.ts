import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CountrySelectComponent } from './country-select.component';

@Injectable()
export class CountrySelectPopupService {
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
            this.ngbModalRef = this.modalService.open(CountrySelectComponent, { size: 'lg', backdrop: 'static' });
            this.ngbModalRef.result.then(
                (result: any) => {
                    this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                    this.ngbModalRef = null;
                },
                (reason: any) => {
                    this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                    this.ngbModalRef = null;
                }
            );
            resolve(this.ngbModalRef);
        });
    }
}
