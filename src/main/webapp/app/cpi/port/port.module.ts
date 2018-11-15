import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CpigatewaycommSharedModule } from 'src/main/webapp/app/shared/index';
import {
    PortComponent,
    PortDetailComponent,
    PortUpdateComponent,
    PortDeletePopupComponent,
    PortDeleteDialogComponent,
    portRoute,
    portPopupRoute
} from './index';

const ENTITY_STATES = [...portRoute, ...portPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [PortComponent, PortDetailComponent, PortUpdateComponent, PortDeleteDialogComponent, PortDeletePopupComponent],
    entryComponents: [PortComponent, PortUpdateComponent, PortDeleteDialogComponent, PortDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommPortModule {}
