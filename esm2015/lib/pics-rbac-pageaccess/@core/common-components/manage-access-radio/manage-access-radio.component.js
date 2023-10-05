import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../urls/access-management-common.service";
import * as i3 from "../../service/auth.service";
import * as i4 from "@angular/material/radio";
import * as i5 from "primeng/dropdown";
import * as i6 from "../../directives/permission.directive";
import * as i7 from "@angular/common";
export class ManageAccessRadioComponent {
    constructor(formBuilder, cdRef, accessManagementService, authService) {
        this.formBuilder = formBuilder;
        this.cdRef = cdRef;
        this.accessManagementService = accessManagementService;
        this.authService = authService;
        this.userList = [];
        this.policyGroupData = [];
        this.roleAddedData = [];
        this.userDropDown = false;
        this.roleDropDown = false;
        this.policyDropDown = false;
        this.accessBy = new EventEmitter();
        this.policyDropdown = new EventEmitter();
        this.roleDropdown = new EventEmitter();
        this.userDropdown = new EventEmitter();
        this.dropDownSelectedValues = new EventEmitter();
        this.userDropdownSettings = {};
        this.roleDropdownSettings = {};
        this.policyDropdownSettings = {};
        this.orgSubs = this.authService.orgInfo.subscribe(o => {
            this.orgId = o;
            console.log(this.orgId, 'manageaccessradio comp');
            if (this.orgId) {
                this.loadDropdowns();
            }
        });
    }
    ngOnInit() {
        this.loadForm();
        this.userDropdownSettings = {
            singleSelection: false,
            text: 'Select User',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            labelKey: 'displayname',
            searchBy: ['displayname']
        };
        this.roleDropdownSettings = {
            singleSelection: false,
            text: 'Select Persona',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            labelKey: 'name',
            searchBy: ['name']
        };
        this.policyDropdownSettings = {
            singleSelection: false,
            text: 'Select Policy',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            labelKey: 'policygroupname',
            searchBy: ['policygroupname']
        };
    }
    ngOnDestroy() {
        this.orgSubs.unsubscribe();
    }
    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
    loadDropdowns() {
        this.loadUsername();
        this.getPersona();
        this.getPolicyGroup();
    }
    loadForm() {
        this.rbacForm = this.formBuilder.group({
            id: new FormControl(null),
            accessBy: new FormControl(null),
            userId: new FormControl(''),
            policyId: new FormControl(null),
            roleId: new FormControl(null)
        });
    }
    loadUsername() {
        this.accessManagementService.getUserList(this.orgId).subscribe(res => {
            this.userList = res['data'] && res['data'].length ? res['data'] : [];
            this.userList.forEach(a => (a.displayname = `${a.firstname} ${a.lastname}`));
            this.userDropdown.emit(this.userList);
        });
    }
    getPolicyGroup() {
        this.accessManagementService.getPolicyGroupList(this.orgId).subscribe(res => {
            this.policyGroupData = res['data'] && res['data'].length ? res['data'] : [];
            this.policyDropdown.emit(this.policyGroupData);
        });
    }
    getPersona() {
        this.accessManagementService.getRoleList(this.orgId).subscribe(res => {
            this.roleAddedData = res['data'] && res['data'].length ? res['data'] : [];
            this.roleDropdown.emit(this.roleAddedData);
        });
    }
    showDorpdowns(id) {
        if (id === '1') {
            this.userDropDown = true;
            this.roleDropDown = this.policyDropDown = false;
        }
        else if (id === '2') {
            this.userDropDown = false;
            this.roleDropDown = true;
            this.policyDropDown = false;
        }
        else if (id === '3') {
            this.userDropDown = this.roleDropDown = false;
            this.policyDropDown = true;
        }
        this.accessBy.emit(id);
        this.resetForm(id);
    }
    // edit functionalites based on policy group
    getDataBasedOnPolicy() {
        const policyids = this.rbacForm.get('policyId').value;
        const roleIds = this.rbacForm.get('roleId').value;
        const userIds = this.rbacForm.get('userId').value;
        const selectedValue = {
            userid: userIds ? userIds.map(key => key.id) : null,
            roleid: roleIds ? roleIds.map(key => key.id) : null,
            policyid: policyids ? policyids.map(key => key.id) : null,
            from: 'policy'
        };
        if (this.rbacForm.get('roleId').value !== null || this.rbacForm.get('userId').value !== null) {
            this.dropDownSelectedValues.emit(selectedValue);
            return;
        }
        if (policyids.length) {
            this.dropDownSelectedValues.emit(selectedValue);
        }
        else {
            this.resetForm('3');
            this.rbacForm.get('accessBy').setValue('3');
        }
    }
    getDataBasedOnRole() {
        const roleIds = this.rbacForm.get('roleId').value;
        const userIds = this.rbacForm.get('userId').value;
        const policyIds = this.rbacForm.get('policyId').value;
        const selectedValue = {
            userid: userIds ? userIds.map(key => key.id) : null,
            roleid: roleIds ? roleIds.map(key => key.id) : null,
            policyid: policyIds ? policyIds.map(key => key.id) : null,
            from: 'role'
        };
        if (this.rbacForm.get('userId').value !== null) {
            this.dropDownSelectedValues.emit(selectedValue);
            return;
        }
        if (roleIds.length) {
            let existPolicyIds = [];
            // loop the role ids
            for (const roleId of roleIds) {
                const roleData = this.roleAddedData.filter(key => key.id === roleId.id);
                const getPolicyIds = roleData[0]['rolePolicyGroupConfigs'].map(pId => pId.policygroupid);
                existPolicyIds.push(getPolicyIds);
            }
            const myNewArray = [].concat(...existPolicyIds);
            const uniquePolicy = [...new Set(myNewArray)];
            existPolicyIds = uniquePolicy;
            // set policy group values
            const pList = this.policyGroupData.filter(key => existPolicyIds.includes(key.id));
            this.rbacForm.get('policyId').setValue(pList);
            const policyIdValues = this.rbacForm.get('policyId').value;
            selectedValue.roleid = roleIds ? roleIds.map(key => key.id) : null;
            selectedValue.policyid = policyIdValues ? policyIdValues.map(key => key.id) : null;
            this.dropDownSelectedValues.emit(selectedValue);
        }
        else {
            this.resetForm('2');
            this.rbacForm.get('accessBy').setValue('2');
        }
    }
    getRoleAndPolicyData() {
        const userIds = this.rbacForm.get('userId').value;
        if (userIds.length) {
            let existPolicyIds = [];
            let existRoleIds = [];
            // loop the role ids
            for (const userId of userIds) {
                const userData = this.userList.filter(key => key.id === userId.id);
                const getPolicyIds = userData[0]['policyGroupConfigs'].map(pId => pId.policygroupid);
                existPolicyIds.push(getPolicyIds);
                const getRoleIds = userData[0]['roleConfigs'].map(pId => pId.roleid);
                existRoleIds.push(getRoleIds);
            }
            const myNewPolicyAry = [].concat(...existPolicyIds);
            const uniquePolicy = [...new Set(myNewPolicyAry)];
            existPolicyIds = uniquePolicy;
            // set policy group values
            const pList = this.policyGroupData.filter(key => existPolicyIds.includes(key.id));
            this.rbacForm.get('policyId').setValue(pList);
            const myNewRoleAry = [].concat(...existRoleIds);
            const uniqueRole = [...new Set(myNewRoleAry)];
            existRoleIds = uniqueRole;
            // set role values
            const rList = this.roleAddedData.filter(key => existRoleIds.includes(key.id));
            this.rbacForm.get('roleId').setValue(rList);
            const roleIds = this.rbacForm.get('roleId').value;
            const policyIds = this.rbacForm.get('policyId').value;
            const selectedValue = {
                userid: userIds ? userIds.map(key => key.id) : null,
                roleid: roleIds ? roleIds.map(key => key.id) : null,
                policyid: policyIds ? policyIds.map(key => key.id) : null,
                from: 'user'
            };
            this.dropDownSelectedValues.emit(selectedValue);
        }
        else {
            this.resetForm('1');
            this.rbacForm.get('accessBy').setValue('1');
        }
    }
    resetForm(id = null) {
        this.rbacForm.reset();
        if (id !== null) {
            this.rbacForm.get('accessBy').setValue(id);
            this.accessBy.emit(id);
        }
    }
    getOrgPages(type) {
        const roleIds = this.rbacForm.get('roleId').value;
        const userIds = this.rbacForm.get('userId').value;
        const policyIds = this.rbacForm.get('policyId').value;
        const selectedValue = {
            userid: userIds,
            roleid: roleIds,
            policyid: policyIds,
            from: type
        };
        this.dropDownSelectedValues.emit(selectedValue);
    }
}
ManageAccessRadioComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ManageAccessRadioComponent, deps: [{ token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.AccessManagementCommonService }, { token: i3.AuthService }], target: i0.ɵɵFactoryTarget.Component });
ManageAccessRadioComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ManageAccessRadioComponent, selector: "app-manage-access-radio", inputs: { reloadForm: "reloadForm" }, outputs: { accessBy: "accessBy", policyDropdown: "policyDropdown", roleDropdown: "roleDropdown", userDropdown: "userDropdown", dropDownSelectedValues: "dropDownSelectedValues" }, ngImport: i0, template: "<form [formGroup]=\"rbacForm\" class=\"manage-access-radio\">\r\n  <div class=\"row\">\r\n    <div class=\"col-12\">\r\n      <div class=\"strip_head toggleleft\">\r\n        <span class=\"report_head font-weight-bold\">Manage Access By</span>\r\n      </div>\r\n      <mat-radio-group formControlName=\"accessBy\">\r\n        <mat-radio-button value=\"1\" (click)=\"showDorpdowns('1')\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_USERNAME\"\r\n          >User Name</mat-radio-button\r\n        >\r\n        <mat-radio-button value=\"2\" (click)=\"showDorpdowns('2')\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_ROLE\"\r\n          >Role</mat-radio-button\r\n        >\r\n        <mat-radio-button value=\"3\" (click)=\"showDorpdowns('3')\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_POLICY_GROUP\"\r\n          >Policy Group</mat-radio-button\r\n        >\r\n      </mat-radio-group>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-3 col-12 mt-3\" *ngIf=\"userDropDown\">\r\n      <p class=\"radio-title\">Select User</p>\r\n      <p-dropdown\r\n        inputId=\"role\"\r\n        [options]=\"userList\"\r\n        placeholder=\"Select User\"\r\n        formControlName=\"userId\"\r\n        styleClass=\"w-100\"\r\n        fieldKey=\"SETTINGS_PAG_ACC_ACCESS_USERNAME_USER\"\r\n        optionLabel=\"displayname\"\r\n        optionValue=\"id\"\r\n        [filter]=\"true\"\r\n        ariaFilterLabel=\"null\"\r\n        (onChange)=\"getOrgPages('user')\">\r\n      </p-dropdown>\r\n    </div>\r\n    <div class=\"col-md-3 col-12 mt-3\" *ngIf=\"roleDropDown\">\r\n      <p class=\"radio-title\">Select Role</p>\r\n      <p-dropdown\r\n        inputId=\"role\"\r\n        [options]=\"roleAddedData\"\r\n        placeholder=\"Select Role\"\r\n        formControlName=\"roleId\"\r\n        fieldKey=\"SETTINGS_PAG_ACC_ACCESS_ROLE_ROLE\"\r\n        styleClass=\"w-100\"\r\n        optionLabel=\"name\"\r\n        optionValue=\"id\"\r\n        [filter]=\"true\"\r\n        ariaFilterLabel=\"null\"\r\n        (onChange)=\"getOrgPages('role')\">\r\n      </p-dropdown>\r\n    </div>\r\n    <div class=\"col-md-3 col-12 mt-3\" *ngIf=\"policyDropDown\">\r\n      <p class=\"radio-title\">Select Policy Group</p>\r\n      <p-dropdown\r\n        inputId=\"role\"\r\n        [options]=\"policyGroupData\"\r\n        placeholder=\"Select Policy Group\"\r\n        formControlName=\"policyId\"\r\n        styleClass=\"w-100\"\r\n        fieldKey=\"SETTINGS_PAG_ACC_ACCESS_POLICY_GROUP_POLICY\"\r\n        optionLabel=\"policygroupname\"\r\n        optionValue=\"id\"\r\n        [filter]=\"true\"\r\n        ariaFilterLabel=\"null\"\r\n        (onChange)=\"getOrgPages('policy')\">\r\n      </p-dropdown>\r\n    </div>\r\n  </div>\r\n</form>\r\n<br />\r\n", styles: [".mat-radio-group .mat-radio-button{padding-right:10px;font-family:\"Roboto\",sans-serif!important}.radio-title{color:var(--label-text);font-size:var(--font-14);font-weight:600;margin-bottom:10px}:host ::ng-deep .selected-list .c-btn{font-size:var(--base-font-size)}.toggleleft{font-size:var(--font-14);font-weight:600;display:block;padding-bottom:13px}\n"], components: [{ type: i4.MatRadioButton, selector: "mat-radio-button", inputs: ["disableRipple", "tabIndex"], exportAs: ["matRadioButton"] }, { type: i5.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.MatRadioGroup, selector: "mat-radio-group", exportAs: ["matRadioGroup"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.PermissionDirective, selector: "[fieldKey]", inputs: ["fieldKey"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ManageAccessRadioComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-manage-access-radio',
                    templateUrl: './manage-access-radio.component.html',
                    styleUrls: ['./manage-access-radio.component.scss']
                }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i2.AccessManagementCommonService }, { type: i3.AuthService }]; }, propDecorators: { accessBy: [{
                type: Output
            }], policyDropdown: [{
                type: Output
            }], roleDropdown: [{
                type: Output
            }], userDropdown: [{
                type: Output
            }], dropDownSelectedValues: [{
                type: Output
            }], reloadForm: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFjY2Vzcy1yYWRpby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQGNvcmUvY29tbW9uLWNvbXBvbmVudHMvbWFuYWdlLWFjY2Vzcy1yYWRpby9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9jb21tb24tY29tcG9uZW50cy9tYW5hZ2UtYWNjZXNzLXJhZGlvL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztBQVNyRSxNQUFNLE9BQU8sMEJBQTBCO0lBcUJyQyxZQUNVLFdBQXdCLEVBQ3pCLEtBQXdCLEVBQ3hCLHVCQUFzRCxFQUNyRCxXQUF3QjtRQUh4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4Qiw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQStCO1FBQ3JELGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBdkJsQyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLG9CQUFlLEdBQVUsRUFBRSxDQUFDO1FBQzVCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JC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QUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELE1BQU0sYUFBYSxHQUFHO1lBQ3BCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsTUFBTSxFQUFFLE9BQU87WUFDZixRQUFRLEVBQUUsU0FBUztZQUNuQixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUM7UUFDRixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7O3dIQXRQVSwwQkFBMEI7NEdBQTFCLDBCQUEwQix3UkNuQnZDLDhyRkF1RUE7NEZEcERhLDBCQUEwQjtrQkFMdEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxXQUFXLEVBQUUsc0NBQXNDO29CQUNuRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztpQkFDcEQ7d01BU1csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxzQkFBc0I7c0JBQS9CLE1BQU07Z0JBQ0UsVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2UvYXV0aC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWNjZXNzTWFuYWdlbWVudENvbW1vblNlcnZpY2UgfSBmcm9tICcuLi8uLi91cmxzL2FjY2Vzcy1tYW5hZ2VtZW50LWNvbW1vbi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW1hbmFnZS1hY2Nlc3MtcmFkaW8nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hbmFnZUFjY2Vzc1JhZGlvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xyXG4gIHJiYWNGb3JtOiBGb3JtR3JvdXA7XHJcbiAgdXNlckxpc3Q6IGFueVtdID0gW107XHJcbiAgcG9saWN5R3JvdXBEYXRhOiBhbnlbXSA9IFtdO1xyXG4gIHJvbGVBZGRlZERhdGE6IGFueVtdID0gW107XHJcbiAgdXNlckRyb3BEb3duID0gZmFsc2U7XHJcbiAgcm9sZURyb3BEb3duID0gZmFsc2U7XHJcbiAgcG9saWN5RHJvcERvd24gPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgYWNjZXNzQnkgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcG9saWN5RHJvcGRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcm9sZURyb3Bkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHVzZXJEcm9wZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBkcm9wRG93blNlbGVjdGVkVmFsdWVzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQElucHV0KCkgcmVsb2FkRm9ybTogYm9vbGVhbjtcclxuICB1c2VyRHJvcGRvd25TZXR0aW5ncyA9IHt9O1xyXG4gIHJvbGVEcm9wZG93blNldHRpbmdzID0ge307XHJcbiAgcG9saWN5RHJvcGRvd25TZXR0aW5ncyA9IHt9O1xyXG4gIG9yZ1N1YnM6IFN1YnNjcmlwdGlvbjtcclxuICBvcmdJZDogYW55O1xyXG4gXHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXHJcbiAgICBwdWJsaWMgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHVibGljIGFjY2Vzc01hbmFnZW1lbnRTZXJ2aWNlOiBBY2Nlc3NNYW5hZ2VtZW50Q29tbW9uU2VydmljZSxcclxuICAgIHByaXZhdGUgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLm9yZ1N1YnMgPSB0aGlzLmF1dGhTZXJ2aWNlLm9yZ0luZm8uc3Vic2NyaWJlKG8gPT4ge1xyXG4gICAgICB0aGlzLm9yZ0lkID0gbztcclxuICAgICAgY29uc29sZS5sb2codGhpcy5vcmdJZCwgJ21hbmFnZWFjY2Vzc3JhZGlvIGNvbXAnKTtcclxuICAgICAgaWYgKHRoaXMub3JnSWQpIHtcclxuICAgICAgICB0aGlzLmxvYWREcm9wZG93bnMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMubG9hZEZvcm0oKTtcclxuICAgIHRoaXMudXNlckRyb3Bkb3duU2V0dGluZ3MgPSB7XHJcbiAgICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRleHQ6ICdTZWxlY3QgVXNlcicsXHJcbiAgICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgQWxsJyxcclxuICAgICAgdW5TZWxlY3RBbGxUZXh0OiAnVW5TZWxlY3QgQWxsJyxcclxuICAgICAgZW5hYmxlU2VhcmNoRmlsdGVyOiB0cnVlLFxyXG4gICAgICBsYWJlbEtleTogJ2Rpc3BsYXluYW1lJyxcclxuICAgICAgc2VhcmNoQnk6IFsnZGlzcGxheW5hbWUnXVxyXG4gICAgfTtcclxuICAgIHRoaXMucm9sZURyb3Bkb3duU2V0dGluZ3MgPSB7XHJcbiAgICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRleHQ6ICdTZWxlY3QgUGVyc29uYScsXHJcbiAgICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgQWxsJyxcclxuICAgICAgdW5TZWxlY3RBbGxUZXh0OiAnVW5TZWxlY3QgQWxsJyxcclxuICAgICAgZW5hYmxlU2VhcmNoRmlsdGVyOiB0cnVlLFxyXG4gICAgICBsYWJlbEtleTogJ25hbWUnLFxyXG4gICAgICBzZWFyY2hCeTogWyduYW1lJ11cclxuICAgIH07XHJcbiAgICB0aGlzLnBvbGljeURyb3Bkb3duU2V0dGluZ3MgPSB7XHJcbiAgICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRleHQ6ICdTZWxlY3QgUG9saWN5JyxcclxuICAgICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxyXG4gICAgICB1blNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBBbGwnLFxyXG4gICAgICBlbmFibGVTZWFyY2hGaWx0ZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsS2V5OiAncG9saWN5Z3JvdXBuYW1lJyxcclxuICAgICAgc2VhcmNoQnk6IFsncG9saWN5Z3JvdXBuYW1lJ11cclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vcmdTdWJzLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBsb2FkRHJvcGRvd25zKCkge1xyXG4gICAgdGhpcy5sb2FkVXNlcm5hbWUoKTtcclxuICAgIHRoaXMuZ2V0UGVyc29uYSgpO1xyXG4gICAgdGhpcy5nZXRQb2xpY3lHcm91cCgpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEZvcm0oKSB7XHJcbiAgICB0aGlzLnJiYWNGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIGlkOiBuZXcgRm9ybUNvbnRyb2wobnVsbCksXHJcbiAgICAgIGFjY2Vzc0J5OiBuZXcgRm9ybUNvbnRyb2wobnVsbCksXHJcbiAgICAgIHVzZXJJZDogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgICAgcG9saWN5SWQ6IG5ldyBGb3JtQ29udHJvbChudWxsKSxcclxuICAgICAgcm9sZUlkOiBuZXcgRm9ybUNvbnRyb2wobnVsbClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9hZFVzZXJuYW1lKCkge1xyXG4gICAgdGhpcy5hY2Nlc3NNYW5hZ2VtZW50U2VydmljZS5nZXRVc2VyTGlzdCh0aGlzLm9yZ0lkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgdGhpcy51c2VyTGlzdCA9IHJlc1snZGF0YSddICYmIHJlc1snZGF0YSddLmxlbmd0aCA/IHJlc1snZGF0YSddIDogW107XHJcbiAgICAgIHRoaXMudXNlckxpc3QuZm9yRWFjaChhID0+IChhLmRpc3BsYXluYW1lID0gYCR7YS5maXJzdG5hbWV9ICR7YS5sYXN0bmFtZX1gKSk7XHJcbiAgICAgIHRoaXMudXNlckRyb3Bkb3duLmVtaXQodGhpcy51c2VyTGlzdCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFBvbGljeUdyb3VwKCkge1xyXG4gICAgdGhpcy5hY2Nlc3NNYW5hZ2VtZW50U2VydmljZS5nZXRQb2xpY3lHcm91cExpc3QodGhpcy5vcmdJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMucG9saWN5R3JvdXBEYXRhID0gcmVzWydkYXRhJ10gJiYgcmVzWydkYXRhJ10ubGVuZ3RoID8gcmVzWydkYXRhJ10gOiBbXTtcclxuICAgICAgdGhpcy5wb2xpY3lEcm9wZG93bi5lbWl0KHRoaXMucG9saWN5R3JvdXBEYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVyc29uYSgpIHtcclxuICAgIHRoaXMuYWNjZXNzTWFuYWdlbWVudFNlcnZpY2UuZ2V0Um9sZUxpc3QodGhpcy5vcmdJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMucm9sZUFkZGVkRGF0YSA9IHJlc1snZGF0YSddICYmIHJlc1snZGF0YSddLmxlbmd0aCA/IHJlc1snZGF0YSddIDogW107XHJcbiAgICAgIHRoaXMucm9sZURyb3Bkb3duLmVtaXQodGhpcy5yb2xlQWRkZWREYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvd0RvcnBkb3ducyhpZCkge1xyXG4gICAgaWYgKGlkID09PSAnMScpIHtcclxuICAgICAgdGhpcy51c2VyRHJvcERvd24gPSB0cnVlO1xyXG4gICAgICB0aGlzLnJvbGVEcm9wRG93biA9IHRoaXMucG9saWN5RHJvcERvd24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09ICcyJykge1xyXG4gICAgICB0aGlzLnVzZXJEcm9wRG93biA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJvbGVEcm9wRG93biA9IHRydWU7XHJcbiAgICAgIHRoaXMucG9saWN5RHJvcERvd24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09ICczJykge1xyXG4gICAgICB0aGlzLnVzZXJEcm9wRG93biA9IHRoaXMucm9sZURyb3BEb3duID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucG9saWN5RHJvcERvd24gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY2Nlc3NCeS5lbWl0KGlkKTtcclxuICAgIHRoaXMucmVzZXRGb3JtKGlkKTtcclxuICB9XHJcblxyXG4gIC8vIGVkaXQgZnVuY3Rpb25hbGl0ZXMgYmFzZWQgb24gcG9saWN5IGdyb3VwXHJcbiAgZ2V0RGF0YUJhc2VkT25Qb2xpY3koKSB7XHJcbiAgICBjb25zdCBwb2xpY3lpZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHJvbGVJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncm9sZUlkJykudmFsdWU7XHJcbiAgICBjb25zdCB1c2VySWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3VzZXJJZCcpLnZhbHVlO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IHtcclxuICAgICAgdXNlcmlkOiB1c2VySWRzID8gdXNlcklkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICByb2xlaWQ6IHJvbGVJZHMgPyByb2xlSWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgIHBvbGljeWlkOiBwb2xpY3lpZHMgPyBwb2xpY3lpZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgZnJvbTogJ3BvbGljeSdcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5yYmFjRm9ybS5nZXQoJ3JvbGVJZCcpLnZhbHVlICE9PSBudWxsIHx8IHRoaXMucmJhY0Zvcm0uZ2V0KCd1c2VySWQnKS52YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmRyb3BEb3duU2VsZWN0ZWRWYWx1ZXMuZW1pdChzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHBvbGljeWlkcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2V0Rm9ybSgnMycpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgnYWNjZXNzQnknKS5zZXRWYWx1ZSgnMycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YUJhc2VkT25Sb2xlKCkge1xyXG4gICAgY29uc3Qgcm9sZUlkcyA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlSWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB7XHJcbiAgICAgIHVzZXJpZDogdXNlcklkcyA/IHVzZXJJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgcm9sZWlkOiByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICBwb2xpY3lpZDogcG9saWN5SWRzID8gcG9saWN5SWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgIGZyb206ICdyb2xlJ1xyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChyb2xlSWRzLmxlbmd0aCkge1xyXG4gICAgICBsZXQgZXhpc3RQb2xpY3lJZHMgPSBbXTtcclxuICAgICAgLy8gbG9vcCB0aGUgcm9sZSBpZHNcclxuICAgICAgZm9yIChjb25zdCByb2xlSWQgb2Ygcm9sZUlkcykge1xyXG4gICAgICAgIGNvbnN0IHJvbGVEYXRhID0gdGhpcy5yb2xlQWRkZWREYXRhLmZpbHRlcihrZXkgPT4ga2V5LmlkID09PSByb2xlSWQuaWQpO1xyXG4gICAgICAgIGNvbnN0IGdldFBvbGljeUlkcyA9IHJvbGVEYXRhWzBdWydyb2xlUG9saWN5R3JvdXBDb25maWdzJ10ubWFwKHBJZCA9PiBwSWQucG9saWN5Z3JvdXBpZCk7XHJcbiAgICAgICAgZXhpc3RQb2xpY3lJZHMucHVzaChnZXRQb2xpY3lJZHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG15TmV3QXJyYXkgPSBbXS5jb25jYXQoLi4uZXhpc3RQb2xpY3lJZHMpO1xyXG4gICAgICBjb25zdCB1bmlxdWVQb2xpY3kgPSBbLi4ubmV3IFNldChteU5ld0FycmF5KV07XHJcbiAgICAgIGV4aXN0UG9saWN5SWRzID0gdW5pcXVlUG9saWN5O1xyXG4gICAgICAvLyBzZXQgcG9saWN5IGdyb3VwIHZhbHVlc1xyXG4gICAgICBjb25zdCBwTGlzdCA9IHRoaXMucG9saWN5R3JvdXBEYXRhLmZpbHRlcihrZXkgPT4gZXhpc3RQb2xpY3lJZHMuaW5jbHVkZXMoa2V5LmlkKSk7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdwb2xpY3lJZCcpLnNldFZhbHVlKHBMaXN0KTtcclxuICAgICAgY29uc3QgcG9saWN5SWRWYWx1ZXMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgICAgc2VsZWN0ZWRWYWx1ZS5yb2xlaWQgPSByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsO1xyXG4gICAgICBzZWxlY3RlZFZhbHVlLnBvbGljeWlkID0gcG9saWN5SWRWYWx1ZXMgPyBwb2xpY3lJZFZhbHVlcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsO1xyXG4gICAgICB0aGlzLmRyb3BEb3duU2VsZWN0ZWRWYWx1ZXMuZW1pdChzZWxlY3RlZFZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVzZXRGb3JtKCcyJyk7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdhY2Nlc3NCeScpLnNldFZhbHVlKCcyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSb2xlQW5kUG9saWN5RGF0YSgpIHtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBpZiAodXNlcklkcy5sZW5ndGgpIHtcclxuICAgICAgbGV0IGV4aXN0UG9saWN5SWRzID0gW107XHJcbiAgICAgIGxldCBleGlzdFJvbGVJZHMgPSBbXTtcclxuICAgICAgLy8gbG9vcCB0aGUgcm9sZSBpZHNcclxuICAgICAgZm9yIChjb25zdCB1c2VySWQgb2YgdXNlcklkcykge1xyXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gdGhpcy51c2VyTGlzdC5maWx0ZXIoa2V5ID0+IGtleS5pZCA9PT0gdXNlcklkLmlkKTtcclxuICAgICAgICBjb25zdCBnZXRQb2xpY3lJZHMgPSB1c2VyRGF0YVswXVsncG9saWN5R3JvdXBDb25maWdzJ10ubWFwKHBJZCA9PiBwSWQucG9saWN5Z3JvdXBpZCk7XHJcbiAgICAgICAgZXhpc3RQb2xpY3lJZHMucHVzaChnZXRQb2xpY3lJZHMpO1xyXG4gICAgICAgIGNvbnN0IGdldFJvbGVJZHMgPSB1c2VyRGF0YVswXVsncm9sZUNvbmZpZ3MnXS5tYXAocElkID0+IHBJZC5yb2xlaWQpO1xyXG4gICAgICAgIGV4aXN0Um9sZUlkcy5wdXNoKGdldFJvbGVJZHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG15TmV3UG9saWN5QXJ5ID0gW10uY29uY2F0KC4uLmV4aXN0UG9saWN5SWRzKTtcclxuICAgICAgY29uc3QgdW5pcXVlUG9saWN5ID0gWy4uLm5ldyBTZXQobXlOZXdQb2xpY3lBcnkpXTtcclxuICAgICAgZXhpc3RQb2xpY3lJZHMgPSB1bmlxdWVQb2xpY3k7XHJcbiAgICAgIC8vIHNldCBwb2xpY3kgZ3JvdXAgdmFsdWVzXHJcbiAgICAgIGNvbnN0IHBMaXN0ID0gdGhpcy5wb2xpY3lHcm91cERhdGEuZmlsdGVyKGtleSA9PiBleGlzdFBvbGljeUlkcy5pbmNsdWRlcyhrZXkuaWQpKTtcclxuICAgICAgdGhpcy5yYmFjRm9ybS5nZXQoJ3BvbGljeUlkJykuc2V0VmFsdWUocExpc3QpO1xyXG5cclxuICAgICAgY29uc3QgbXlOZXdSb2xlQXJ5ID0gW10uY29uY2F0KC4uLmV4aXN0Um9sZUlkcyk7XHJcbiAgICAgIGNvbnN0IHVuaXF1ZVJvbGUgPSBbLi4ubmV3IFNldChteU5ld1JvbGVBcnkpXTtcclxuICAgICAgZXhpc3RSb2xlSWRzID0gdW5pcXVlUm9sZTtcclxuICAgICAgLy8gc2V0IHJvbGUgdmFsdWVzXHJcbiAgICAgIGNvbnN0IHJMaXN0ID0gdGhpcy5yb2xlQWRkZWREYXRhLmZpbHRlcihrZXkgPT4gZXhpc3RSb2xlSWRzLmluY2x1ZGVzKGtleS5pZCkpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgncm9sZUlkJykuc2V0VmFsdWUockxpc3QpO1xyXG4gICAgICBjb25zdCByb2xlSWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3JvbGVJZCcpLnZhbHVlO1xyXG4gICAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IHtcclxuICAgICAgICB1c2VyaWQ6IHVzZXJJZHMgPyB1c2VySWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgICAgcm9sZWlkOiByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICAgIHBvbGljeWlkOiBwb2xpY3lJZHMgPyBwb2xpY3lJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgICBmcm9tOiAndXNlcidcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2V0Rm9ybSgnMScpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgnYWNjZXNzQnknKS5zZXRWYWx1ZSgnMScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRGb3JtKGlkID0gbnVsbCkge1xyXG4gICAgdGhpcy5yYmFjRm9ybS5yZXNldCgpO1xyXG4gICAgaWYgKGlkICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdhY2Nlc3NCeScpLnNldFZhbHVlKGlkKTtcclxuICAgICAgdGhpcy5hY2Nlc3NCeS5lbWl0KGlkKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0T3JnUGFnZXModHlwZSkge1xyXG4gICAgY29uc3Qgcm9sZUlkcyA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlSWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB7XHJcbiAgICAgIHVzZXJpZDogdXNlcklkcyxcclxuICAgICAgcm9sZWlkOiByb2xlSWRzLFxyXG4gICAgICBwb2xpY3lpZDogcG9saWN5SWRzLFxyXG4gICAgICBmcm9tOiB0eXBlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxmb3JtIFtmb3JtR3JvdXBdPVwicmJhY0Zvcm1cIiBjbGFzcz1cIm1hbmFnZS1hY2Nlc3MtcmFkaW9cIj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTEyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzdHJpcF9oZWFkIHRvZ2dsZWxlZnRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInJlcG9ydF9oZWFkIGZvbnQtd2VpZ2h0LWJvbGRcIj5NYW5hZ2UgQWNjZXNzIEJ5PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPG1hdC1yYWRpby1ncm91cCBmb3JtQ29udHJvbE5hbWU9XCJhY2Nlc3NCeVwiPlxyXG4gICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uIHZhbHVlPVwiMVwiIChjbGljayk9XCJzaG93RG9ycGRvd25zKCcxJylcIiBmaWVsZEtleT1cIlNFVFRJTkdTX1BBR19BQ0NfQUNDRVNTX1VTRVJOQU1FXCJcclxuICAgICAgICAgID5Vc2VyIE5hbWU8L21hdC1yYWRpby1idXR0b25cclxuICAgICAgICA+XHJcbiAgICAgICAgPG1hdC1yYWRpby1idXR0b24gdmFsdWU9XCIyXCIgKGNsaWNrKT1cInNob3dEb3JwZG93bnMoJzInKVwiIGZpZWxkS2V5PVwiU0VUVElOR1NfUEFHX0FDQ19BQ0NFU1NfUk9MRVwiXHJcbiAgICAgICAgICA+Um9sZTwvbWF0LXJhZGlvLWJ1dHRvblxyXG4gICAgICAgID5cclxuICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIjNcIiAoY2xpY2spPVwic2hvd0RvcnBkb3ducygnMycpXCIgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19QT0xJQ1lfR1JPVVBcIlxyXG4gICAgICAgICAgPlBvbGljeSBHcm91cDwvbWF0LXJhZGlvLWJ1dHRvblxyXG4gICAgICAgID5cclxuICAgICAgPC9tYXQtcmFkaW8tZ3JvdXA+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgY29sLTEyIG10LTNcIiAqbmdJZj1cInVzZXJEcm9wRG93blwiPlxyXG4gICAgICA8cCBjbGFzcz1cInJhZGlvLXRpdGxlXCI+U2VsZWN0IFVzZXI8L3A+XHJcbiAgICAgIDxwLWRyb3Bkb3duXHJcbiAgICAgICAgaW5wdXRJZD1cInJvbGVcIlxyXG4gICAgICAgIFtvcHRpb25zXT1cInVzZXJMaXN0XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBVc2VyXCJcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ1c2VySWRcIlxyXG4gICAgICAgIHN0eWxlQ2xhc3M9XCJ3LTEwMFwiXHJcbiAgICAgICAgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19VU0VSTkFNRV9VU0VSXCJcclxuICAgICAgICBvcHRpb25MYWJlbD1cImRpc3BsYXluYW1lXCJcclxuICAgICAgICBvcHRpb25WYWx1ZT1cImlkXCJcclxuICAgICAgICBbZmlsdGVyXT1cInRydWVcIlxyXG4gICAgICAgIGFyaWFGaWx0ZXJMYWJlbD1cIm51bGxcIlxyXG4gICAgICAgIChvbkNoYW5nZSk9XCJnZXRPcmdQYWdlcygndXNlcicpXCI+XHJcbiAgICAgIDwvcC1kcm9wZG93bj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIGNvbC0xMiBtdC0zXCIgKm5nSWY9XCJyb2xlRHJvcERvd25cIj5cclxuICAgICAgPHAgY2xhc3M9XCJyYWRpby10aXRsZVwiPlNlbGVjdCBSb2xlPC9wPlxyXG4gICAgICA8cC1kcm9wZG93blxyXG4gICAgICAgIGlucHV0SWQ9XCJyb2xlXCJcclxuICAgICAgICBbb3B0aW9uc109XCJyb2xlQWRkZWREYXRhXCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBSb2xlXCJcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJyb2xlSWRcIlxyXG4gICAgICAgIGZpZWxkS2V5PVwiU0VUVElOR1NfUEFHX0FDQ19BQ0NFU1NfUk9MRV9ST0xFXCJcclxuICAgICAgICBzdHlsZUNsYXNzPVwidy0xMDBcIlxyXG4gICAgICAgIG9wdGlvbkxhYmVsPVwibmFtZVwiXHJcbiAgICAgICAgb3B0aW9uVmFsdWU9XCJpZFwiXHJcbiAgICAgICAgW2ZpbHRlcl09XCJ0cnVlXCJcclxuICAgICAgICBhcmlhRmlsdGVyTGFiZWw9XCJudWxsXCJcclxuICAgICAgICAob25DaGFuZ2UpPVwiZ2V0T3JnUGFnZXMoJ3JvbGUnKVwiPlxyXG4gICAgICA8L3AtZHJvcGRvd24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBjb2wtMTIgbXQtM1wiICpuZ0lmPVwicG9saWN5RHJvcERvd25cIj5cclxuICAgICAgPHAgY2xhc3M9XCJyYWRpby10aXRsZVwiPlNlbGVjdCBQb2xpY3kgR3JvdXA8L3A+XHJcbiAgICAgIDxwLWRyb3Bkb3duXHJcbiAgICAgICAgaW5wdXRJZD1cInJvbGVcIlxyXG4gICAgICAgIFtvcHRpb25zXT1cInBvbGljeUdyb3VwRGF0YVwiXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgUG9saWN5IEdyb3VwXCJcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJwb2xpY3lJZFwiXHJcbiAgICAgICAgc3R5bGVDbGFzcz1cInctMTAwXCJcclxuICAgICAgICBmaWVsZEtleT1cIlNFVFRJTkdTX1BBR19BQ0NfQUNDRVNTX1BPTElDWV9HUk9VUF9QT0xJQ1lcIlxyXG4gICAgICAgIG9wdGlvbkxhYmVsPVwicG9saWN5Z3JvdXBuYW1lXCJcclxuICAgICAgICBvcHRpb25WYWx1ZT1cImlkXCJcclxuICAgICAgICBbZmlsdGVyXT1cInRydWVcIlxyXG4gICAgICAgIGFyaWFGaWx0ZXJMYWJlbD1cIm51bGxcIlxyXG4gICAgICAgIChvbkNoYW5nZSk9XCJnZXRPcmdQYWdlcygncG9saWN5JylcIj5cclxuICAgICAgPC9wLWRyb3Bkb3duPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZm9ybT5cclxuPGJyIC8+XHJcbiJdfQ==