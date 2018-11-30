import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { IPort, Port } from './port.model';
import { PortService } from './port.service';

@Injectable({ providedIn: 'root' })
export class PortPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private portService: PortService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.portService.find(id).subscribe((portResponse: HttpResponse<IPort>) => {
                    const port: IPort = portResponse.body;
                    this.ngbModalRef = this.portModalRef(component, port);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.portModalRef(component, new Port());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    portModalRef(component: Component, port: IPort): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.port = port;
        modalRef.result.then(
            (result: any) => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            },
            (reason: any) => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
