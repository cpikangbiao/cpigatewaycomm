import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPort } from 'app/shared/model/cpicommunication/port.model';

@Component({
    selector: 'jhi-port-detail',
    templateUrl: './port-detail.component.html'
})
export class PortDetailComponent implements OnInit {
    port: IPort;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ port }) => {
            this.port = port;
        });
    }

    previousState() {
        window.history.back();
    }
}
