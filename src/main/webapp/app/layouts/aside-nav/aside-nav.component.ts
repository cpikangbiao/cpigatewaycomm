import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AccountService } from 'app/core';

declare let mLayout: any;
@Component({
  selector: 'jhi-aside-nav',
  templateUrl: './aside-nav.component.html',
  // styles: ['#m_aside_left{overflow-x:visible;overflow-y:scroll;}'],
  encapsulation: ViewEncapsulation.None
})
export class AsideNavComponent implements OnInit, AfterViewInit {
  constructor(private accountService: AccountService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    mLayout.initAside();
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}
