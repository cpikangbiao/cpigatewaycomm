import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { IPort } from './port.model';
import { PortService } from './port.service';
import { ITEMS_PER_PAGE_LIST } from 'app/shared';

@Component({
  selector: 'jhi-port-list',
  templateUrl: './port-list.component.html'
})
export class PortListComponent implements OnInit, OnDestroy {
  countryId: number;
  ports: any;
  error: any;
  success: any;
  eventSubscriber: Subscription;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  activateRouteParamsSubscriber: Subscription;
  activateRouteDataSubscriber: Subscription;
  portInitSubscription: Subscription;

  constructor(
    private portService: PortService,
    private jhiAlertService: JhiAlertService,
    private eventManager: JhiEventManager,
    private portInitEventManager: JhiEventManager
  ) {
    this.ports = [];
    this.itemsPerPage = ITEMS_PER_PAGE_LIST;
    this.page = 1;
    this.previousPage = 1;
    this.reverse = 'asc';
    this.predicate = 'id';
  }

  searchPort() {
    this.portService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        'countryId.equals': this.countryId
      })
      .subscribe((res: HttpResponse<IPort[]>) => this.onSuccess(res.body, res.headers), (res: HttpErrorResponse) => this.onError(res));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.searchPort();
  }

  ngOnInit() {
    this.portListInit();
    this.registerChangeInPorts();
  }

  ngOnDestroy() {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
    if (this.activateRouteParamsSubscriber) {
      this.activateRouteParamsSubscriber.unsubscribe();
    }
    if (this.activateRouteDataSubscriber) {
      this.activateRouteDataSubscriber.unsubscribe();
    }
  }

  registerChangeInPorts() {
    this.eventSubscriber = this.eventManager.subscribe('portListModification', (response: any) => this.searchPort());
  }

  portListInit() {
    this.portInitSubscription = this.portInitEventManager.subscribe('portListInit', country => {
      this.countryId = country.content.id;
      this.searchPort();
      if (this.portInitSubscription) {
        this.portInitEventManager.destroy(this.portInitSubscription);
      }
    });
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.ports = data;
  }

  private onError(error) {
    this.jhiAlertService.error(error.message, null, null);
  }
}
