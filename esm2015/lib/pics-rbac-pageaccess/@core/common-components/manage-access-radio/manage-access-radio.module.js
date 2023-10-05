import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../directives/directives.module';
import { SharedPipesModule } from '../../pipe/shared-pipes.module';
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
                    exports: [ManageAccessRadioComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFjY2Vzcy1yYWRpby5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQGNvcmUvY29tbW9uLWNvbXBvbmVudHMvbWFuYWdlLWFjY2Vzcy1yYWRpby9tYW5hZ2UtYWNjZXNzLXJhZGlvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7QUFvQm5GLE1BQU0sT0FBTyx1QkFBdUI7O3FIQUF2Qix1QkFBdUI7c0hBQXZCLHVCQUF1QixpQkFsQm5CLDBCQUEwQixhQUV2QyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsa0JBQWtCO1FBQ2xCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsZ0JBQWdCLG9CQUVoQixjQUFjLGFBRU4sMEJBQTBCO3NIQUV6Qix1QkFBdUIsWUFqQnpCO1lBQ1AsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtZQUNqQixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQix3QkFBd0I7WUFDeEIsd0JBQXdCO1lBQ3hCLGdCQUFnQjtZQUNoQixhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLGNBQWM7U0FDZjs0RkFHVSx1QkFBdUI7a0JBbkJuQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUMxQyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4QixnQkFBZ0I7d0JBQ2hCLGFBQWEsQ0FBQyxPQUFPLEVBQUU7d0JBQ3ZCLGNBQWM7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFLENBQUMsMEJBQTBCLENBQUM7aUJBQ3RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERpcmVjdGl2ZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMubW9kdWxlJztcclxuaW1wb3J0IHsgU2hhcmVkUGlwZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlL3NoYXJlZC1waXBlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBbmd1bGFyTXVsdGlTZWxlY3RNb2R1bGUgfSBmcm9tICdhbmd1bGFyMi1tdWx0aXNlbGVjdC1kcm9wZG93bic7XHJcbmltcG9ydCB7IER4RGF0YUdyaWRNb2R1bGUgfSBmcm9tICdkZXZleHRyZW1lLWFuZ3VsYXInO1xyXG5pbXBvcnQgeyBOZ3hNYXNrTW9kdWxlIH0gZnJvbSAnbmd4LW1hc2snO1xyXG5pbXBvcnQgeyBOZ3hNYXRTZWxlY3RTZWFyY2hNb2R1bGUgfSBmcm9tICduZ3gtbWF0LXNlbGVjdC1zZWFyY2gnO1xyXG5pbXBvcnQgeyBOZ3hQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xyXG5pbXBvcnQgeyBOZ3hmVXBsb2FkZXJNb2R1bGUgfSBmcm9tICduZ3hmLXVwbG9hZGVyJztcclxuaW1wb3J0IHsgRHJvcGRvd25Nb2R1bGUgfSBmcm9tICdwcmltZW5nL2Ryb3Bkb3duJztcclxuaW1wb3J0IHsgTWFuYWdlQWNjZXNzUmFkaW9Db21wb25lbnQgfSBmcm9tICcuL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0ZXJpYWxVSU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL0BzaGFyZWQvbWF0ZXJpYWwtdWkvbWF0ZXJpYWwtdWkubW9kdWxlJztcclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFtNYW5hZ2VBY2Nlc3NSYWRpb0NvbXBvbmVudF0sXHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTmd4UGFnaW5hdGlvbk1vZHVsZSxcclxuICAgIER4RGF0YUdyaWRNb2R1bGUsXHJcbiAgICBNYXRlcmlhbFVJTW9kdWxlLFxyXG4gICAgU2hhcmVkUGlwZXNNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBOZ3hmVXBsb2FkZXJNb2R1bGUsXHJcbiAgICBOZ3hNYXRTZWxlY3RTZWFyY2hNb2R1bGUsXHJcbiAgICBBbmd1bGFyTXVsdGlTZWxlY3RNb2R1bGUsXHJcbiAgICBEaXJlY3RpdmVzTW9kdWxlLFxyXG4gICAgTmd4TWFza01vZHVsZS5mb3JSb290KCksXHJcbiAgICBEcm9wZG93bk1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW01hbmFnZUFjY2Vzc1JhZGlvQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFuYWdlQWNjZXNzUmFkaW9Nb2R1bGUge31cclxuIl19