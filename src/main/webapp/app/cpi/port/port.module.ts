import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CpigatewaycommSharedModule } from 'app/shared';
import { portRoute, portPopupRoute } from './port.route';
import {
    PortComponent,
    PortDetailComponent,
    PortDeletePopupComponent,
    PortDeleteDialogComponent,
    PortSelectComponent,
    PortSelectPopupComponent,
    PortEditComponent,
    PortListComponent
} from './';

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
        PortEditComponent,
        PortListComponent
    ],
    entryComponents: [
        PortComponent,
        PortDetailComponent,
        PortDeleteDialogComponent,
        PortDeletePopupComponent,
        PortSelectComponent,
        PortSelectPopupComponent,
        PortEditComponent,
        PortListComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [PortListComponent]
})
export class CpigatewayPortModule {}
