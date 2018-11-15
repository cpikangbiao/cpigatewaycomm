
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CpigatewaycommButtonDemoModule } from './buttons/button/buttondemo.module';
import { CpigatewaycommSplitbuttonDemoModule } from './buttons/splitbutton/splitbuttondemo.module';

import { CpigatewaycommDialogDemoModule } from './overlay/dialog/dialogdemo.module';
import { CpigatewaycommConfirmDialogDemoModule } from './overlay/confirmdialog/confirmdialogdemo.module';
import { CpigatewaycommLightboxDemoModule } from './overlay/lightbox/lightboxdemo.module';
import { CpigatewaycommTooltipDemoModule } from './overlay/tooltip/tooltipdemo.module';
import { CpigatewaycommOverlayPanelDemoModule } from './overlay/overlaypanel/overlaypaneldemo.module';
import { CpigatewaycommSideBarDemoModule } from './overlay/sidebar/sidebardemo.module';

import { CpigatewaycommKeyFilterDemoModule } from './inputs/keyfilter/keyfilterdemo.module';
import { CpigatewaycommInputTextDemoModule } from './inputs/inputtext/inputtextdemo.module';
import { CpigatewaycommInputTextAreaDemoModule } from './inputs/inputtextarea/inputtextareademo.module';
import { CpigatewaycommInputGroupDemoModule } from './inputs/inputgroup/inputgroupdemo.module';
import { CpigatewaycommCalendarDemoModule } from './inputs/calendar/calendardemo.module';
import { CpigatewaycommCheckboxDemoModule } from './inputs/checkbox/checkboxdemo.module';
import { CpigatewaycommChipsDemoModule } from './inputs/chips/chipsdemo.module';
import { CpigatewaycommColorPickerDemoModule } from './inputs/colorpicker/colorpickerdemo.module';
import { CpigatewaycommInputMaskDemoModule } from './inputs/inputmask/inputmaskdemo.module';
import { CpigatewaycommInputSwitchDemoModule } from './inputs/inputswitch/inputswitchdemo.module';
import { CpigatewaycommPasswordIndicatorDemoModule } from './inputs/passwordindicator/passwordindicatordemo.module';
import { CpigatewaycommAutoCompleteDemoModule } from './inputs/autocomplete/autocompletedemo.module';
import { CpigatewaycommSliderDemoModule } from './inputs/slider/sliderdemo.module';
import { CpigatewaycommSpinnerDemoModule } from './inputs/spinner/spinnerdemo.module';
import { CpigatewaycommRatingDemoModule } from './inputs/rating/ratingdemo.module';
import { CpigatewaycommSelectDemoModule } from './inputs/select/selectdemo.module';
import { CpigatewaycommSelectButtonDemoModule } from './inputs/selectbutton/selectbuttondemo.module';
import { CpigatewaycommListboxDemoModule } from './inputs/listbox/listboxdemo.module';
import { CpigatewaycommRadioButtonDemoModule } from './inputs/radiobutton/radiobuttondemo.module';
import { CpigatewaycommToggleButtonDemoModule } from './inputs/togglebutton/togglebuttondemo.module';
import { CpigatewaycommEditorDemoModule } from './inputs/editor/editordemo.module';

import { CpigatewaycommGrowlDemoModule } from './messages/growl/growldemo.module';
import { CpigatewaycommMessagesDemoModule } from './messages/messages/messagesdemo.module';
/*import { CpigatewaycommToastDemoModule } from './messages/toast/toastdemo.module';*/
import { CpigatewaycommGalleriaDemoModule } from './multimedia/galleria/galleriademo.module';

import { CpigatewaycommFileUploadDemoModule } from './fileupload/fileupload/fileuploaddemo.module';

import { CpigatewaycommAccordionDemoModule } from './panel/accordion/accordiondemo.module';
import { CpigatewaycommPanelDemoModule } from './panel/panel/paneldemo.module';
import { CpigatewaycommTabViewDemoModule } from './panel/tabview/tabviewdemo.module';
import { CpigatewaycommFieldsetDemoModule } from './panel/fieldset/fieldsetdemo.module';
import { CpigatewaycommToolbarDemoModule } from './panel/toolbar/toolbardemo.module';
import { CpigatewaycommGridDemoModule } from './panel/grid/griddemo.module';
import { CpigatewaycommScrollPanelDemoModule } from './panel/scrollpanel/scrollpaneldemo.module';
import { CpigatewaycommCardDemoModule } from './panel/card/carddemo.module';

