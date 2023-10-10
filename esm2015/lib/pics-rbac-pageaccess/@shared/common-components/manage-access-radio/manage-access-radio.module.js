import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../@core/directives/directives.module';
import { SharedPipesModule } from '../../../@core/pipe/shared-pipes.module';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { DxDataGridModule } from 'devextreme-angular';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { DropdownModule } from 'primeng/dropdown';
import { ManageAccessRadioComponent } from './manage-access-radio.component';
import { MaterialUIModule } from '../../../@shared/material-ui/material-ui.module';
import * as i0 from "@angular/core";
import * as i1 from "ngx-mask";
export class ManageAccessRadioModule {
}
ManageAccessRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ManageAccessRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ManageAccessRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ManageAccessRadioModule, declarations: [ManageAccessRadioComponent], imports: [CommonModule,
        NgxPaginationModule,
        DxDataGridModule,
        MaterialUIModule,
        SharedPipesModule,
        FormsModule,
        ReactiveFormsModule,
        NgxfUploaderModule,
        NgxMatSelectSearchModule,
        AngularMultiSelectModule,
        DirectivesModule, i1.NgxMaskModule, DropdownModule], exports: [ManageAccessRadioComponent] });
ManageAccessRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ManageAccessRadioModule, imports: [[
            CommonModule,
            NgxPaginationModule,
            DxDataGridModule,
            MaterialUIModule,
            SharedPipesModule,
            FormsModule,
            ReactiveFormsModule,
            NgxfUploaderModule,
            NgxMatSelectSearchModule,
            AngularMultiSelectModule,
            DirectivesModule,
            NgxMaskModule.forRoot(),
            DropdownModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ManageAccessRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ManageAccessRadioComponent],
                    imports: [
                        CommonModule,
                        NgxPaginationModule,
                        DxDataGridModule,
                        MaterialUIModule,
                        SharedPipesModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgxfUploaderModule,
                        NgxMatSelectSearchModule,
                        AngularMultiSelectModule,
                        DirectivesModule,
                        NgxMaskModule.forRoot(),
                        DropdownModule
                    ],
                    exports: [ManageAccessRadioComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFjY2Vzcy1yYWRpby5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQHNoYXJlZC9jb21tb24tY29tcG9uZW50cy9tYW5hZ2UtYWNjZXNzLXJhZGlvL21hbmFnZS1hY2Nlc3MtcmFkaW8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saURBQWlELENBQUM7OztBQXFCbkYsTUFBTSxPQUFPLHVCQUF1Qjs7cUhBQXZCLHVCQUF1QjtzSEFBdkIsdUJBQXVCLGlCQW5CbkIsMEJBQTBCLGFBRXZDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4QixnQkFBZ0Isb0JBRWhCLGNBQWMsYUFFTiwwQkFBMEI7c0hBR3pCLHVCQUF1QixZQWxCekI7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLHdCQUF3QjtZQUN4Qix3QkFBd0I7WUFDeEIsZ0JBQWdCO1lBQ2hCLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsY0FBYztTQUNmOzRGQUlVLHVCQUF1QjtrQkFwQm5DLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQzFDLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsd0JBQXdCO3dCQUN4Qix3QkFBd0I7d0JBQ3hCLGdCQUFnQjt3QkFDaEIsYUFBYSxDQUFDLE9BQU8sRUFBRTt3QkFDdkIsY0FBYztxQkFDZjtvQkFDRCxPQUFPLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDckMsT0FBTyxFQUFDLENBQUMsc0JBQXNCLEVBQUMsZ0JBQWdCLENBQUM7aUJBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSwgTk9fRVJST1JTX1NDSEVNQSwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERpcmVjdGl2ZXNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9AY29yZS9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMubW9kdWxlJztcclxuaW1wb3J0IHsgU2hhcmVkUGlwZXNNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9AY29yZS9waXBlL3NoYXJlZC1waXBlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBbmd1bGFyTXVsdGlTZWxlY3RNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1tdWx0aXNlbGVjdC1kcm9wZG93bic7XHJcbmltcG9ydCB7IER4RGF0YUdyaWRNb2R1bGUgfSBmcm9tICdkZXZleHRyZW1lLWFuZ3VsYXInO1xyXG5pbXBvcnQgeyBOZ3hNYXNrTW9kdWxlIH0gZnJvbSAnbmd4LW1hc2snO1xyXG5pbXBvcnQgeyBOZ3hNYXRTZWxlY3RTZWFyY2hNb2R1bGUgfSBmcm9tICduZ3gtbWF0LXNlbGVjdC1zZWFyY2gnO1xyXG5pbXBvcnQgeyBOZ3hQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xyXG5pbXBvcnQgeyBOZ3hmVXBsb2FkZXJNb2R1bGUgfSBmcm9tICduZ3hmLXVwbG9hZGVyJztcclxuaW1wb3J0IHsgRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2Ryb3Bkb3duJztcclxuaW1wb3J0IHsgTWFuYWdlQWNjZXNzUmFkaW9Db21wb25lbnQgfSBmcm9tICcuL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0ZXJpYWxVSU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL0BzaGFyZWQvbWF0ZXJpYWwtdWkvbWF0ZXJpYWwtdWkubW9kdWxlJztcclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtNYW5hZ2VBY2Nlc3NSYWRpb0NvbXBvbmVudF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcclxuICAgIER4RGF0YUdyaWRNb2R1bGUsXHJcbiAgICBNYXRlcmlhbFVJTW9kdWxlLFxyXG4gICAgU2hhcmVkUGlwZXNNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBOZ3hmVXBsb2FkZXJNb2R1bGUsXHJcbiAgICBOZ3hNYXRTZWxlY3RTZWFyY2hNb2R1bGUsXHJcbiAgICBBbmd1bGFyTXVsdGlTZWxlY3RNb2R1bGUsXHJcbiAgICBEaXJlY3RpdmVzTW9kdWxlLFxyXG4gICAgTmd4TWFza01vZHVsZS5mb3JSb290KCksXHJcbiAgICBEcm9wZG93bk1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW01hbmFnZUFjY2Vzc1JhZGlvQ29tcG9uZW50XSxcclxuICBzY2hlbWFzOltDVVNUT01fRUxFTUVOVFNfU0NIRU1BLE5PX0VSUk9SU19TQ0hFTUFdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYW5hZ2VBY2Nlc3NSYWRpb01vZHVsZSB7fVxyXG4iXX0=