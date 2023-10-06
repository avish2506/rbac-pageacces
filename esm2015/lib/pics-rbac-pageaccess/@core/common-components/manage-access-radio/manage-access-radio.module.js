import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
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
                    exports: [ManageAccessRadioComponent],
                    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFjY2Vzcy1yYWRpby5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQGNvcmUvY29tbW9uLWNvbXBvbmVudHMvbWFuYWdlLWFjY2Vzcy1yYWRpby9tYW5hZ2UtYWNjZXNzLXJhZGlvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7QUFxQm5GLE1BQU0sT0FBTyx1QkFBdUI7O3FIQUF2Qix1QkFBdUI7c0hBQXZCLHVCQUF1QixpQkFuQm5CLDBCQUEwQixhQUV2QyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsa0JBQWtCO1FBQ2xCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsZ0JBQWdCLG9CQUVoQixjQUFjLGFBRU4sMEJBQTBCO3NIQUd6Qix1QkFBdUIsWUFsQnpCO1lBQ1AsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtZQUNqQixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQix3QkFBd0I7WUFDeEIsd0JBQXdCO1lBQ3hCLGdCQUFnQjtZQUNoQixhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLGNBQWM7U0FDZjs0RkFJVSx1QkFBdUI7a0JBcEJuQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUMxQyxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLFdBQVc7d0JBQ1gsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4QixnQkFBZ0I7d0JBQ2hCLGFBQWEsQ0FBQyxPQUFPLEVBQUU7d0JBQ3ZCLGNBQWM7cUJBQ2Y7b0JBQ0QsT0FBTyxFQUFFLENBQUMsMEJBQTBCLENBQUM7b0JBQ3JDLE9BQU8sRUFBQyxDQUFDLHNCQUFzQixFQUFDLGdCQUFnQixDQUFDO2lCQUNsRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IENVU1RPTV9FTEVNRU5UU19TQ0hFTUEsIE5PX0VSUk9SU19TQ0hFTUEsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBEaXJlY3RpdmVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9kaXJlY3RpdmVzLm1vZHVsZSc7XHJcbmltcG9ydCB7IFNoYXJlZFBpcGVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vcGlwZS9zaGFyZWQtcGlwZXMubW9kdWxlJztcclxuaW1wb3J0IHsgQW5ndWxhck11bHRpU2VsZWN0TW9kdWxlIH0gZnJvbSAnYW5ndWxhcjItbXVsdGlzZWxlY3QtZHJvcGRvd24nO1xyXG5pbXBvcnQgeyBEeERhdGFHcmlkTW9kdWxlIH0gZnJvbSAnZGV2ZXh0cmVtZS1hbmd1bGFyJztcclxuaW1wb3J0IHsgTmd4TWFza01vZHVsZSB9IGZyb20gJ25neC1tYXNrJztcclxuaW1wb3J0IHsgTmd4TWF0U2VsZWN0U2VhcmNoTW9kdWxlIH0gZnJvbSAnbmd4LW1hdC1zZWxlY3Qtc2VhcmNoJztcclxuaW1wb3J0IHsgTmd4UGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcclxuaW1wb3J0IHsgTmd4ZlVwbG9hZGVyTW9kdWxlIH0gZnJvbSAnbmd4Zi11cGxvYWRlcic7XHJcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XHJcbmltcG9ydCB7IE1hbmFnZUFjY2Vzc1JhZGlvQ29tcG9uZW50IH0gZnJvbSAnLi9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdGVyaWFsVUlNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi9Ac2hhcmVkL21hdGVyaWFsLXVpL21hdGVyaWFsLXVpLm1vZHVsZSc7XHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTWFuYWdlQWNjZXNzUmFkaW9Db21wb25lbnRdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE5neFBhZ2luYXRpb25Nb2R1bGUsXHJcbiAgICBEeERhdGFHcmlkTW9kdWxlLFxyXG4gICAgTWF0ZXJpYWxVSU1vZHVsZSxcclxuICAgIFNoYXJlZFBpcGVzTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTmd4ZlVwbG9hZGVyTW9kdWxlLFxyXG4gICAgTmd4TWF0U2VsZWN0U2VhcmNoTW9kdWxlLFxyXG4gICAgQW5ndWxhck11bHRpU2VsZWN0TW9kdWxlLFxyXG4gICAgRGlyZWN0aXZlc01vZHVsZSxcclxuICAgIE5neE1hc2tNb2R1bGUuZm9yUm9vdCgpLFxyXG4gICAgRHJvcGRvd25Nb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtNYW5hZ2VBY2Nlc3NSYWRpb0NvbXBvbmVudF0sXHJcbiAgc2NoZW1hczpbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSxOT19FUlJPUlNfU0NIRU1BXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFuYWdlQWNjZXNzUmFkaW9Nb2R1bGUge31cclxuIl19