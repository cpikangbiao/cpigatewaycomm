import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Correspondent } from './correspondent.model';
import { CorrespondentService } from './correspondent.service';

@Injectable({ providedIn: 'root' })
export class CorrespondentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private correspondentService: CorrespondentService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.correspondentService.find(id).subscribe((correspondentResponse: HttpResponse<Correspondent>) => {
                    const correspondent: Correspondent = correspondentResponse.body;
                    this.ngbModalRef = this.correspondentModalRef(component, correspondent);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.correspondentModalRef(component, new Correspondent());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    correspondentModalRef(component: Component, correspondent: Correspondent): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.correspondent = correspondent;
        modalRef.result.then(
            () => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            },
            () => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
