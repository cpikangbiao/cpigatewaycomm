import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CpigatewaycommSharedModule } from 'app/shared';
import { correspondentRoute, correspondentPopupRoute, CorrespondentResolvePagingParams } from './correspondent.route';
import {
    CorrespondentService,
    CorrespondentPopupService,
    CorrespondentComponent,
    CorrespondentDetailComponent,
    CorrespondentDeletePopupComponent,
    CorrespondentDeleteDialogComponent,
    CorrespondentSelectComponent,
    CorrespondentSelectPopupComponent,
    CorrespondentSelectPopupService,
    CorrespondentEditComponent
} from './index';
import { CpigatewayCorrespondentContactModule } from '../correspondent-contact/correspondent-contact.module';

const ENTITY_STATES = [...correspondentRoute, ...correspondentPopupRoute];

@NgModule({
    imports: [CpigatewaycommSharedModule, RouterModule.forChild(ENTITY_STATES), CpigatewayCorrespondentContactModule],
    declarations: [
        CorrespondentComponent,
        CorrespondentDetailComponent,
        CorrespondentDeleteDialogComponent,
        CorrespondentDeletePopupComponent,
        CorrespondentSelectComponent,
        CorrespondentSelectPopupComponent,
        CorrespondentEditComponent
    ],
    entryComponents: [
        CorrespondentComponent,
        CorrespondentDetailComponent,
        CorrespondentDeleteDialogComponent,
        CorrespondentDeletePopupComponent,
        CorrespondentSelectComponent,
        CorrespondentSelectPopupComponent,
        CorrespondentEditComponent
    ],
    providers: [CorrespondentService, CorrespondentPopupService, CorrespondentResolvePagingParams, CorrespondentSelectPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewayCorrespondentModule {}
