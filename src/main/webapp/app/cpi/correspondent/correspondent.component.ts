import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { ITEMS_PER_PAGE, ITEMS_PER_PAGE_MAX, KEY_CODE_ENTER, KEY_CODE_ESC } from 'app/shared';
import { CorrespondentService } from './';
import { PortService } from '../port';
import { CountryService } from '../country';

@Component({
  selector: 'jhi-correspondent',
  templateUrl: './correspondent.component.html'
})
export class CorrespondentComponent implements OnInit, OnDestroy {
  defaultURL: string;
  correspondentName: string;
  portId: any;
  portName: any;
  ports: any;
  countryId: any;
  countryName: any;
  countries: any;
  correspondents: any;
  itemsPerPage: any;
  page: any;
  previousPage: any;
  reverse: any;
  predicate: any;
  totalItems: any;
  queryCount: any;
  routeSub: Subscription;
  searchSubscription: Subscription;
  correspondentSubscription: Subscription;

  constructor(
    private countryService: CountryService,
    private portService: PortService,
    private correspondentService: CorrespondentService,
    private correspondentEventManager: JhiEventManager,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.correspondentName = null;
    this.portId = null;
    this.portName = null;
    this.ports = [];
    this.countryId = null;
    this.countryName = null;
    this.countries = [];
    this.correspondents = [];
    this.defaultURL = this.router.url;
    this.defaultURL = this.defaultURL.split('?')[0];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeSub = this.route.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.correspondentName = data.pagingParams.correspondentName;
      this.portName = data.pagingParams.portName;
      this.countryName = data.pagingParams.countryName;
    });
  }

  ngOnInit() {
    this.countryService.query({ size: ITEMS_PER_PAGE_MAX, sort: ['countryName', 'asc'] }).subscribe(countries => {
      this.countries = countries.body;
    });
    this.search();
    this.registerChangeInCorrespondents();
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.correspondentSubscription) {
      this.correspondentEventManager.destroy(this.correspondentSubscription);
    }
  }

  registerChangeInCorrespondents() {
    this.correspondentSubscription = this.correspondentEventManager.subscribe('correspondentListModification', () => this.search());
  }

  modifyURL() {
    this.router.navigate([this.defaultURL], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
        correspondentName: this.correspondentName,
        portName: this.portName,
        countryName: this.countryName
      }
    });
  }

  transition() {
    this.search();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  search() {
    this.modifyURL();
    this.searchCountry();
  }

  searchCountry() {
    if ((this.countryId !== null && this.countryId !== '') || (this.countryName !== null && this.countryName !== '')) {
      const result = {
        size: ITEMS_PER_PAGE_MAX,
        sort: ['countryName', 'asc']
      };
      if (this.countryId !== null && this.countryId !== '') {
        result['id.equals'] = this.countryId;
      }
      if (this.countryName !== null && this.countryName !== '') {
        result['countryName.contains'] = this.countryName;
      }
      this.countryService.query(result).subscribe(countries => {
        if (countries.body && countries.body.length > 0) {
          const countryIds = [];
          countries.body.forEach(country => {
            countryIds.push(country.id);
          });
          this.searchPort(countryIds);
        } else {
          this.correspondents = [];
        }
      });
    } else {
      this.searchPort();
    }
  }

  searchPort(countryIds?: number[]) {
    if (
      (countryIds && countryIds.length > 0) ||
      (this.portId !== null && this.portId !== '') ||
      (this.portName !== null && this.portName !== '')
    ) {
      const result = {
        size: ITEMS_PER_PAGE_MAX,
        sort: ['portName', 'asc']
      };
      if (this.portId !== null && this.portId !== '') {
        result['id.equals'] = this.portId;
      }
      if (this.portName !== null && this.portName !== '') {
        result['portName.contains'] = this.portName;
      }
      if (countryIds && countryIds.length > 0) {
        result['countryId.in'] = countryIds;
      }
      this.portService.query(result).subscribe(ports => {
        if (ports.body && ports.body.length > 0) {
          const portIds = [];
          ports.body.forEach(port => {
            portIds.push(port.id);
          });
          this.searchCorrespondent(portIds);
        } else {
          this.correspondents = [];
        }
      });
    } else {
      this.searchCorrespondent();
    }
  }

  searchCorrespondent(portIds?: number[]) {
    const params = this.criteria();
    if (portIds && portIds.length > 0) {
      params['portId.in'] = portIds;
    }
    this.correspondentService.query(params).subscribe(correspondents => this.onSuccess(correspondents.body, correspondents.headers));
  }

  criteria() {
    const result = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort()
    };
    if (this.correspondentName && this.correspondentName.length > 0) {
      result['correspondentName.contains'] = this.correspondentName;
    }
    return result;
  }

  private onSuccess(data, headers) {
    this.totalItems = headers.get('X-Total-Count');
    this.queryCount = this.totalItems;
    this.correspondents = data;
    this.correspondents.forEach(correspondent => {
      if (correspondent.portId) {
        this.portService.find(correspondent.portId).subscribe(port => {
          correspondent.countryId = port.body.countryId;
          correspondent.countryCountryName = port.body.countryCountryName;
        });
      }
    });
  }

  resetPage() {
    this.page = 0;
  }

  clear() {
    this.correspondentName = null;
    this.portId = null;
    this.portName = null;
    this.ports = [];
    this.countryId = null;
    this.countryName = null;
    this.page = 0;
    this.predicate = 'id';
    this.search();
  }

  searchKeyup($event) {
    if ($event.keyCode === KEY_CODE_ENTER) {
      this.resetPage();
      this.search();
    }
    if ($event.keyCode === KEY_CODE_ESC) {
      this.clear();
    }
  }

  createCorrespondentBookPDF() {
    this.correspondentService.createCorrespondentBookPDF();
  }

  createCorrespondentBookExcel() {
    this.correspondentService.createCorrespondentBookExcel();
  }

  createCorrespondentBookWord() {
    this.correspondentService.createCorrespondentBookWord();
  }

  changePort() {
    if (this.countryId !== null && this.countryId !== '') {
      const result = {
        size: ITEMS_PER_PAGE_MAX,
        sort: ['portName', 'asc']
      };
      if (this.countryId !== null && this.countryId !== '') {
        result['countryId.equals'] = this.countryId;
      }
      this.portService.query(result).subscribe(ports => {
        this.ports = ports.body;
      });
    }
  }
}
