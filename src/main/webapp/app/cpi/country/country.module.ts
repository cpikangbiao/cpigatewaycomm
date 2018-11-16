import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CpigatewaycommSharedModule } from 'app/shared';
import { countryRoute, countryPopupRoute, CountryResolvePagingParams } from './country.route';
import {
    CountryService,
    CountryPopupService,
    CountryComponent,
    CountryDetailComponent,
    CountryDeletePopupComponent,
    CountryDeleteDialogComponent,
    CountrySearchComponent,
    CountrySearchPopupComponent,
    CountryEditComponent,
    CountrySelectComponent,
    CountrySelectPopupComponent,
    CountrySelectPopupService
} from './';

import { PortListComponent } from '../port';

const ENTITY_STATES = [...countryRoute, ...countryPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CountryComponent,
        CountryDetailComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent,
        CountrySearchComponent,
        CountrySearchPopupComponent,
        PortListComponent,
        CountryEditComponent,
        CountrySelectComponent,
        CountrySelectPopupComponent
    ],
    entryComponents: [
        CountryComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent,
        CountrySearchComponent,
        CountrySearchPopupComponent,
        PortListComponent,
        CountryEditComponent,
        CountrySelectComponent,
        CountrySelectPopupComponent
    ],
    providers: [CountryService, CountryPopupService, CountryResolvePagingParams, CountrySelectPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewayCountryModule {}
