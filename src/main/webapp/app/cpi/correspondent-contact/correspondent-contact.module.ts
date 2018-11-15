import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CpigatewaycommSharedModule } from 'src/main/webapp/app/shared/index';
import {
    CorrespondentContactComponent,
    CorrespondentContactDetailComponent,
    CorrespondentContactUpdateComponent,
    CorrespondentContactDeletePopupComponent,
    CorrespondentContactDeleteDialogComponent,
    correspondentContactRoute,
    correspondentContactPopupRoute
} from './index';

const ENTITY_STATES = [...correspondentContactRoute, ...correspondentContactPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CorrespondentContactComponent,
        CorrespondentContactDetailComponent,
        CorrespondentContactUpdateComponent,
        CorrespondentContactDeleteDialogComponent,
        CorrespondentContactDeletePopupComponent
    ],
    entryComponents: [
        CorrespondentContactComponent,
        CorrespondentContactUpdateComponent,
        CorrespondentContactDeleteDialogComponent,
        CorrespondentContactDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommCorrespondentContactModule {}