import { CpigatewaycommDataTableDemoModule } from './data/datatable/datatabledemo.module';
import { CpigatewaycommTableDemoModule } from './data/table/tabledemo.module';
import { CpigatewaycommDataGridDemoModule } from './data/datagrid/datagriddemo.module';
import { CpigatewaycommDataListDemoModule } from './data/datalist/datalistdemo.module';
import { CpigatewaycommDataScrollerDemoModule } from './data/datascroller/datascrollerdemo.module';
import { CpigatewaycommPickListDemoModule } from './data/picklist/picklistdemo.module';
import { CpigatewaycommOrderListDemoModule } from './data/orderlist/orderlistdemo.module';
import { CpigatewaycommScheduleDemoModule } from './data/schedule/scheduledemo.module';
import { CpigatewaycommTreeDemoModule } from './data/tree/treedemo.module';
import { CpigatewaycommTreeTableDemoModule } from './data/treetable/treetabledemo.module';
import { CpigatewaycommPaginatorDemoModule } from './data/paginator/paginatordemo.module';
import { CpigatewaycommGmapDemoModule } from './data/gmap/gmapdemo.module';
import { CpigatewaycommOrgChartDemoModule } from './data/orgchart/orgchartdemo.module';
import { CpigatewaycommCarouselDemoModule } from './data/carousel/carouseldemo.module';
import { CpigatewaycommDataViewDemoModule } from './data/dataview/dataviewdemo.module';

import { CpigatewaycommBarchartDemoModule } from './charts/barchart/barchartdemo.module';
import { CpigatewaycommDoughnutchartDemoModule } from './charts/doughnutchart/doughnutchartdemo.module';
import { CpigatewaycommLinechartDemoModule } from './charts/linechart/linechartdemo.module';
import { CpigatewaycommPiechartDemoModule } from './charts/piechart/piechartdemo.module';
import { CpigatewaycommPolarareachartDemoModule } from './charts/polarareachart/polarareachartdemo.module';
import { CpigatewaycommRadarchartDemoModule } from './charts/radarchart/radarchartdemo.module';

import { CpigatewaycommDragDropDemoModule } from './dragdrop/dragdrop/dragdropdemo.module';

import { CpigatewaycommMenuDemoModule } from './menu/menu/menudemo.module';
import { CpigatewaycommContextMenuDemoModule } from './menu/contextmenu/contextmenudemo.module';
import { CpigatewaycommPanelMenuDemoModule } from './menu/panelmenu/panelmenudemo.module';
import { CpigatewaycommStepsDemoModule } from './menu/steps/stepsdemo.module';
import { CpigatewaycommTieredMenuDemoModule } from './menu/tieredmenu/tieredmenudemo.module';
import { CpigatewaycommBreadcrumbDemoModule } from './menu/breadcrumb/breadcrumbdemo.module';
import { CpigatewaycommMegaMenuDemoModule } from './menu/megamenu/megamenudemo.module';
import { CpigatewaycommMenuBarDemoModule } from './menu/menubar/menubardemo.module';
import { CpigatewaycommSlideMenuDemoModule } from './menu/slidemenu/slidemenudemo.module';
import { CpigatewaycommTabMenuDemoModule } from './menu/tabmenu/tabmenudemo.module';

import { CpigatewaycommBlockUIDemoModule } from './misc/blockui/blockuidemo.module';
import { CpigatewaycommCaptchaDemoModule } from './misc/captcha/captchademo.module';
import { CpigatewaycommDeferDemoModule } from './misc/defer/deferdemo.module';
import { CpigatewaycommInplaceDemoModule } from './misc/inplace/inplacedemo.module';
import { CpigatewaycommProgressBarDemoModule } from './misc/progressbar/progressbardemo.module';
import { CpigatewaycommRTLDemoModule } from './misc/rtl/rtldemo.module';
import { CpigatewaycommTerminalDemoModule } from './misc/terminal/terminaldemo.module';
import { CpigatewaycommValidationDemoModule } from './misc/validation/validationdemo.module';
import { CpigatewaycommProgressSpinnerDemoModule } from './misc/progressspinner/progressspinnerdemo.module';

