import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { JhiLoginModalComponent } from 'app/shared/login/login.component';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  private isOpen = false;
  constructor(private modalService: NgbModal) {}

<<<<<<< HEAD
    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const options: NgbModalOptions = {
            size: 'lg',
            backdrop: 'static',
            windowClass: 'login-window',
            keyboard: false,
        };
        const modalRef = this.modalService.open(JhiLoginModalComponent, options);
        modalRef.result.then(
            result => {
                this.isOpen = false;
            },
            reason => {
                this.isOpen = false;
            }
        );
        return modalRef;
=======
  open(): NgbModalRef {
    if (this.isOpen) {
      return;
>>>>>>> jhipster_upgrade
    }
    this.isOpen = true;
    const modalRef = this.modalService.open(JhiLoginModalComponent);
    modalRef.result.then(
      result => {
        this.isOpen = false;
      },
      reason => {
        this.isOpen = false;
      }
    );
    return modalRef;
  }
}
