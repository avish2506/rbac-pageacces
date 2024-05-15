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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ManageAccessRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: ManageAccessRadioModule, declarations: [ManageAccessRadioComponent], imports: [CommonModule,
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
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ManageAccessRadioModule, imports: [CommonModule,
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
            DropdownModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ManageAccessRadioModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFjY2Vzcy1yYWRpby5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQHNoYXJlZC9jb21tb24tY29tcG9uZW50cy9tYW5hZ2UtYWNjZXNzLXJhZGlvL21hbmFnZS1hY2Nlc3MtcmFkaW8ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saURBQWlELENBQUM7OztBQXFCbkYsTUFBTSxPQUFPLHVCQUF1Qjt3R0FBdkIsdUJBQXVCO3lHQUF2Qix1QkFBdUIsaUJBbkJuQiwwQkFBMEIsYUFFdkMsWUFBWTtZQUNaLG1CQUFtQjtZQUNuQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtZQUNqQixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQix3QkFBd0I7WUFDeEIsd0JBQXdCO1lBQ3hCLGdCQUFnQixvQkFFaEIsY0FBYyxhQUVOLDBCQUEwQjt5R0FHekIsdUJBQXVCLFlBakJoQyxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLHdCQUF3QjtZQUN4Qix3QkFBd0I7WUFDeEIsZ0JBQWdCO1lBQ2hCLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsY0FBYzs7NEZBS0wsdUJBQXVCO2tCQXBCbkMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztvQkFDMUMsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQix3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsZ0JBQWdCO3dCQUNoQixhQUFhLENBQUMsT0FBTyxFQUFFO3dCQUN2QixjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUNyQyxPQUFPLEVBQUMsQ0FBQyxzQkFBc0IsRUFBQyxnQkFBZ0IsQ0FBQztpQkFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDVVNUT01fRUxFTUVOVFNfU0NIRU1BLCBOT19FUlJPUlNfU0NIRU1BLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRGlyZWN0aXZlc01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL0Bjb3JlL2RpcmVjdGl2ZXMvZGlyZWN0aXZlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBTaGFyZWRQaXBlc01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL0Bjb3JlL3BpcGUvc2hhcmVkLXBpcGVzLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFuZ3VsYXJNdWx0aVNlbGVjdE1vZHVsZSB9IGZyb20gJ2FuZ3VsYXIyLW11bHRpc2VsZWN0LWRyb3Bkb3duJztcclxuaW1wb3J0IHsgRHhEYXRhR3JpZE1vZHVsZSB9IGZyb20gJ2RldmV4dHJlbWUtYW5ndWxhcic7XHJcbmltcG9ydCB7IE5neE1hc2tNb2R1bGUgfSBmcm9tICduZ3gtbWFzayc7XHJcbmltcG9ydCB7IE5neE1hdFNlbGVjdFNlYXJjaE1vZHVsZSB9IGZyb20gJ25neC1tYXQtc2VsZWN0LXNlYXJjaCc7XHJcbmltcG9ydCB7IE5neFBhZ2luYXRpb25Nb2R1bGUgfSBmcm9tICduZ3gtcGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IE5neGZVcGxvYWRlck1vZHVsZSB9IGZyb20gJ25neGYtdXBsb2FkZXInO1xyXG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xyXG5pbXBvcnQgeyBNYW5hZ2VBY2Nlc3NSYWRpb0NvbXBvbmVudCB9IGZyb20gJy4vbWFuYWdlLWFjY2Vzcy1yYWRpby5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbFVJTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vQHNoYXJlZC9tYXRlcmlhbC11aS9tYXRlcmlhbC11aS5tb2R1bGUnO1xyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW01hbmFnZUFjY2Vzc1JhZGlvQ29tcG9uZW50XSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBOZ3hQYWdpbmF0aW9uTW9kdWxlLFxyXG4gICAgRHhEYXRhR3JpZE1vZHVsZSxcclxuICAgIE1hdGVyaWFsVUlNb2R1bGUsXHJcbiAgICBTaGFyZWRQaXBlc01vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIE5neGZVcGxvYWRlck1vZHVsZSxcclxuICAgIE5neE1hdFNlbGVjdFNlYXJjaE1vZHVsZSxcclxuICAgIEFuZ3VsYXJNdWx0aVNlbGVjdE1vZHVsZSxcclxuICAgIERpcmVjdGl2ZXNNb2R1bGUsXHJcbiAgICBOZ3hNYXNrTW9kdWxlLmZvclJvb3QoKSxcclxuICAgIERyb3Bkb3duTW9kdWxlXHJcbiAgXSxcclxuICBleHBvcnRzOiBbTWFuYWdlQWNjZXNzUmFkaW9Db21wb25lbnRdLFxyXG4gIHNjaGVtYXM6W0NVU1RPTV9FTEVNRU5UU19TQ0hFTUEsTk9fRVJST1JTX1NDSEVNQV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hbmFnZUFjY2Vzc1JhZGlvTW9kdWxlIHt9XHJcbiJdfQ==