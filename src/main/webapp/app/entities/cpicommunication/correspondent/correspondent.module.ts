import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CpigatewaycommSharedModule } from 'app/shared';
import {
    CorrespondentComponent,
    CorrespondentDetailComponent,
    CorrespondentUpdateComponent,
    CorrespondentDeletePopupComponent,
    CorrespondentDeleteDialogComponent,
    correspondentRoute,
    correspondentPopupRoute
} from './';

const ENTITY_STATES = [...correspondentRoute, ...correspondentPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CorrespondentComponent,
        CorrespondentDetailComponent,
        CorrespondentUpdateComponent,
        CorrespondentDeleteDialogComponent,
        CorrespondentDeletePopupComponent
    ],
    entryComponents: [
        CorrespondentComponent,
        CorrespondentUpdateComponent,
        CorrespondentDeleteDialogComponent,
        CorrespondentDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommCorrespondentModule {}
