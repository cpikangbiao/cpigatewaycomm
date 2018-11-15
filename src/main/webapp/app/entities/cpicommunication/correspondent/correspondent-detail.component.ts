import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICorrespondent } from 'app/shared/model/cpicommunication/correspondent.model';

@Component({
    selector: 'jhi-correspondent-detail',
    templateUrl: './correspondent-detail.component.html'
})
export class CorrespondentDetailComponent implements OnInit {
    correspondent: ICorrespondent;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ correspondent }) => {
            this.correspondent = correspondent;
        });
    }

    previousState() {
        window.history.back();
    }
}
