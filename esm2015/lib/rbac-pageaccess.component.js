import { Component, Input } from '@angular/core';
import { RBACINFO } from './pics-rbac-pageaccess/@core/urls/rbac-url.config';
import * as i0 from "@angular/core";
import * as i1 from "./pics-rbac-pageaccess/@core/permissions/permission.store";
import * as i2 from "./pics-rbac-pageaccess/@core/service/data-store.service";
import * as i3 from "./pics-rbac-pageaccess/pageaccess/pageaccess.component";
export class RbacPageaccessComponent {
    constructor(permissionStore, _storeservice) {
        this.permissionStore = permissionStore;
        this._storeservice = _storeservice;
        this.RBACORG = new RBACINFO();
    }
    ngOnInit() {
        this.accessEvent.subscribe(val => {
            this.RBACORG = val.RBACORG;
            this.PERMISSION = val.PERMISSION;
            this._storeservice.setData('RBACORG', this.RBACORG);
            this.permissionStore.setStore(this.PERMISSION);
        });
    }
}
RbacPageaccessComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacPageaccessComponent, deps: [{ token: i1.PermissionStore }, { token: i2.DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
RbacPageaccessComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: RbacPageaccessComponent, selector: "rbac-pageaccess", inputs: { RBACORG: "RBACORG", PERMISSION: "PERMISSION", accessEvent: "accessEvent" }, ngImport: i0, template: `
   <lib-pageaccess></lib-pageaccess>
  `, isInline: true, components: [{ type: i3.PageaccessComponent, selector: "lib-pageaccess" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacPageaccessComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'rbac-pageaccess',
                    template: `
   <lib-pageaccess></lib-pageaccess>
  `,
                    styles: []
                }]
        }], ctorParameters: function () { return [{ type: i1.PermissionStore }, { type: i2.DataStoreService }]; }, propDecorators: { RBACORG: [{
                type: Input
            }], PERMISSION: [{
                type: Input
            }], accessEvent: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy1wYWdlYWNjZXNzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9yYmFjLXBhZ2VhY2Nlc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBR3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtREFBbUQsQ0FBQzs7Ozs7QUFXN0UsTUFBTSxPQUFPLHVCQUF1QjtJQU1sQyxZQUNVLGVBQWdDLEVBQ2hDLGFBQStCO1FBRC9CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFOekIsWUFBTyxHQUFjLElBQUksUUFBUSxFQUFFLENBQUM7SUFRcEQsQ0FBQztJQUNELFFBQVE7UUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7cUhBbEJVLHVCQUF1Qjt5R0FBdkIsdUJBQXVCLDZJQU54Qjs7R0FFVDs0RkFJVSx1QkFBdUI7a0JBUm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsUUFBUSxFQUFFOztHQUVUO29CQUNELE1BQU0sRUFBRSxFQUNQO2lCQUNGO3FJQUdpQixPQUFPO3NCQUF0QixLQUFLO2dCQUNVLFVBQVU7c0JBQXpCLEtBQUs7Z0JBQ1UsV0FBVztzQkFBMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUGVybWlzc2lvblN0b3JlIH0gZnJvbSAnLi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLnN0b3JlJztcbmltcG9ydCB7IFJCQUNJTkZPIH0gZnJvbSAnLi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS91cmxzL3JiYWMtdXJsLmNvbmZpZyc7XG5pbXBvcnQgeyBEYXRhU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9zZXJ2aWNlL2RhdGEtc3RvcmUuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JiYWMtcGFnZWFjY2VzcycsXG4gIHRlbXBsYXRlOiBgXG4gICA8bGliLXBhZ2VhY2Nlc3M+PC9saWItcGFnZWFjY2Vzcz5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUmJhY1BhZ2VhY2Nlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBSQkFDT1JHPzogUkJBQ0lORk8gPSBuZXcgUkJBQ0lORk8oKTtcbiAgQElucHV0KCkgcHVibGljIFBFUk1JU1NJT04/OiBhbnk7XG4gIEBJbnB1dCgpIHB1YmxpYyBhY2Nlc3NFdmVudCE6IE9ic2VydmFibGU8YW55PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBlcm1pc3Npb25TdG9yZTogUGVybWlzc2lvblN0b3JlLFxuICAgIHByaXZhdGUgX3N0b3Jlc2VydmljZTogRGF0YVN0b3JlU2VydmljZVxuICApIHtcbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICAgdGhpcy5hY2Nlc3NFdmVudC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgIHRoaXMuUkJBQ09SRyA9IHZhbC5SQkFDT1JHO1xuICAgICAgdGhpcy5QRVJNSVNTSU9OID0gdmFsLlBFUk1JU1NJT047XG4gICAgICB0aGlzLl9zdG9yZXNlcnZpY2Uuc2V0RGF0YSgnUkJBQ09SRycsIHRoaXMuUkJBQ09SRyk7XG4gICAgICB0aGlzLnBlcm1pc3Npb25TdG9yZS5zZXRTdG9yZSh0aGlzLlBFUk1JU1NJT04pO1xuICAgIH0pXG4gIH1cblxufVxuIl19