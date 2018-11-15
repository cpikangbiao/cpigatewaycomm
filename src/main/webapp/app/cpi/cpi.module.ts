import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CpigatewaycommCountryModule as CpicommunicationCountryModule } from './cpicommunication/country/country.module';
import { CpigatewaycommPortModule as CpicommunicationPortModule } from './cpicommunication/port/port.module';
import { CpigatewaycommCorrespondentModule as CpicommunicationCorrespondentModule } from './cpicommunication/correspondent/correspondent.module';
import { CpigatewaycommCorrespondentContactModule as CpicommunicationCorrespondentContactModule } from './cpicommunication/correspondent-contact/correspondent-contact.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CpicommunicationCountryModule,
        CpicommunicationPortModule,
        CpicommunicationCorrespondentModule,
        CpicommunicationCorrespondentContactModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommEntityModule {}
