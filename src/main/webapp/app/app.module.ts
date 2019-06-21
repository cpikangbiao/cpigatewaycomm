import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CpigatewaycommSharedModule } from 'app/shared';
import { CpigatewaycommCoreModule } from 'app/core';
import { CpigatewaycommAppRoutingModule } from './app-routing.module';
import { CpigatewaycommHomeModule } from 'app/home';
import { CpigatewaycommAccountModule } from './account/account.module';

import { CpigatewaycommCpiModule } from './cpi/cpi.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
  JhiMainComponent,
  HeaderNavComponent,
  FooterComponent,
  PageRibbonComponent,
  ActiveMenuDirective,
  ErrorComponent,
  AsideNavComponent,
  NavbarComponent
} from './layouts';

@NgModule({
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot({ prefix: 'jhi', separator: '-' }),
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
      alertTimeout: 5000,
      i18nEnabled: true,
      defaultI18nLang: 'en'
    }),
    CpigatewaycommSharedModule.forRoot(),
    CpigatewaycommCoreModule,
    CpigatewaycommHomeModule,
    CpigatewaycommAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    CpigatewaycommCpiModule,
    CpigatewaycommAppRoutingModule
  ],
  declarations: [
    JhiMainComponent,
    HeaderNavComponent,
    NavbarComponent,
    AsideNavComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true
    }
  ],
  bootstrap: [JhiMainComponent]
})
export class CpigatewaycommAppModule {
  constructor(private dpConfig: NgbDatepickerConfig) {
    this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
