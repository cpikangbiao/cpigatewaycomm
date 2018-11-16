import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CpigatewaycommSharedModule } from 'app/shared';
import {
    correspondentContactRoute,
    correspondentContactPopupRoute,
    CorrespondentContactResolvePagingParams
} from './correspondent-contact.route';
import {
    CorrespondentContactService,
    CorrespondentContactPopupService,
    CorrespondentContactComponent,
    CorrespondentContactDetailComponent,
    CorrespondentContactDeletePopupComponent,
    CorrespondentContactDeleteDialogComponent,
    CorrespondentContactEditComponent,
    CorrespondentContactListComponent
} from './index';

const ENTITY_STATES = [
    ...correspondentContactRoute,
    ...correspondentContactPopupRoute,
];

@NgModule({
    imports: [
        CpigatewaycommSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CorrespondentContactComponent,
        CorrespondentContactDetailComponent,
        CorrespondentContactDeleteDialogComponent,
        CorrespondentContactDeletePopupComponent,
        CorrespondentContactEditComponent,
        CorrespondentContactListComponent
    ],
    providers: [
        CorrespondentContactService,
        CorrespondentContactPopupService,
        CorrespondentContactResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [CorrespondentContactListComponent]
})
export class CpigatewayCorrespondentContactModule {}
