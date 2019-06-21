import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IPort, Port, PortService } from './';
import { Subscription } from 'rxjs';
import { CountryService } from '../country';

@Component({
  selector: 'jhi-port-edit',
  templateUrl: './port-edit.component.html'
})
export class PortEditComponent implements OnInit, OnDestroy {
  port: any;
  routeSubscription: Subscription;
  selectCountrySubscription: Subscription;

  constructor(
    private jhiAlertService: JhiAlertService,
    private portService: PortService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private eventManager: JhiEventManager,
    private selectCountryEventManager: JhiEventManager
  ) {
    this.port = new Port();
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.selectCountrySubscription) {
      this.selectCountryEventManager.destroy(this.selectCountrySubscription);
    }
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: any) => {
      if (params['countryId']) {
        this.port.countryId = params['countryId'];
        this.countryService.find(this.port.countryId).subscribe(country => {
          this.port.countryCountryName = country.body.countryName;
        });
      }
      if (params['id']) {
        this.portService.find(params['id']).subscribe((res: HttpResponse<IPort>) => {
          this.port = res.body;
        });
      }
    });
    this.registerChangeInPort();
  }

  registerChangeInPort() {
    this.selectCountrySubscription = this.selectCountryEventManager.subscribe('selectCountry', country => {
      this.port.countryId = country.content.id;
      this.port.countryCountryName = country.content.countryName;
    });
  }

  clearCountry() {
    this.port.countryId = null;
    this.port.countryCountryName = null;
  }

  cancel() {
    window.history.back();
  }

  save() {
    if (this.port.id !== undefined) {
      this.subscribeToSaveResponse(this.portService.update(this.port));
    } else {
      this.subscribeToSaveResponse(this.portService.create(this.port));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IPort>>) {
    result.subscribe((res: HttpResponse<IPort>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res));
  }

  private onSaveSuccess(res) {
    this.eventManager.broadcast({
      name: 'portListModification',
      content: res.body
    });
    window.history.back();
  }

  private onError(error: any) {
    this.jhiAlertService.error(error.message, null, null);
  }
}
