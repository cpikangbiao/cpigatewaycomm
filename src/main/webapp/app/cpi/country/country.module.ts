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
import { CpigatewayPortModule } from '../port/port.module';

const ENTITY_STATES = [...countryRoute, ...countryPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES), CpigatewayPortModule],
    declarations: [
        CountryComponent,
        CountryDetailComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent,
        CountrySearchComponent,
        CountrySearchPopupComponent,
        CountryEditComponent,
        CountrySelectComponent,
        CountrySelectPopupComponent
    ],
    entryComponents: [
        CountryComponent,
        CountryDetailComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent,
        CountrySearchComponent,
        CountrySearchPopupComponent,
        CountryEditComponent,
        CountrySelectComponent,
        CountrySelectPopupComponent
    ],
    providers: [CountryService, CountryPopupService, CountryResolvePagingParams, CountrySelectPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewayCountryModule {}