@NgModule({
    imports: [

        CpigatewaycommMenuDemoModule,
        CpigatewaycommContextMenuDemoModule,
        CpigatewaycommPanelMenuDemoModule,
        CpigatewaycommStepsDemoModule,
        CpigatewaycommTieredMenuDemoModule,
        CpigatewaycommBreadcrumbDemoModule,
        CpigatewaycommMegaMenuDemoModule,
        CpigatewaycommMenuBarDemoModule,
        CpigatewaycommSlideMenuDemoModule,
        CpigatewaycommTabMenuDemoModule,

        CpigatewaycommBlockUIDemoModule,
        CpigatewaycommCaptchaDemoModule,
        CpigatewaycommDeferDemoModule,
        CpigatewaycommInplaceDemoModule,
        CpigatewaycommProgressBarDemoModule,
        CpigatewaycommInputMaskDemoModule,
        CpigatewaycommRTLDemoModule,
        CpigatewaycommTerminalDemoModule,
        CpigatewaycommValidationDemoModule,

        CpigatewaycommButtonDemoModule,
        CpigatewaycommSplitbuttonDemoModule,

        CpigatewaycommInputTextDemoModule,
        CpigatewaycommInputTextAreaDemoModule,
        CpigatewaycommInputGroupDemoModule,
        CpigatewaycommCalendarDemoModule,
        CpigatewaycommChipsDemoModule,
        CpigatewaycommInputMaskDemoModule,
        CpigatewaycommInputSwitchDemoModule,
        CpigatewaycommPasswordIndicatorDemoModule,
        CpigatewaycommAutoCompleteDemoModule,
        CpigatewaycommSliderDemoModule,
        CpigatewaycommSpinnerDemoModule,
        CpigatewaycommRatingDemoModule,
        CpigatewaycommSelectDemoModule,
        CpigatewaycommSelectButtonDemoModule,
        CpigatewaycommListboxDemoModule,
        CpigatewaycommRadioButtonDemoModule,
        CpigatewaycommToggleButtonDemoModule,
        CpigatewaycommEditorDemoModule,
        CpigatewaycommColorPickerDemoModule,
        CpigatewaycommCheckboxDemoModule,
        CpigatewaycommKeyFilterDemoModule,

        CpigatewaycommGrowlDemoModule,
        CpigatewaycommMessagesDemoModule,
        /*CpigatewaycommToastDemoModule,*/
        CpigatewaycommGalleriaDemoModule,

        CpigatewaycommFileUploadDemoModule,

        CpigatewaycommAccordionDemoModule,
        CpigatewaycommPanelDemoModule,
        CpigatewaycommTabViewDemoModule,
        CpigatewaycommFieldsetDemoModule,
        CpigatewaycommToolbarDemoModule,
        CpigatewaycommGridDemoModule,
        CpigatewaycommScrollPanelDemoModule,
        CpigatewaycommCardDemoModule,

        CpigatewaycommBarchartDemoModule,
        CpigatewaycommDoughnutchartDemoModule,
        CpigatewaycommLinechartDemoModule,
        CpigatewaycommPiechartDemoModule,
        CpigatewaycommPolarareachartDemoModule,
        CpigatewaycommRadarchartDemoModule,

        CpigatewaycommDragDropDemoModule,

        CpigatewaycommDialogDemoModule,
        CpigatewaycommConfirmDialogDemoModule,
        CpigatewaycommLightboxDemoModule,
        CpigatewaycommTooltipDemoModule,
        CpigatewaycommOverlayPanelDemoModule,
        CpigatewaycommSideBarDemoModule,

        CpigatewaycommDataTableDemoModule,
        CpigatewaycommTableDemoModule,
        CpigatewaycommDataGridDemoModule,
        CpigatewaycommDataListDemoModule,
        CpigatewaycommDataViewDemoModule,
        CpigatewaycommDataScrollerDemoModule,
        CpigatewaycommScheduleDemoModule,
        CpigatewaycommOrderListDemoModule,
        CpigatewaycommPickListDemoModule,
        CpigatewaycommTreeDemoModule,
        CpigatewaycommTreeTableDemoModule,
        CpigatewaycommPaginatorDemoModule,
        CpigatewaycommOrgChartDemoModule,
        CpigatewaycommGmapDemoModule,
        CpigatewaycommCarouselDemoModule,
        CpigatewaycommProgressSpinnerDemoModule

    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CpigatewaycommprimengModule {}
