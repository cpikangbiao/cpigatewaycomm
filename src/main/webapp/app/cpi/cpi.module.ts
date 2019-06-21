import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CpigatewayCountryModule } from 'app/cpi/country/country.module';
import { CpigatewayPortModule } from 'app/cpi/port/port.module';
import { CpigatewayCorrespondentModule } from 'app/cpi/correspondent/correspondent.module';
import { CpigatewayCorrespondentContactModule } from 'app/cpi/correspondent-contact/correspondent-contact.module';

@NgModule({
  imports: [CpigatewayCountryModule, CpigatewayPortModule, CpigatewayCorrespondentModule, CpigatewayCorrespondentContactModule],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommCpiModule {}
