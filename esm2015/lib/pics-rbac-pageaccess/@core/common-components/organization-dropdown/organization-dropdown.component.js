import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../urls/access-management-common.service";
import * as i2 from "../../service/auth.service";
import * as i3 from "@angular/material/form-field";
import * as i4 from "@angular/material/select";
import * as i5 from "@angular/material/core";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
export class OrganizationDropdownComponent {
    constructor(accessManagementService, auth) {
        this.accessManagementService = accessManagementService;
        this.auth = auth;
        this.changeOrganization = new EventEmitter();
        // This is intentional
    }
    ngOnInit() {
        this.getOrgList();
    }
    /**
     * @description returning selected organization details on event emitter
     * @param orgID organization id
     */
    onSelectionChange(orgID) {
        this.changeOrganization.emit(orgID);
    }
    /**
     * @description fetch organization list from backend
     */
    getOrgList() {
        this.accessManagementService.getOrganizationList().subscribe(res => {
            if (res['data'] && res['data'].length) {
                this.orgList = res['data'].sort((a, b) => { var _a; return (_a = a.organizationname) === null || _a === void 0 ? void 0 : _a.localeCompare(b.organizationname); });
            }
        });
    }
    /**
     * @description check isAdmin or not
     */
    get displayCondn() {
        return this.auth.isAdmin() && this.isShow;
    }
}
OrganizationDropdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: OrganizationDropdownComponent, deps: [{ token: i1.AccessManagementCommonService }, { token: i2.AuthService }], target: i0.ɵɵFactoryTarget.Component });
OrganizationDropdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: OrganizationDropdownComponent, selector: "app-organization-dropdown", inputs: { isShow: "isShow", Organization: "Organization" }, outputs: { changeOrganization: "changeOrganization" }, ngImport: i0, template: "<div class=\"row\">\r\n  <div class=\"col-12\">\r\n    <ng-container *ngIf=\"displayCondn\">\r\n      <div class=\"d-block pull-left w-100 my-2\">\r\n        <p class=\"org-title\">Organization Name</p>\r\n        <mat-form-field class=\"w-100\" appearance=\"outline\">\r\n          <mat-select\r\n            placeholder=\"Organization\"\r\n            [(ngModel)]=\"Organization\"\r\n            (selectionChange)=\"onSelectionChange($event)\">\r\n            <mat-option value=\"Select-ALL\"> Select-ALL </mat-option>\r\n            <mat-option *ngFor=\"let org of orgList\" value=\"{{ org.id }}\">\r\n              {{ org.organizationname }}\r\n            </mat-option>\r\n          </mat-select>\r\n        </mat-form-field>\r\n      </div>\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n", styles: [".org-title{margin:0;font-size:12px!important;color:#0079fe}\n"], components: [{ type: i3.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i4.MatSelect, selector: "mat-select", inputs: ["disabled", "disableRipple", "tabIndex"], exportAs: ["matSelect"] }, { type: i5.MatOption, selector: "mat-option", exportAs: ["matOption"] }], directives: [{ type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: OrganizationDropdownComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-organization-dropdown',
                    templateUrl: './organization-dropdown.component.html',
                    styleUrls: ['./organization-dropdown.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.AccessManagementCommonService }, { type: i2.AuthService }]; }, propDecorators: { isShow: [{
                type: Input
            }], Organization: [{
                type: Input
            }], changeOrganization: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnYW5pemF0aW9uLWRyb3Bkb3duLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9jb21tb24tY29tcG9uZW50cy9vcmdhbml6YXRpb24tZHJvcGRvd24vb3JnYW5pemF0aW9uLWRyb3Bkb3duLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9jb21tb24tY29tcG9uZW50cy9vcmdhbml6YXRpb24tZHJvcGRvd24vb3JnYW5pemF0aW9uLWRyb3Bkb3duLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztBQVMvRSxNQUFNLE9BQU8sNkJBQTZCO0lBTXhDLFlBQW1CLHVCQUFzRCxFQUFTLElBQWlCO1FBQWhGLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBK0I7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBSHpGLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJL0Msc0JBQXNCO0lBQ3pCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxpQkFBaUIsQ0FBQyxLQUFLO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsV0FBQyxPQUFBLE1BQUEsQ0FBQyxDQUFDLGdCQUFnQiwwQ0FBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUEsRUFBQSxDQUFDLENBQUM7YUFDbEc7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzVDLENBQUM7OzJIQXRDVSw2QkFBNkI7K0dBQTdCLDZCQUE2QixvTENUMUMsNnhCQW9CQTs0RkRYYSw2QkFBNkI7a0JBTHpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsV0FBVyxFQUFFLHdDQUF3QztvQkFDckQsU0FBUyxFQUFFLENBQUMsd0NBQXdDLENBQUM7aUJBQ3REOzhJQUVVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNJLGtCQUFrQjtzQkFBM0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEFjY2Vzc01hbmFnZW1lbnRDb21tb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXJscy9hY2Nlc3MtbWFuYWdlbWVudC1jb21tb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcC1vcmdhbml6YXRpb24tZHJvcGRvd24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9vcmdhbml6YXRpb24tZHJvcGRvd24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL29yZ2FuaXphdGlvbi1kcm9wZG93bi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPcmdhbml6YXRpb25Ecm9wZG93bkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaXNTaG93OiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIE9yZ2FuaXphdGlvbjogYW55O1xyXG4gIEBPdXRwdXQoKSBjaGFuZ2VPcmdhbml6YXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgb3JnTGlzdDogYW55W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBhY2Nlc3NNYW5hZ2VtZW50U2VydmljZTogQWNjZXNzTWFuYWdlbWVudENvbW1vblNlcnZpY2UsIHB1YmxpYyBhdXRoOiBBdXRoU2VydmljZSkge1xyXG4gICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5nZXRPcmdMaXN0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gcmV0dXJuaW5nIHNlbGVjdGVkIG9yZ2FuaXphdGlvbiBkZXRhaWxzIG9uIGV2ZW50IGVtaXR0ZXJcclxuICAgKiBAcGFyYW0gb3JnSUQgb3JnYW5pemF0aW9uIGlkXHJcbiAgICovXHJcbiAgb25TZWxlY3Rpb25DaGFuZ2Uob3JnSUQpIHtcclxuICAgIHRoaXMuY2hhbmdlT3JnYW5pemF0aW9uLmVtaXQob3JnSUQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIGZldGNoIG9yZ2FuaXphdGlvbiBsaXN0IGZyb20gYmFja2VuZFxyXG4gICAqL1xyXG4gIGdldE9yZ0xpc3QoKSB7XHJcbiAgICB0aGlzLmFjY2Vzc01hbmFnZW1lbnRTZXJ2aWNlLmdldE9yZ2FuaXphdGlvbkxpc3QoKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgaWYgKHJlc1snZGF0YSddICYmIHJlc1snZGF0YSddLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMub3JnTGlzdCA9IHJlc1snZGF0YSddLnNvcnQoKGEsIGIpID0+IGEub3JnYW5pemF0aW9ubmFtZT8ubG9jYWxlQ29tcGFyZShiLm9yZ2FuaXphdGlvbm5hbWUpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gY2hlY2sgaXNBZG1pbiBvciBub3RcclxuICAgKi9cclxuICBnZXQgZGlzcGxheUNvbmRuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXV0aC5pc0FkbWluKCkgJiYgdGhpcy5pc1Nob3c7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICA8ZGl2IGNsYXNzPVwiY29sLTEyXCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzcGxheUNvbmRuXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIHB1bGwtbGVmdCB3LTEwMCBteS0yXCI+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJvcmctdGl0bGVcIj5Pcmdhbml6YXRpb24gTmFtZTwvcD5cclxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiIGFwcGVhcmFuY2U9XCJvdXRsaW5lXCI+XHJcbiAgICAgICAgICA8bWF0LXNlbGVjdFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk9yZ2FuaXphdGlvblwiXHJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwiT3JnYW5pemF0aW9uXCJcclxuICAgICAgICAgICAgKHNlbGVjdGlvbkNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIHZhbHVlPVwiU2VsZWN0LUFMTFwiPiBTZWxlY3QtQUxMIDwvbWF0LW9wdGlvbj5cclxuICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9yZyBvZiBvcmdMaXN0XCIgdmFsdWU9XCJ7eyBvcmcuaWQgfX1cIj5cclxuICAgICAgICAgICAgICB7eyBvcmcub3JnYW5pemF0aW9ubmFtZSB9fVxyXG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XHJcbiAgICAgICAgICA8L21hdC1zZWxlY3Q+XHJcbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==