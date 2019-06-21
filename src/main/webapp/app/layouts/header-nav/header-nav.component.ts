import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { Account, AccountService, JhiLanguageHelper, LoginModalService, LoginService } from 'app/core';
import { VERSION } from 'app/app.constants';
import { ProfileService } from 'app/layouts';
import { JhiEventManager } from 'ng-jhipster';

declare let mLayout: any;

@Component({
  selector: 'jhi-header-nav',
  templateUrl: './header-nav.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
  account: Account;
  inProduction: boolean;
  languages: any[];
  swaggerEnabled: boolean;
  modalRef: NgbModalRef;
  version: string;
  anthorName: string;

  constructor(
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private languageHelper: JhiLanguageHelper,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    // private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.version = VERSION ? 'v' + VERSION : '';
    this.anthorName = 'by kangbiao@chinapandi.com';
  }

  ngOnInit() {
    this.languageHelper.getAll().then((languages: any) => {
      this.languages = languages;
    });
    this.profileService.getProfileInfo().then((profileInfo: any) => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
    this.accountService.identity().then((account: any) => {
      this.account = account;
      // if (account) {
      //     this.modalRef.dismiss('cancel');
      // }
    });
    this.registerAuthenticationSuccess();
    // if (this.principal.isAuthenticated() === false) {
    //     this.modalRef = this.loginModalService.open();
    // }
  }

  ngAfterViewInit() {
    mLayout.initHeader();
  }

  changeLanguage(languageKey: string) {
    this.languageService.changeLanguage(languageKey);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  logout() {
    this.loginService.logout();
    // this.router.navigate(['']);
    this.modalRef = this.loginModalService.open();
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
  }

  registerAuthenticationSuccess() {
    this.eventManager.subscribe('authenticationSuccess', (message: any) => {
      this.accountService.identity().then((account: any) => {
        this.account = account;
      });
    });
  }
}
