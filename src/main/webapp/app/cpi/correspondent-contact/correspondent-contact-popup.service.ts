import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CorrespondentContact } from './correspondent-contact.model';
import { CorrespondentContactService } from './correspondent-contact.service';

@Injectable({ providedIn: 'root' })
export class CorrespondentContactPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private correspondentContactService: CorrespondentContactService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.correspondentContactService.find(id).subscribe((correspondentContactResponse: HttpResponse<CorrespondentContact>) => {
                    const correspondentContact: CorrespondentContact = correspondentContactResponse.body;
                    this.ngbModalRef = this.correspondentContactModalRef(component, correspondentContact);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.correspondentContactModalRef(component, new CorrespondentContact());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    correspondentContactModalRef(component: Component, correspondentContact: CorrespondentContact): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.correspondentContact = correspondentContact;
        modalRef.result.then(
            result => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            },
            reason => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
