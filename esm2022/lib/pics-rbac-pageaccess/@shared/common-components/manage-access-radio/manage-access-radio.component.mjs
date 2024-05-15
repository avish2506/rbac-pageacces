import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RBACINFO } from '../../../@core/urls/rbac-url.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../@core/urls/access-management-common.service";
import * as i3 from "../../../@core/service/data-store.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/material/radio";
import * as i6 from "../../../@core/directives/permission.directive";
import * as i7 from "primeng/dropdown";
export class ManageAccessRadioComponent {
    formBuilder;
    cdRef;
    accessManagementService;
    _storeservice;
    rbacForm;
    userList = [];
    policyGroupData = [];
    roleAddedData = [];
    userDropDown = false;
    roleDropDown = false;
    policyDropDown = false;
    accessBy = new EventEmitter();
    policyDropdown = new EventEmitter();
    roleDropdown = new EventEmitter();
    userDropdown = new EventEmitter();
    dropDownSelectedValues = new EventEmitter();
    reloadForm;
    userDropdownSettings = {};
    roleDropdownSettings = {};
    policyDropdownSettings = {};
    orgSubs;
    orgId;
    environment;
    RBACORG = new RBACINFO();
    constructor(formBuilder, cdRef, accessManagementService, _storeservice) {
        this.formBuilder = formBuilder;
        this.cdRef = cdRef;
        this.accessManagementService = accessManagementService;
        this._storeservice = _storeservice;
        // this.orgSubs = this.authService.orgInfo.subscribe(o => {
        //   this.orgId = o;
        //   console.log(this.orgId, 'manageaccessradio comp');
        //   if (this.orgId) {
        //     this.loadDropdowns();
        //   }
        // });
        this.orgSubs = this._storeservice.currentStore.subscribe((res) => {
            if (res['RBACORG'] && res['RBACORG'] !== '') {
                this.RBACORG = res['RBACORG'];
                console.log(this.RBACORG, 'RBACORG Event Scheduler');
                this.environment = this.RBACORG['environment'];
                this.orgId = parseInt(this.RBACORG['orgID']);
                if (this.environment) {
                    this.loadDropdowns();
                }
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
            console.log(this.orgId);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ManageAccessRadioComponent, deps: [{ token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.AccessManagementCommonService }, { token: i3.DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: ManageAccessRadioComponent, selector: "app-manage-access-radio", inputs: { reloadForm: "reloadForm" }, outputs: { accessBy: "accessBy", policyDropdown: "policyDropdown", roleDropdown: "roleDropdown", userDropdown: "userDropdown", dropDownSelectedValues: "dropDownSelectedValues" }, ngImport: i0, template: "<form [formGroup]=\"rbacForm\" class=\"manage-access-radio\">\r\n  <div class=\"row\">\r\n    <div class=\"col-12 mb-3\">\r\n      <label for=\"accessBy\" class=\"radio-title\">Manage Access By</label>\r\n      <div>\r\n        <mat-radio-group formControlName=\"accessBy\" id=\"accessBy\">\r\n          <mat-radio-button value=\"1\" (click)=\"showDorpdowns('1')\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_USERNAME\">User\r\n            Name</mat-radio-button>\r\n          <mat-radio-button value=\"2\" (click)=\"showDorpdowns('2')\"\r\n            fieldKey=\"SETTINGS_PAG_ACC_ACCESS_ROLE\">Role</mat-radio-button>\r\n          <mat-radio-button value=\"3\" (click)=\"showDorpdowns('3')\"\r\n            fieldKey=\"SETTINGS_PAG_ACC_ACCESS_POLICY_GROUP\">Policy Group</mat-radio-button>\r\n        </mat-radio-group>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-3 col-12 mb-3\" *ngIf=\"userDropDown\">\r\n      <label for=\"userList\" class=\"radio-title\">Select User</label>\r\n      <p-dropdown inputId=\"userList\" [options]=\"userList\" placeholder=\"Select User\" formControlName=\"userId\"\r\n        styleClass=\"w-100\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_USERNAME_USER\" optionLabel=\"displayname\" optionValue=\"id\"\r\n        [filter]=\"true\" ariaFilterLabel=\"null\" (onChange)=\"getOrgPages('user')\">\r\n      </p-dropdown>\r\n    </div>\r\n    <div class=\"col-md-3 col-12 mb-3\" *ngIf=\"roleDropDown\">\r\n      <label for=\"roleAddedData\" class=\"radio-title\">Select Role</label>\r\n      <p-dropdown inputId=\"roleAddedData\" [options]=\"roleAddedData\" placeholder=\"Select Role\" formControlName=\"roleId\"\r\n        fieldKey=\"SETTINGS_PAG_ACC_ACCESS_ROLE_ROLE\" styleClass=\"w-100\" optionLabel=\"name\" optionValue=\"id\"\r\n        [filter]=\"true\" ariaFilterLabel=\"null\" (onChange)=\"getOrgPages('role')\">\r\n      </p-dropdown>\r\n    </div>\r\n    <div class=\"col-md-3 col-12 mb-3\" *ngIf=\"policyDropDown\">\r\n      <label for=\"policyGroupData\" class=\"radio-title\">Select Policy Group</label>\r\n      <p-dropdown inputId=\"policyGroupData\" [options]=\"policyGroupData\" placeholder=\"Select Policy Group\"\r\n        formControlName=\"policyId\" styleClass=\"w-100\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_POLICY_GROUP_POLICY\"\r\n        optionLabel=\"policygroupname\" optionValue=\"id\" [filter]=\"true\" ariaFilterLabel=\"null\"\r\n        (onChange)=\"getOrgPages('policy')\">\r\n      </p-dropdown>\r\n    </div>\r\n  </div>\r\n</form>", styles: [".mat-radio-group .mat-radio-button{padding-right:10px;font-family:Roboto,sans-serif!important}:host ::ng-deep .selected-list .c-btn{font-size:var(--base-font-size)}.toggleleft{font-size:var(--font-14);font-weight:600;display:block;padding-bottom:13px}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.MatRadioGroup, selector: "mat-radio-group", exportAs: ["matRadioGroup"] }, { kind: "component", type: i5.MatRadioButton, selector: "mat-radio-button", inputs: ["disableRipple", "tabIndex"], exportAs: ["matRadioButton"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i6.PermissionDirective, selector: "[fieldKey]", inputs: ["fieldKey"] }, { kind: "component", type: i7.Dropdown, selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: ManageAccessRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-manage-access-radio', template: "<form [formGroup]=\"rbacForm\" class=\"manage-access-radio\">\r\n  <div class=\"row\">\r\n    <div class=\"col-12 mb-3\">\r\n      <label for=\"accessBy\" class=\"radio-title\">Manage Access By</label>\r\n      <div>\r\n        <mat-radio-group formControlName=\"accessBy\" id=\"accessBy\">\r\n          <mat-radio-button value=\"1\" (click)=\"showDorpdowns('1')\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_USERNAME\">User\r\n            Name</mat-radio-button>\r\n          <mat-radio-button value=\"2\" (click)=\"showDorpdowns('2')\"\r\n            fieldKey=\"SETTINGS_PAG_ACC_ACCESS_ROLE\">Role</mat-radio-button>\r\n          <mat-radio-button value=\"3\" (click)=\"showDorpdowns('3')\"\r\n            fieldKey=\"SETTINGS_PAG_ACC_ACCESS_POLICY_GROUP\">Policy Group</mat-radio-button>\r\n        </mat-radio-group>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-3 col-12 mb-3\" *ngIf=\"userDropDown\">\r\n      <label for=\"userList\" class=\"radio-title\">Select User</label>\r\n      <p-dropdown inputId=\"userList\" [options]=\"userList\" placeholder=\"Select User\" formControlName=\"userId\"\r\n        styleClass=\"w-100\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_USERNAME_USER\" optionLabel=\"displayname\" optionValue=\"id\"\r\n        [filter]=\"true\" ariaFilterLabel=\"null\" (onChange)=\"getOrgPages('user')\">\r\n      </p-dropdown>\r\n    </div>\r\n    <div class=\"col-md-3 col-12 mb-3\" *ngIf=\"roleDropDown\">\r\n      <label for=\"roleAddedData\" class=\"radio-title\">Select Role</label>\r\n      <p-dropdown inputId=\"roleAddedData\" [options]=\"roleAddedData\" placeholder=\"Select Role\" formControlName=\"roleId\"\r\n        fieldKey=\"SETTINGS_PAG_ACC_ACCESS_ROLE_ROLE\" styleClass=\"w-100\" optionLabel=\"name\" optionValue=\"id\"\r\n        [filter]=\"true\" ariaFilterLabel=\"null\" (onChange)=\"getOrgPages('role')\">\r\n      </p-dropdown>\r\n    </div>\r\n    <div class=\"col-md-3 col-12 mb-3\" *ngIf=\"policyDropDown\">\r\n      <label for=\"policyGroupData\" class=\"radio-title\">Select Policy Group</label>\r\n      <p-dropdown inputId=\"policyGroupData\" [options]=\"policyGroupData\" placeholder=\"Select Policy Group\"\r\n        formControlName=\"policyId\" styleClass=\"w-100\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_POLICY_GROUP_POLICY\"\r\n        optionLabel=\"policygroupname\" optionValue=\"id\" [filter]=\"true\" ariaFilterLabel=\"null\"\r\n        (onChange)=\"getOrgPages('policy')\">\r\n      </p-dropdown>\r\n    </div>\r\n  </div>\r\n</form>", styles: [".mat-radio-group .mat-radio-button{padding-right:10px;font-family:Roboto,sans-serif!important}:host ::ng-deep .selected-list .c-btn{font-size:var(--base-font-size)}.toggleleft{font-size:var(--font-14);font-weight:600;display:block;padding-bottom:13px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }, { type: i0.ChangeDetectorRef }, { type: i2.AccessManagementCommonService }, { type: i3.DataStoreService }]; }, propDecorators: { accessBy: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFjY2Vzcy1yYWRpby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQHNoYXJlZC9jb21tb24tY29tcG9uZW50cy9tYW5hZ2UtYWNjZXNzLXJhZGlvL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL3JiYWMtcGFnZWFjY2Vzcy9zcmMvbGliL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0BzaGFyZWQvY29tbW9uLWNvbXBvbmVudHMvbWFuYWdlLWFjY2Vzcy1yYWRpby9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLFdBQVcsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBS3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7Ozs7O0FBTS9ELE1BQU0sT0FBTywwQkFBMEI7SUF1QjNCO0lBQ0Q7SUFDQTtJQUNDO0lBekJWLFFBQVEsQ0FBWTtJQUNwQixRQUFRLEdBQVUsRUFBRSxDQUFDO0lBQ3JCLGVBQWUsR0FBVSxFQUFFLENBQUM7SUFDNUIsYUFBYSxHQUFVLEVBQUUsQ0FBQztJQUMxQixZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDckIsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNiLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBQ25DLGNBQWMsR0FBRyxJQUFJLFlBQVksRUFBTyxD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SSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2xELENBQUM7d0dBcFFVLDBCQUEwQjs0RkFBMUIsMEJBQTBCLHdSQ3JCdkMsKzlFQXdDTzs7NEZEbkJNLDBCQUEwQjtrQkFMdEMsU0FBUzsrQkFDRSx5QkFBeUI7Nk1BWXpCLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csc0JBQXNCO3NCQUEvQixNQUFNO2dCQUNFLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0NoZWNrZWQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9AY29yZS9zZXJ2aWNlL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEFjY2Vzc01hbmFnZW1lbnRDb21tb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vQGNvcmUvdXJscy9hY2Nlc3MtbWFuYWdlbWVudC1jb21tb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEYXRhU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vQGNvcmUvc2VydmljZS9kYXRhLXN0b3JlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSQkFDSU5GTyB9IGZyb20gJy4uLy4uLy4uL0Bjb3JlL3VybHMvcmJhYy11cmwuY29uZmlnJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbWFuYWdlLWFjY2Vzcy1yYWRpbycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFuYWdlQWNjZXNzUmFkaW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XHJcbiAgcmJhY0Zvcm06IEZvcm1Hcm91cDtcclxuICB1c2VyTGlzdDogYW55W10gPSBbXTtcclxuICBwb2xpY3lHcm91cERhdGE6IGFueVtdID0gW107XHJcbiAgcm9sZUFkZGVkRGF0YTogYW55W10gPSBbXTtcclxuICB1c2VyRHJvcERvd24gPSBmYWxzZTtcclxuICByb2xlRHJvcERvd24gPSBmYWxzZTtcclxuICBwb2xpY3lEcm9wRG93biA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBhY2Nlc3NCeSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBwb2xpY3lEcm9wZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSByb2xlRHJvcGRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgdXNlckRyb3Bkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIGRyb3BEb3duU2VsZWN0ZWRWYWx1ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBASW5wdXQoKSByZWxvYWRGb3JtOiBib29sZWFuO1xyXG4gIHVzZXJEcm9wZG93blNldHRpbmdzID0ge307XHJcbiAgcm9sZURyb3Bkb3duU2V0dGluZ3MgPSB7fTtcclxuICBwb2xpY3lEcm9wZG93blNldHRpbmdzID0ge307XHJcbiAgb3JnU3ViczogU3Vic2NyaXB0aW9uO1xyXG4gIG9yZ0lkOiBhbnk7XHJcbiAgZW52aXJvbm1lbnQ6IGFueTtcclxuICBSQkFDT1JHOiBSQkFDSU5GTyA9IG5ldyBSQkFDSU5GTygpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHVibGljIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHB1YmxpYyBhY2Nlc3NNYW5hZ2VtZW50U2VydmljZTogQWNjZXNzTWFuYWdlbWVudENvbW1vblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9zdG9yZXNlcnZpY2U6IERhdGFTdG9yZVNlcnZpY2UsXHJcbiAgICAvLyBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgLy8gdGhpcy5vcmdTdWJzID0gdGhpcy5hdXRoU2VydmljZS5vcmdJbmZvLnN1YnNjcmliZShvID0+IHtcclxuICAgIC8vICAgdGhpcy5vcmdJZCA9IG87XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRoaXMub3JnSWQsICdtYW5hZ2VhY2Nlc3NyYWRpbyBjb21wJyk7XHJcbiAgICAvLyAgIGlmICh0aGlzLm9yZ0lkKSB7XHJcbiAgICAvLyAgICAgdGhpcy5sb2FkRHJvcGRvd25zKCk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pO1xyXG4gICAgdGhpcy5vcmdTdWJzID0gIHRoaXMuX3N0b3Jlc2VydmljZS5jdXJyZW50U3RvcmUuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocmVzWydSQkFDT1JHJ10gJiYgcmVzWydSQkFDT1JHJ10gIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5SQkFDT1JHID0gcmVzWydSQkFDT1JHJ107XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5SQkFDT1JHLCAnUkJBQ09SRyBFdmVudCBTY2hlZHVsZXInKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50ID0gdGhpcy5SQkFDT1JHWydlbnZpcm9ubWVudCddO1xyXG4gICAgICAgIHRoaXMub3JnSWQgPSBwYXJzZUludCh0aGlzLlJCQUNPUkdbJ29yZ0lEJ10pO1xyXG4gICAgICAgIGlmKHRoaXMuZW52aXJvbm1lbnQpe1xyXG4gICAgICAgICAgdGhpcy5sb2FkRHJvcGRvd25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkRm9ybSgpO1xyXG4gICAgdGhpcy51c2VyRHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGV4dDogJ1NlbGVjdCBVc2VyJyxcclxuICAgICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxyXG4gICAgICB1blNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBBbGwnLFxyXG4gICAgICBlbmFibGVTZWFyY2hGaWx0ZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsS2V5OiAnZGlzcGxheW5hbWUnLFxyXG4gICAgICBzZWFyY2hCeTogWydkaXNwbGF5bmFtZSddXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yb2xlRHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGV4dDogJ1NlbGVjdCBQZXJzb25hJyxcclxuICAgICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxyXG4gICAgICB1blNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBBbGwnLFxyXG4gICAgICBlbmFibGVTZWFyY2hGaWx0ZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsS2V5OiAnbmFtZScsXHJcbiAgICAgIHNlYXJjaEJ5OiBbJ25hbWUnXVxyXG4gICAgfTtcclxuICAgIHRoaXMucG9saWN5RHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGV4dDogJ1NlbGVjdCBQb2xpY3knLFxyXG4gICAgICBzZWxlY3RBbGxUZXh0OiAnU2VsZWN0IEFsbCcsXHJcbiAgICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXHJcbiAgICAgIGVuYWJsZVNlYXJjaEZpbHRlcjogdHJ1ZSxcclxuICAgICAgbGFiZWxLZXk6ICdwb2xpY3lncm91cG5hbWUnLFxyXG4gICAgICBzZWFyY2hCeTogWydwb2xpY3lncm91cG5hbWUnXVxyXG4gICAgfTtcclxuICB9XHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm9yZ1N1YnMudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIGxvYWREcm9wZG93bnMoKSB7XHJcbiAgICB0aGlzLmxvYWRVc2VybmFtZSgpO1xyXG4gICAgdGhpcy5nZXRQZXJzb25hKCk7XHJcbiAgICB0aGlzLmdldFBvbGljeUdyb3VwKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkRm9ybSgpIHtcclxuICAgIHRoaXMucmJhY0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgaWQ6IG5ldyBGb3JtQ29udHJvbChudWxsKSxcclxuICAgICAgYWNjZXNzQnk6IG5ldyBGb3JtQ29udHJvbChudWxsKSxcclxuICAgICAgdXNlcklkOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICBwb2xpY3lJZDogbmV3IEZvcm1Db250cm9sKG51bGwpLFxyXG4gICAgICByb2xlSWQ6IG5ldyBGb3JtQ29udHJvbChudWxsKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2FkVXNlcm5hbWUoKSB7XHJcbiAgICB0aGlzLmFjY2Vzc01hbmFnZW1lbnRTZXJ2aWNlLmdldFVzZXJMaXN0KHRoaXMub3JnSWQpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICB0aGlzLnVzZXJMaXN0ID0gcmVzWydkYXRhJ10gJiYgcmVzWydkYXRhJ10ubGVuZ3RoID8gcmVzWydkYXRhJ10gOiBbXTtcclxuICAgICAgdGhpcy51c2VyTGlzdC5mb3JFYWNoKGEgPT4gKGEuZGlzcGxheW5hbWUgPSBgJHthLmZpcnN0bmFtZX0gJHthLmxhc3RuYW1lfWApKTtcclxuICAgICAgdGhpcy51c2VyRHJvcGRvd24uZW1pdCh0aGlzLnVzZXJMaXN0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9saWN5R3JvdXAoKSB7XHJcbiAgICB0aGlzLmFjY2Vzc01hbmFnZW1lbnRTZXJ2aWNlLmdldFBvbGljeUdyb3VwTGlzdCh0aGlzLm9yZ0lkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgdGhpcy5wb2xpY3lHcm91cERhdGEgPSByZXNbJ2RhdGEnXSAmJiByZXNbJ2RhdGEnXS5sZW5ndGggPyByZXNbJ2RhdGEnXSA6IFtdO1xyXG4gICAgICB0aGlzLnBvbGljeURyb3Bkb3duLmVtaXQodGhpcy5wb2xpY3lHcm91cERhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRQZXJzb25hKCkge1xyXG4gICAgdGhpcy5hY2Nlc3NNYW5hZ2VtZW50U2VydmljZS5nZXRSb2xlTGlzdCh0aGlzLm9yZ0lkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5vcmdJZCk7XHJcbiAgICAgIHRoaXMucm9sZUFkZGVkRGF0YSA9IHJlc1snZGF0YSddICYmIHJlc1snZGF0YSddLmxlbmd0aCA/IHJlc1snZGF0YSddIDogW107XHJcbiAgICAgIHRoaXMucm9sZURyb3Bkb3duLmVtaXQodGhpcy5yb2xlQWRkZWREYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvd0RvcnBkb3ducyhpZCkge1xyXG4gICAgaWYgKGlkID09PSAnMScpIHtcclxuICAgICAgdGhpcy51c2VyRHJvcERvd24gPSB0cnVlO1xyXG4gICAgICB0aGlzLnJvbGVEcm9wRG93biA9IHRoaXMucG9saWN5RHJvcERvd24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09ICcyJykge1xyXG4gICAgICB0aGlzLnVzZXJEcm9wRG93biA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJvbGVEcm9wRG93biA9IHRydWU7XHJcbiAgICAgIHRoaXMucG9saWN5RHJvcERvd24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09ICczJykge1xyXG4gICAgICB0aGlzLnVzZXJEcm9wRG93biA9IHRoaXMucm9sZURyb3BEb3duID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucG9saWN5RHJvcERvd24gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY2Nlc3NCeS5lbWl0KGlkKTtcclxuICAgIHRoaXMucmVzZXRGb3JtKGlkKTtcclxuICB9XHJcblxyXG4gIC8vIGVkaXQgZnVuY3Rpb25hbGl0ZXMgYmFzZWQgb24gcG9saWN5IGdyb3VwXHJcbiAgZ2V0RGF0YUJhc2VkT25Qb2xpY3koKSB7XHJcbiAgICBjb25zdCBwb2xpY3lpZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHJvbGVJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncm9sZUlkJykudmFsdWU7XHJcbiAgICBjb25zdCB1c2VySWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3VzZXJJZCcpLnZhbHVlO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IHtcclxuICAgICAgdXNlcmlkOiB1c2VySWRzID8gdXNlcklkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICByb2xlaWQ6IHJvbGVJZHMgPyByb2xlSWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgIHBvbGljeWlkOiBwb2xpY3lpZHMgPyBwb2xpY3lpZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgZnJvbTogJ3BvbGljeSdcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5yYmFjRm9ybS5nZXQoJ3JvbGVJZCcpLnZhbHVlICE9PSBudWxsIHx8IHRoaXMucmJhY0Zvcm0uZ2V0KCd1c2VySWQnKS52YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmRyb3BEb3duU2VsZWN0ZWRWYWx1ZXMuZW1pdChzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHBvbGljeWlkcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2V0Rm9ybSgnMycpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgnYWNjZXNzQnknKS5zZXRWYWx1ZSgnMycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YUJhc2VkT25Sb2xlKCkge1xyXG4gICAgY29uc3Qgcm9sZUlkcyA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlSWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB7XHJcbiAgICAgIHVzZXJpZDogdXNlcklkcyA/IHVzZXJJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgcm9sZWlkOiByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICBwb2xpY3lpZDogcG9saWN5SWRzID8gcG9saWN5SWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgIGZyb206ICdyb2xlJ1xyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChyb2xlSWRzLmxlbmd0aCkge1xyXG4gICAgICBsZXQgZXhpc3RQb2xpY3lJZHMgPSBbXTtcclxuICAgICAgLy8gbG9vcCB0aGUgcm9sZSBpZHNcclxuICAgICAgZm9yIChjb25zdCByb2xlSWQgb2Ygcm9sZUlkcykge1xyXG4gICAgICAgIGNvbnN0IHJvbGVEYXRhID0gdGhpcy5yb2xlQWRkZWREYXRhLmZpbHRlcihrZXkgPT4ga2V5LmlkID09PSByb2xlSWQuaWQpO1xyXG4gICAgICAgIGNvbnN0IGdldFBvbGljeUlkcyA9IHJvbGVEYXRhWzBdWydyb2xlUG9saWN5R3JvdXBDb25maWdzJ10ubWFwKHBJZCA9PiBwSWQucG9saWN5Z3JvdXBpZCk7XHJcbiAgICAgICAgZXhpc3RQb2xpY3lJZHMucHVzaChnZXRQb2xpY3lJZHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG15TmV3QXJyYXkgPSBbXS5jb25jYXQoLi4uZXhpc3RQb2xpY3lJZHMpO1xyXG4gICAgICBjb25zdCB1bmlxdWVQb2xpY3kgPSBbLi4ubmV3IFNldChteU5ld0FycmF5KV07XHJcbiAgICAgIGV4aXN0UG9saWN5SWRzID0gdW5pcXVlUG9saWN5O1xyXG4gICAgICAvLyBzZXQgcG9saWN5IGdyb3VwIHZhbHVlc1xyXG4gICAgICBjb25zdCBwTGlzdCA9IHRoaXMucG9saWN5R3JvdXBEYXRhLmZpbHRlcihrZXkgPT4gZXhpc3RQb2xpY3lJZHMuaW5jbHVkZXMoa2V5LmlkKSk7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdwb2xpY3lJZCcpLnNldFZhbHVlKHBMaXN0KTtcclxuICAgICAgY29uc3QgcG9saWN5SWRWYWx1ZXMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgICAgc2VsZWN0ZWRWYWx1ZS5yb2xlaWQgPSByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsO1xyXG4gICAgICBzZWxlY3RlZFZhbHVlLnBvbGljeWlkID0gcG9saWN5SWRWYWx1ZXMgPyBwb2xpY3lJZFZhbHVlcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsO1xyXG4gICAgICB0aGlzLmRyb3BEb3duU2VsZWN0ZWRWYWx1ZXMuZW1pdChzZWxlY3RlZFZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVzZXRGb3JtKCcyJyk7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdhY2Nlc3NCeScpLnNldFZhbHVlKCcyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSb2xlQW5kUG9saWN5RGF0YSgpIHtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBpZiAodXNlcklkcy5sZW5ndGgpIHtcclxuICAgICAgbGV0IGV4aXN0UG9saWN5SWRzID0gW107XHJcbiAgICAgIGxldCBleGlzdFJvbGVJZHMgPSBbXTtcclxuICAgICAgLy8gbG9vcCB0aGUgcm9sZSBpZHNcclxuICAgICAgZm9yIChjb25zdCB1c2VySWQgb2YgdXNlcklkcykge1xyXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gdGhpcy51c2VyTGlzdC5maWx0ZXIoa2V5ID0+IGtleS5pZCA9PT0gdXNlcklkLmlkKTtcclxuICAgICAgICBjb25zdCBnZXRQb2xpY3lJZHMgPSB1c2VyRGF0YVswXVsncG9saWN5R3JvdXBDb25maWdzJ10ubWFwKHBJZCA9PiBwSWQucG9saWN5Z3JvdXBpZCk7XHJcbiAgICAgICAgZXhpc3RQb2xpY3lJZHMucHVzaChnZXRQb2xpY3lJZHMpO1xyXG4gICAgICAgIGNvbnN0IGdldFJvbGVJZHMgPSB1c2VyRGF0YVswXVsncm9sZUNvbmZpZ3MnXS5tYXAocElkID0+IHBJZC5yb2xlaWQpO1xyXG4gICAgICAgIGV4aXN0Um9sZUlkcy5wdXNoKGdldFJvbGVJZHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG15TmV3UG9saWN5QXJ5ID0gW10uY29uY2F0KC4uLmV4aXN0UG9saWN5SWRzKTtcclxuICAgICAgY29uc3QgdW5pcXVlUG9saWN5ID0gWy4uLm5ldyBTZXQobXlOZXdQb2xpY3lBcnkpXTtcclxuICAgICAgZXhpc3RQb2xpY3lJZHMgPSB1bmlxdWVQb2xpY3k7XHJcbiAgICAgIC8vIHNldCBwb2xpY3kgZ3JvdXAgdmFsdWVzXHJcbiAgICAgIGNvbnN0IHBMaXN0ID0gdGhpcy5wb2xpY3lHcm91cERhdGEuZmlsdGVyKGtleSA9PiBleGlzdFBvbGljeUlkcy5pbmNsdWRlcyhrZXkuaWQpKTtcclxuICAgICAgdGhpcy5yYmFjRm9ybS5nZXQoJ3BvbGljeUlkJykuc2V0VmFsdWUocExpc3QpO1xyXG5cclxuICAgICAgY29uc3QgbXlOZXdSb2xlQXJ5ID0gW10uY29uY2F0KC4uLmV4aXN0Um9sZUlkcyk7XHJcbiAgICAgIGNvbnN0IHVuaXF1ZVJvbGUgPSBbLi4ubmV3IFNldChteU5ld1JvbGVBcnkpXTtcclxuICAgICAgZXhpc3RSb2xlSWRzID0gdW5pcXVlUm9sZTtcclxuICAgICAgLy8gc2V0IHJvbGUgdmFsdWVzXHJcbiAgICAgIGNvbnN0IHJMaXN0ID0gdGhpcy5yb2xlQWRkZWREYXRhLmZpbHRlcihrZXkgPT4gZXhpc3RSb2xlSWRzLmluY2x1ZGVzKGtleS5pZCkpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgncm9sZUlkJykuc2V0VmFsdWUockxpc3QpO1xyXG4gICAgICBjb25zdCByb2xlSWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3JvbGVJZCcpLnZhbHVlO1xyXG4gICAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IHtcclxuICAgICAgICB1c2VyaWQ6IHVzZXJJZHMgPyB1c2VySWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgICAgcm9sZWlkOiByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICAgIHBvbGljeWlkOiBwb2xpY3lJZHMgPyBwb2xpY3lJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgICBmcm9tOiAndXNlcidcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2V0Rm9ybSgnMScpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgnYWNjZXNzQnknKS5zZXRWYWx1ZSgnMScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRGb3JtKGlkID0gbnVsbCkge1xyXG4gICAgdGhpcy5yYmFjRm9ybS5yZXNldCgpO1xyXG4gICAgaWYgKGlkICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdhY2Nlc3NCeScpLnNldFZhbHVlKGlkKTtcclxuICAgICAgdGhpcy5hY2Nlc3NCeS5lbWl0KGlkKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0T3JnUGFnZXModHlwZSkge1xyXG4gICAgY29uc3Qgcm9sZUlkcyA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlSWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB7XHJcbiAgICAgIHVzZXJpZDogdXNlcklkcyxcclxuICAgICAgcm9sZWlkOiByb2xlSWRzLFxyXG4gICAgICBwb2xpY3lpZDogcG9saWN5SWRzLFxyXG4gICAgICBmcm9tOiB0eXBlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxmb3JtIFtmb3JtR3JvdXBdPVwicmJhY0Zvcm1cIiBjbGFzcz1cIm1hbmFnZS1hY2Nlc3MtcmFkaW9cIj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIG1iLTNcIj5cclxuICAgICAgPGxhYmVsIGZvcj1cImFjY2Vzc0J5XCIgY2xhc3M9XCJyYWRpby10aXRsZVwiPk1hbmFnZSBBY2Nlc3MgQnk8L2xhYmVsPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgZm9ybUNvbnRyb2xOYW1lPVwiYWNjZXNzQnlcIiBpZD1cImFjY2Vzc0J5XCI+XHJcbiAgICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIjFcIiAoY2xpY2spPVwic2hvd0RvcnBkb3ducygnMScpXCIgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19VU0VSTkFNRVwiPlVzZXJcclxuICAgICAgICAgICAgTmFtZTwvbWF0LXJhZGlvLWJ1dHRvbj5cclxuICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uIHZhbHVlPVwiMlwiIChjbGljayk9XCJzaG93RG9ycGRvd25zKCcyJylcIlxyXG4gICAgICAgICAgICBmaWVsZEtleT1cIlNFVFRJTkdTX1BBR19BQ0NfQUNDRVNTX1JPTEVcIj5Sb2xlPC9tYXQtcmFkaW8tYnV0dG9uPlxyXG4gICAgICAgICAgPG1hdC1yYWRpby1idXR0b24gdmFsdWU9XCIzXCIgKGNsaWNrKT1cInNob3dEb3JwZG93bnMoJzMnKVwiXHJcbiAgICAgICAgICAgIGZpZWxkS2V5PVwiU0VUVElOR1NfUEFHX0FDQ19BQ0NFU1NfUE9MSUNZX0dST1VQXCI+UG9saWN5IEdyb3VwPC9tYXQtcmFkaW8tYnV0dG9uPlxyXG4gICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBjb2wtMTIgbWItM1wiICpuZ0lmPVwidXNlckRyb3BEb3duXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJ1c2VyTGlzdFwiIGNsYXNzPVwicmFkaW8tdGl0bGVcIj5TZWxlY3QgVXNlcjwvbGFiZWw+XHJcbiAgICAgIDxwLWRyb3Bkb3duIGlucHV0SWQ9XCJ1c2VyTGlzdFwiIFtvcHRpb25zXT1cInVzZXJMaXN0XCIgcGxhY2Vob2xkZXI9XCJTZWxlY3QgVXNlclwiIGZvcm1Db250cm9sTmFtZT1cInVzZXJJZFwiXHJcbiAgICAgICAgc3R5bGVDbGFzcz1cInctMTAwXCIgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19VU0VSTkFNRV9VU0VSXCIgb3B0aW9uTGFiZWw9XCJkaXNwbGF5bmFtZVwiIG9wdGlvblZhbHVlPVwiaWRcIlxyXG4gICAgICAgIFtmaWx0ZXJdPVwidHJ1ZVwiIGFyaWFGaWx0ZXJMYWJlbD1cIm51bGxcIiAob25DaGFuZ2UpPVwiZ2V0T3JnUGFnZXMoJ3VzZXInKVwiPlxyXG4gICAgICA8L3AtZHJvcGRvd24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBjb2wtMTIgbWItM1wiICpuZ0lmPVwicm9sZURyb3BEb3duXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJyb2xlQWRkZWREYXRhXCIgY2xhc3M9XCJyYWRpby10aXRsZVwiPlNlbGVjdCBSb2xlPC9sYWJlbD5cclxuICAgICAgPHAtZHJvcGRvd24gaW5wdXRJZD1cInJvbGVBZGRlZERhdGFcIiBbb3B0aW9uc109XCJyb2xlQWRkZWREYXRhXCIgcGxhY2Vob2xkZXI9XCJTZWxlY3QgUm9sZVwiIGZvcm1Db250cm9sTmFtZT1cInJvbGVJZFwiXHJcbiAgICAgICAgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19ST0xFX1JPTEVcIiBzdHlsZUNsYXNzPVwidy0xMDBcIiBvcHRpb25MYWJlbD1cIm5hbWVcIiBvcHRpb25WYWx1ZT1cImlkXCJcclxuICAgICAgICBbZmlsdGVyXT1cInRydWVcIiBhcmlhRmlsdGVyTGFiZWw9XCJudWxsXCIgKG9uQ2hhbmdlKT1cImdldE9yZ1BhZ2VzKCdyb2xlJylcIj5cclxuICAgICAgPC9wLWRyb3Bkb3duPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgY29sLTEyIG1iLTNcIiAqbmdJZj1cInBvbGljeURyb3BEb3duXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJwb2xpY3lHcm91cERhdGFcIiBjbGFzcz1cInJhZGlvLXRpdGxlXCI+U2VsZWN0IFBvbGljeSBHcm91cDwvbGFiZWw+XHJcbiAgICAgIDxwLWRyb3Bkb3duIGlucHV0SWQ9XCJwb2xpY3lHcm91cERhdGFcIiBbb3B0aW9uc109XCJwb2xpY3lHcm91cERhdGFcIiBwbGFjZWhvbGRlcj1cIlNlbGVjdCBQb2xpY3kgR3JvdXBcIlxyXG4gICAgICAgIGZvcm1Db250cm9sTmFtZT1cInBvbGljeUlkXCIgc3R5bGVDbGFzcz1cInctMTAwXCIgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19QT0xJQ1lfR1JPVVBfUE9MSUNZXCJcclxuICAgICAgICBvcHRpb25MYWJlbD1cInBvbGljeWdyb3VwbmFtZVwiIG9wdGlvblZhbHVlPVwiaWRcIiBbZmlsdGVyXT1cInRydWVcIiBhcmlhRmlsdGVyTGFiZWw9XCJudWxsXCJcclxuICAgICAgICAob25DaGFuZ2UpPVwiZ2V0T3JnUGFnZXMoJ3BvbGljeScpXCI+XHJcbiAgICAgIDwvcC1kcm9wZG93bj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Zvcm0+Il19