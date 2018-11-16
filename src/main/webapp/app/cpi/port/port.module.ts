import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CpigatewaycommSharedModule } from 'app/shared';
import { portRoute, portPopupRoute, PortResolvePagingParams } from './port.route';
import {
    PortService,
    PortPopupService,
    PortComponent,
    PortDetailComponent,
    PortDeletePopupComponent,
    PortDeleteDialogComponent,
    PortSelectComponent,
    PortSelectPopupComponent,
    PortSelectPopupService,
    PortEditComponent
} from './index';

const ENTITY_STATES = [...portRoute, ...portPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES), DropdownModule],
    declarations: [
        PortComponent,
        PortDetailComponent,
        PortDeleteDialogComponent,
        PortDeletePopupComponent,
        PortSelectComponent,
        PortSelectPopupComponent,
        PortEditComponent
    ],
    entryComponents: [
        PortComponent,
        PortDeleteDialogComponent,
        PortDeletePopupComponent,
        PortSelectComponent,
        PortSelectPopupComponent,
        PortEditComponent
    ],
    providers: [PortService, PortPopupService, PortResolvePagingParams, PortSelectPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewayPortModule {}
