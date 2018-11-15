import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CpigatewaycommSharedModule } from 'app/shared';
import {
    PortComponent,
    PortDetailComponent,
    PortUpdateComponent,
    PortDeletePopupComponent,
    PortDeleteDialogComponent,
    portRoute,
    portPopupRoute
} from './';

const ENTITY_STATES = [...portRoute, ...portPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PortComponent, PortDetailComponent, PortUpdateComponent, PortDeleteDialogComponent, PortDeletePopupComponent],
    entryComponents: [PortComponent, PortUpdateComponent, PortDeleteDialogComponent, PortDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommPortModule {}
