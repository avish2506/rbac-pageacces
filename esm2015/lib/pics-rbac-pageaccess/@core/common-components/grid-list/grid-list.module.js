import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from '../../pipe/shared-pipes.module';
import { DxDataGridModule } from 'devextreme-angular';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxfUploaderModule } from 'ngxf-uploader';
import { GridListComponent } from './grid-list.component';
import { MaterialUIModule } from '../../../@shared/material-ui/material-ui.module';
import * as i0 from "@angular/core";
import * as i1 from "ngx-mask";
export class GridListModule {
}
GridListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GridListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
GridListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GridListModule, declarations: [GridListComponent], imports: [CommonModule,
        NgxPaginationModule,
        DxDataGridModule,
        MaterialUIModule,
        SharedPipesModule,
        FormsModule,
        ReactiveFormsModule,
        NgxfUploaderModule, i1.NgxMaskModule], exports: [GridListComponent] });
GridListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GridListModule, imports: [[
            CommonModule,
            NgxPaginationModule,
            DxDataGridModule,
            MaterialUIModule,
            SharedPipesModule,
            FormsModule,
            ReactiveFormsModule,
            NgxfUploaderModule,
            NgxMaskModule.forRoot()
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: GridListModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [GridListComponent],
                    imports: [
                        CommonModule,
                        NgxPaginationModule,
                        DxDataGridModule,
                        MaterialUIModule,
                        SharedPipesModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgxfUploaderModule,
                        NgxMaskModule.forRoot()
                    ],
                    exports: [GridListComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9jb21tb24tY29tcG9uZW50cy9ncmlkLWxpc3QvZ3JpZC1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saURBQWlELENBQUM7OztBQWlCbkYsTUFBTSxPQUFPLGNBQWM7OzRHQUFkLGNBQWM7NkdBQWQsY0FBYyxpQkFkVixpQkFBaUIsYUFFOUIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGtCQUFrQiwrQkFHVixpQkFBaUI7NkdBRWhCLGNBQWMsWUFiaEI7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsaUJBQWlCO1lBQ2pCLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLGFBQWEsQ0FBQyxPQUFPLEVBQUU7U0FDeEI7NEZBR1UsY0FBYztrQkFmMUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDakMsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsaUJBQWlCO3dCQUNqQixXQUFXO3dCQUNYLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3dCQUNsQixhQUFhLENBQUMsT0FBTyxFQUFFO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU2hhcmVkUGlwZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlL3NoYXJlZC1waXBlcy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBEeERhdGFHcmlkTW9kdWxlIH0gZnJvbSAnZGV2ZXh0cmVtZS1hbmd1bGFyJztcclxuaW1wb3J0IHsgTmd4TWFza01vZHVsZSB9IGZyb20gJ25neC1tYXNrJztcclxuaW1wb3J0IHsgTmd4UGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcclxuaW1wb3J0IHsgTmd4ZlVwbG9hZGVyTW9kdWxlIH0gZnJvbSAnbmd4Zi11cGxvYWRlcic7XHJcbmltcG9ydCB7IEdyaWRMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9ncmlkLWxpc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0ZXJpYWxVSU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL0BzaGFyZWQvbWF0ZXJpYWwtdWkvbWF0ZXJpYWwtdWkubW9kdWxlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbR3JpZExpc3RDb21wb25lbnRdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE5neFBhZ2luYXRpb25Nb2R1bGUsXHJcbiAgICBEeERhdGFHcmlkTW9kdWxlLFxyXG4gICAgTWF0ZXJpYWxVSU1vZHVsZSxcclxuICAgIFNoYXJlZFBpcGVzTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgTmd4ZlVwbG9hZGVyTW9kdWxlLFxyXG4gICAgTmd4TWFza01vZHVsZS5mb3JSb290KClcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtHcmlkTGlzdENvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdyaWRMaXN0TW9kdWxlIHt9XHJcbiJdfQ==