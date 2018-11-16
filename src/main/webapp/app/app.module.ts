import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CpigatewaycommSharedModule } from 'app/shared';
import { CpigatewaycommCoreModule } from 'app/core';
import { CpigatewaycommAppRoutingModule } from './app-routing.module';
import { CpigatewaycommHomeModule } from 'app/home';
import { CpigatewaycommAccountModule } from './account/account.module';
import { CpigatewaycommEntityModule } from 'app/cpi/cpi.module';
import { CpigatewaycommprimengModule } from './primeng/primeng.module';
import {
    JhiMainComponent,
    FooterComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent,
    HeaderNavComponent,
    AsideNavComponent,
    ScrollTopComponent,
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        CpigatewaycommAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        CpigatewaycommSharedModule,
        CpigatewaycommCoreModule,
        CpigatewaycommHomeModule,
        CpigatewaycommAccountModule,
        CpigatewaycommEntityModule,
        CpigatewaycommprimengModule,
    ],
    declarations: [
        JhiMainComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        HeaderNavComponent,
        AsideNavComponent,
        ScrollTopComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class CpigatewaycommAppModule {}
