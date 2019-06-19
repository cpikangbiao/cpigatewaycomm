import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import {JhiLanguageHelper, LoginModalService, Principal} from 'app/core';
=======
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { JhiLanguageHelper } from 'app/core';
>>>>>>> jhipster_upgrade

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit {
<<<<<<< HEAD
    constructor(private principal: Principal,
                private loginModalService: LoginModalService,
                private jhiLanguageHelper: JhiLanguageHelper,
                private router: Router) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'cpigatewayclaimApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
=======
  constructor(private jhiLanguageHelper: JhiLanguageHelper, private router: Router) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'cpigatewaycommApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
>>>>>>> jhipster_upgrade
    }
    return title;
  }

<<<<<<< HEAD
    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
        this.principal.identity().then(account => {
            this.router.navigate(['']).then(() => {
                if (!account) {
                    this.loginModalService.open();
                }
            });
        });
    }
=======
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });
  }
>>>>>>> jhipster_upgrade
}
