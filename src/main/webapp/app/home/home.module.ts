import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CpigatewaycommSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
  imports: [CpigatewaycommSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommHomeModule {}
