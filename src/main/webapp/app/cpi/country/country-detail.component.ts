import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICountry } from './country.model';
import { CountryService } from './country.service';

@Component({
  selector: 'jhi-country-detail',
  templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  country: ICountry;
  private subscription: Subscription;
  private eventSubscriber: Subscription;

  constructor(private eventManager: JhiEventManager, private countryService: CountryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: any) => {
      this.load(params['id']);
    });
    this.registerChangeInCountries();
  }

  load(id) {
    this.countryService.find(id).subscribe((countryResponse: HttpResponse<ICountry>) => {
      this.country = countryResponse.body;
    });
  }
  previousState() {
    window.history.back();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  registerChangeInCountries() {
    this.eventSubscriber = this.eventManager.subscribe('countryListModification', (response: any) => this.load(this.country.id));
  }

  portListInit() {
    this.eventManager.broadcast({
      name: 'portListInit',
      content: this.country
    });
  }
}
