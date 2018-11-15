import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CpigatewaycommSharedModule } from 'src/main/webapp/app/shared/index';
import {
    CountryComponent,
    CountryDetailComponent,
    CountryUpdateComponent,
    CountryDeletePopupComponent,
    CountryDeleteDialogComponent,
    countryRoute,
    countryPopupRoute
} from './index';

const ENTITY_STATES = [...countryRoute, ...countryPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountryComponent,
        CountryDetailComponent,
        CountryUpdateComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent
    ],
    entryComponents: [CountryComponent, CountryUpdateComponent, CountryDeleteDialogComponent, CountryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommCountryModule {}
