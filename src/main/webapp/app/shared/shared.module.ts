import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CpigatewaycommSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [CpigatewaycommSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [CpigatewaycommSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommSharedModule {
  static forRoot() {
    return {
      ngModule: CpigatewaycommSharedModule
    };
  }
}
