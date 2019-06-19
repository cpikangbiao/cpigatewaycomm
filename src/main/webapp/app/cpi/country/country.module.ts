import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CpigatewaycommSharedModule } from 'app/shared';
import { countryRoute, countryPopupRoute } from './country.route';
import {
    CountryComponent,
    CountryDetailComponent,
    CountryDeletePopupComponent,
    CountryDeleteDialogComponent,
    CountryEditComponent,
    CountrySelectComponent,
    CountrySelectPopupComponent
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
        CountryEditComponent,
        CountrySelectComponent,
        CountrySelectPopupComponent
    ],
    entryComponents: [
        CountryComponent,
        CountryDetailComponent,
        CountryDeleteDialogComponent,
        CountryDeletePopupComponent,
        CountryEditComponent,
        CountrySelectComponent,
        CountrySelectPopupComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewayCountryModule {}
