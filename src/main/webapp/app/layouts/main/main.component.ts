import { Component, OnInit } from '@angular/core';

import { JhiLanguageHelper, LoginModalService, AccountService } from 'app/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private jhiLanguageHelper: JhiLanguageHelper,
    private router: Router
  ) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'cpigatewaycommApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
    });
    this.accountService.identity().then(account => {
      this.router.navigate(['']).then(() => {
        if (!account) {
          this.loginModalService.open();
        }
      });
    });
  }
}
