import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICorrespondentContact } from 'app/shared/model/cpicommunication/correspondent-contact.model';

@Component({
    selector: 'jhi-correspondent-contact-detail',
    templateUrl: './correspondent-contact-detail.component.html'
})
export class CorrespondentContactDetailComponent implements OnInit {
    correspondentContact: ICorrespondentContact;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ correspondentContact }) => {
            this.correspondentContact = correspondentContact;
        });
    }

    previousState() {
        window.history.back();
    }
}
