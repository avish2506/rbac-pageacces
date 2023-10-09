import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RBACINFO } from '../../urls/rbac-url.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../urls/access-management-common.service";
import * as i3 from "../../service/data-store.service";
import * as i4 from "@angular/material/radio";
import * as i5 from "primeng/dropdown";
import * as i6 from "../../directives/permission.directive";
import * as i7 from "@angular/common";
export class ManageAccessRadioComponent {
    constructor(formBuilder, cdRef, accessManagementService, _storeservice) {
        this.formBuilder = formBuilder;
        this.cdRef = cdRef;
        this.accessManagementService = accessManagementService;
        this._storeservice = _storeservice;
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
        this.RBACORG = new RBACINFO();
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
}
ManageAccessRadioComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ManageAccessRadioComponent, deps: [{ token: i1.FormBuilder }, { token: i0.ChangeDetectorRef }, { token: i2.AccessManagementCommonService }, { token: i3.DataStoreService }], target: i0.ɵɵFactoryTarget.Component });
ManageAccessRadioComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: ManageAccessRadioComponent, selector: "app-manage-access-radio", inputs: { reloadForm: "reloadForm" }, outputs: { accessBy: "accessBy", policyDropdown: "policyDropdown", roleDropdown: "roleDropdown", userDropdown: "userDropdown", dropDownSelectedValues: "dropDownSelectedValues" }, ngImport: i0, template: "<form [formGroup]=\"rbacForm\" class=\"manage-access-radio\">\r\n  <div class=\"row\">\r\n    <div class=\"col-12\">\r\n      <div class=\"strip_head toggleleft\">\r\n        <span class=\"report_head font-weight-bold\">Manage Access By</span>\r\n      </div>\r\n      <mat-radio-group formControlName=\"accessBy\">\r\n        <mat-radio-button value=\"1\" (click)=\"showDorpdowns('1')\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_USERNAME\"\r\n          >User Name</mat-radio-button\r\n        >\r\n        <mat-radio-button value=\"2\" (click)=\"showDorpdowns('2')\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_ROLE\"\r\n          >Role</mat-radio-button\r\n        >\r\n        <mat-radio-button value=\"3\" (click)=\"showDorpdowns('3')\" fieldKey=\"SETTINGS_PAG_ACC_ACCESS_POLICY_GROUP\"\r\n          >Policy Group</mat-radio-button\r\n        >\r\n      </mat-radio-group>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-3 col-12 mt-3\" *ngIf=\"userDropDown\">\r\n      <p class=\"radio-title\">Select User</p>\r\n      <p-dropdown\r\n        inputId=\"role\"\r\n        [options]=\"userList\"\r\n        placeholder=\"Select User\"\r\n        formControlName=\"userId\"\r\n        styleClass=\"w-100\"\r\n        fieldKey=\"SETTINGS_PAG_ACC_ACCESS_USERNAME_USER\"\r\n        optionLabel=\"displayname\"\r\n        optionValue=\"id\"\r\n        [filter]=\"true\"\r\n        ariaFilterLabel=\"null\"\r\n        (onChange)=\"getOrgPages('user')\">\r\n      </p-dropdown>\r\n    </div>\r\n    <div class=\"col-md-3 col-12 mt-3\" *ngIf=\"roleDropDown\">\r\n      <p class=\"radio-title\">Select Role</p>\r\n      <p-dropdown\r\n        inputId=\"role\"\r\n        [options]=\"roleAddedData\"\r\n        placeholder=\"Select Role\"\r\n        formControlName=\"roleId\"\r\n        fieldKey=\"SETTINGS_PAG_ACC_ACCESS_ROLE_ROLE\"\r\n        styleClass=\"w-100\"\r\n        optionLabel=\"name\"\r\n        optionValue=\"id\"\r\n        [filter]=\"true\"\r\n        ariaFilterLabel=\"null\"\r\n        (onChange)=\"getOrgPages('role')\">\r\n      </p-dropdown>\r\n    </div>\r\n    <div class=\"col-md-3 col-12 mt-3\" *ngIf=\"policyDropDown\">\r\n      <p class=\"radio-title\">Select Policy Group</p>\r\n      <p-dropdown\r\n        inputId=\"role\"\r\n        [options]=\"policyGroupData\"\r\n        placeholder=\"Select Policy Group\"\r\n        formControlName=\"policyId\"\r\n        styleClass=\"w-100\"\r\n        fieldKey=\"SETTINGS_PAG_ACC_ACCESS_POLICY_GROUP_POLICY\"\r\n        optionLabel=\"policygroupname\"\r\n        optionValue=\"id\"\r\n        [filter]=\"true\"\r\n        ariaFilterLabel=\"null\"\r\n        (onChange)=\"getOrgPages('policy')\">\r\n      </p-dropdown>\r\n    </div>\r\n  </div>\r\n</form>\r\n<br />\r\n", styles: [".mat-radio-group .mat-radio-button{padding-right:10px;font-family:\"Roboto\",sans-serif!important}.radio-title{color:var(--label-text);font-size:var(--font-14);font-weight:600;margin-bottom:10px}:host ::ng-deep .selected-list .c-btn{font-size:var(--base-font-size)}.toggleleft{font-size:var(--font-14);font-weight:600;display:block;padding-bottom:13px}\n"], components: [{ type: i4.MatRadioButton, selector: "mat-radio-button", inputs: ["disableRipple", "tabIndex"], exportAs: ["matRadioButton"] }, { type: i5.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear"] }], directives: [{ type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i4.MatRadioGroup, selector: "mat-radio-group", exportAs: ["matRadioGroup"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6.PermissionDirective, selector: "[fieldKey]", inputs: ["fieldKey"] }, { type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: ManageAccessRadioComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-manage-access-radio',
                    templateUrl: './manage-access-radio.component.html',
                    styleUrls: ['./manage-access-radio.component.scss']
                }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFjY2Vzcy1yYWRpby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQGNvcmUvY29tbW9uLWNvbXBvbmVudHMvbWFuYWdlLWFjY2Vzcy1yYWRpby9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9jb21tb24tY29tcG9uZW50cy9tYW5hZ2UtYWNjZXNzLXJhZGlvL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsV0FBVyxFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFLckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7Ozs7QUFNdEQsTUFBTSxPQUFPLDBCQUEwQjtJQXNCckMsWUFDVSxXQUF3QixFQUN6QixLQUF3QixFQUN4Qix1QkFBc0QsRUFDckQsYUFBK0I7UUFIL0IsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUErQjtRQUNyRCxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUF4QnpDLGFBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsb0JBQWUsR0FBVSxFQUFFLENBQUM7UUFDNUIsa0JBQWEsR0FBVSxFQUFFLENBQUM7UUFDMUIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDYixhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUNuQyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDekMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3ZDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN2QywyQkFBc0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTNELHlCQUFvQixHQUFHLEVBQUUsQ0FBQztRQUMxQix5QkFBb0IsR0FBRyxFQUFFLENBQUM7UUFDMUIsMkJBQXNCLEdBQUcsRUFBRSxDQUFDO1FBSTVCLFlBQU8sR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBU2pDLDJEQUEyRDtRQUMzRCxvQkFBb0I7UUFDcEIsdURBQXVEO1FBQ3ZELHNCQUFzQjtRQUN0Qiw0QkFBNEI7UUFDNUIsTUFBTTtRQUNOLE1BQU07UUFDTixJQUFJLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ3JFLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUseUJBQXlCLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBQztvQkFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN0QjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsb0JBQW9CLEdBQUc7WUFDMUIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsYUFBYSxFQUFFLFlBQVk7WUFDM0IsZUFBZSxFQUFFLGNBQWM7WUFDL0Isa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUM7U0FDMUIsQ0FBQztRQUNGLElBQUksQ0FBQyxvQkFBb0IsR0FBRztZQUMxQixlQUFlLEVBQUUsS0FBSztZQUN0QixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLGFBQWEsRUFBRSxZQUFZO1lBQzNCLGVBQWUsRUFBRSxjQUFjO1lBQy9CLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ25CLENBQUM7UUFDRixJQUFJLENBQUMsc0JBQXNCLEdBQUc7WUFDNUIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsSUFBSSxFQUFFLGVBQWU7WUFDckIsYUFBYSxFQUFFLFlBQVk7WUFDM0IsZUFBZSxFQUFFLGNBQWM7WUFDL0Isa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1NBQzlCLENBQUM7SUFDSixDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ3JDLEVBQUUsRUFBRSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDekIsUUFBUSxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQztZQUMvQixNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQzNCLFFBQVEsRUFBRSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDL0IsTUFBTSxFQUFFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQztTQUM5QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNuRSxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFFLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBRTtRQUNkLElBQUksRUFBRSxLQUFLLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDakQ7YUFBTSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDN0I7YUFBTSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELDRDQUE0QztJQUM1QyxvQkFBb0I7UUFDbEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxhQUFhLEdBQUc7WUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNuRCxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ25ELFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDekQsSUFBSSxFQUFFLFFBQVE7U0FDZixDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDNUYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNoRCxPQUFPO1NBQ1I7UUFDRCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDcEIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELE1BQU0sYUFBYSxHQUFHO1lBQ3BCLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDbkQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNuRCxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3pELElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUM5QyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2hELE9BQU87U0FDUjtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFDeEIsb0JBQW9CO1lBQ3BCLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3pGLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7WUFDRCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7WUFDaEQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDOUMsY0FBYyxHQUFHLFlBQVksQ0FBQztZQUM5QiwwQkFBMEI7WUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDM0QsYUFBYSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuRSxhQUFhLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25GLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDakQ7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdEIsb0JBQW9CO1lBQ3BCLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3JGLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3JFLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDL0I7WUFDRCxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7WUFDcEQsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsY0FBYyxHQUFHLFlBQVksQ0FBQztZQUM5QiwwQkFBMEI7WUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU5QyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUM7WUFDaEQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDOUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztZQUMxQixrQkFBa0I7WUFDbEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3RELE1BQU0sYUFBYSxHQUFHO2dCQUNwQixNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNuRCxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNuRCxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUN6RCxJQUFJLEVBQUUsTUFBTTthQUNiLENBQUM7WUFDRixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2pEO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsRUFBRSxHQUFHLElBQUk7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBQ0QsV0FBVyxDQUFDLElBQUk7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN0RCxNQUFNLGFBQWEsR0FBRztZQUNwQixNQUFNLEVBQUUsT0FBTztZQUNmLE1BQU0sRUFBRSxPQUFPO1lBQ2YsUUFBUSxFQUFFLFNBQVM7WUFDbkIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO1FBQ0YsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRCxDQUFDOzt3SEFwUVUsMEJBQTBCOzRHQUExQiwwQkFBMEIsd1JDckJ2Qyw4ckZBdUVBOzRGRGxEYSwwQkFBMEI7a0JBTHRDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsV0FBVyxFQUFFLHNDQUFzQztvQkFDbkQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7aUJBQ3BEOzZNQVNXLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csY0FBYztzQkFBdkIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csc0JBQXNCO3NCQUEvQixNQUFNO2dCQUNFLFVBQVU7c0JBQWxCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0NoZWNrZWQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlL2F1dGguc2VydmljZSc7XHJcbmltcG9ydCB7IEFjY2Vzc01hbmFnZW1lbnRDb21tb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXJscy9hY2Nlc3MtbWFuYWdlbWVudC1jb21tb24uc2VydmljZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEYXRhU3RvcmVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZS9kYXRhLXN0b3JlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBSQkFDSU5GTyB9IGZyb20gJy4uLy4uL3VybHMvcmJhYy11cmwuY29uZmlnJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHAtbWFuYWdlLWFjY2Vzcy1yYWRpbycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFuYWdlQWNjZXNzUmFkaW9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSB7XHJcbiAgcmJhY0Zvcm06IEZvcm1Hcm91cDtcclxuICB1c2VyTGlzdDogYW55W10gPSBbXTtcclxuICBwb2xpY3lHcm91cERhdGE6IGFueVtdID0gW107XHJcbiAgcm9sZUFkZGVkRGF0YTogYW55W10gPSBbXTtcclxuICB1c2VyRHJvcERvd24gPSBmYWxzZTtcclxuICByb2xlRHJvcERvd24gPSBmYWxzZTtcclxuICBwb2xpY3lEcm9wRG93biA9IGZhbHNlO1xyXG4gIEBPdXRwdXQoKSBhY2Nlc3NCeSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBwb2xpY3lEcm9wZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSByb2xlRHJvcGRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgdXNlckRyb3Bkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIGRyb3BEb3duU2VsZWN0ZWRWYWx1ZXMgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBASW5wdXQoKSByZWxvYWRGb3JtOiBib29sZWFuO1xyXG4gIHVzZXJEcm9wZG93blNldHRpbmdzID0ge307XHJcbiAgcm9sZURyb3Bkb3duU2V0dGluZ3MgPSB7fTtcclxuICBwb2xpY3lEcm9wZG93blNldHRpbmdzID0ge307XHJcbiAgb3JnU3ViczogU3Vic2NyaXB0aW9uO1xyXG4gIG9yZ0lkOiBhbnk7XHJcbiAgZW52aXJvbm1lbnQ6IGFueTtcclxuICBSQkFDT1JHOiBSQkFDSU5GTyA9IG5ldyBSQkFDSU5GTygpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxyXG4gICAgcHVibGljIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHB1YmxpYyBhY2Nlc3NNYW5hZ2VtZW50U2VydmljZTogQWNjZXNzTWFuYWdlbWVudENvbW1vblNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9zdG9yZXNlcnZpY2U6IERhdGFTdG9yZVNlcnZpY2UsXHJcbiAgICAvLyBwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZVxyXG4gICkge1xyXG4gICAgLy8gdGhpcy5vcmdTdWJzID0gdGhpcy5hdXRoU2VydmljZS5vcmdJbmZvLnN1YnNjcmliZShvID0+IHtcclxuICAgIC8vICAgdGhpcy5vcmdJZCA9IG87XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKHRoaXMub3JnSWQsICdtYW5hZ2VhY2Nlc3NyYWRpbyBjb21wJyk7XHJcbiAgICAvLyAgIGlmICh0aGlzLm9yZ0lkKSB7XHJcbiAgICAvLyAgICAgdGhpcy5sb2FkRHJvcGRvd25zKCk7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0pO1xyXG4gICAgdGhpcy5vcmdTdWJzID0gIHRoaXMuX3N0b3Jlc2VydmljZS5jdXJyZW50U3RvcmUuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocmVzWydSQkFDT1JHJ10gJiYgcmVzWydSQkFDT1JHJ10gIT09ICcnKSB7XHJcbiAgICAgICAgdGhpcy5SQkFDT1JHID0gcmVzWydSQkFDT1JHJ107XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5SQkFDT1JHLCAnUkJBQ09SRyBFdmVudCBTY2hlZHVsZXInKTtcclxuICAgICAgICB0aGlzLmVudmlyb25tZW50ID0gdGhpcy5SQkFDT1JHWydlbnZpcm9ubWVudCddO1xyXG4gICAgICAgIHRoaXMub3JnSWQgPSBwYXJzZUludCh0aGlzLlJCQUNPUkdbJ29yZ0lEJ10pO1xyXG4gICAgICAgIGlmKHRoaXMuZW52aXJvbm1lbnQpe1xyXG4gICAgICAgICAgdGhpcy5sb2FkRHJvcGRvd25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5sb2FkRm9ybSgpO1xyXG4gICAgdGhpcy51c2VyRHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGV4dDogJ1NlbGVjdCBVc2VyJyxcclxuICAgICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxyXG4gICAgICB1blNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBBbGwnLFxyXG4gICAgICBlbmFibGVTZWFyY2hGaWx0ZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsS2V5OiAnZGlzcGxheW5hbWUnLFxyXG4gICAgICBzZWFyY2hCeTogWydkaXNwbGF5bmFtZSddXHJcbiAgICB9O1xyXG4gICAgdGhpcy5yb2xlRHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGV4dDogJ1NlbGVjdCBQZXJzb25hJyxcclxuICAgICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxyXG4gICAgICB1blNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBBbGwnLFxyXG4gICAgICBlbmFibGVTZWFyY2hGaWx0ZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsS2V5OiAnbmFtZScsXHJcbiAgICAgIHNlYXJjaEJ5OiBbJ25hbWUnXVxyXG4gICAgfTtcclxuICAgIHRoaXMucG9saWN5RHJvcGRvd25TZXR0aW5ncyA9IHtcclxuICAgICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGV4dDogJ1NlbGVjdCBQb2xpY3knLFxyXG4gICAgICBzZWxlY3RBbGxUZXh0OiAnU2VsZWN0IEFsbCcsXHJcbiAgICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXHJcbiAgICAgIGVuYWJsZVNlYXJjaEZpbHRlcjogdHJ1ZSxcclxuICAgICAgbGFiZWxLZXk6ICdwb2xpY3lncm91cG5hbWUnLFxyXG4gICAgICBzZWFyY2hCeTogWydwb2xpY3lncm91cG5hbWUnXVxyXG4gICAgfTtcclxuICB9XHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm9yZ1N1YnMudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgfVxyXG4gIGxvYWREcm9wZG93bnMoKSB7XHJcbiAgICB0aGlzLmxvYWRVc2VybmFtZSgpO1xyXG4gICAgdGhpcy5nZXRQZXJzb25hKCk7XHJcbiAgICB0aGlzLmdldFBvbGljeUdyb3VwKCk7XHJcbiAgfVxyXG5cclxuICBsb2FkRm9ybSgpIHtcclxuICAgIHRoaXMucmJhY0Zvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgaWQ6IG5ldyBGb3JtQ29udHJvbChudWxsKSxcclxuICAgICAgYWNjZXNzQnk6IG5ldyBGb3JtQ29udHJvbChudWxsKSxcclxuICAgICAgdXNlcklkOiBuZXcgRm9ybUNvbnRyb2woJycpLFxyXG4gICAgICBwb2xpY3lJZDogbmV3IEZvcm1Db250cm9sKG51bGwpLFxyXG4gICAgICByb2xlSWQ6IG5ldyBGb3JtQ29udHJvbChudWxsKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2FkVXNlcm5hbWUoKSB7XHJcbiAgICB0aGlzLmFjY2Vzc01hbmFnZW1lbnRTZXJ2aWNlLmdldFVzZXJMaXN0KHRoaXMub3JnSWQpLnN1YnNjcmliZShyZXMgPT4ge1xyXG4gICAgICB0aGlzLnVzZXJMaXN0ID0gcmVzWydkYXRhJ10gJiYgcmVzWydkYXRhJ10ubGVuZ3RoID8gcmVzWydkYXRhJ10gOiBbXTtcclxuICAgICAgdGhpcy51c2VyTGlzdC5mb3JFYWNoKGEgPT4gKGEuZGlzcGxheW5hbWUgPSBgJHthLmZpcnN0bmFtZX0gJHthLmxhc3RuYW1lfWApKTtcclxuICAgICAgdGhpcy51c2VyRHJvcGRvd24uZW1pdCh0aGlzLnVzZXJMaXN0KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9saWN5R3JvdXAoKSB7XHJcbiAgICB0aGlzLmFjY2Vzc01hbmFnZW1lbnRTZXJ2aWNlLmdldFBvbGljeUdyb3VwTGlzdCh0aGlzLm9yZ0lkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgdGhpcy5wb2xpY3lHcm91cERhdGEgPSByZXNbJ2RhdGEnXSAmJiByZXNbJ2RhdGEnXS5sZW5ndGggPyByZXNbJ2RhdGEnXSA6IFtdO1xyXG4gICAgICB0aGlzLnBvbGljeURyb3Bkb3duLmVtaXQodGhpcy5wb2xpY3lHcm91cERhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRQZXJzb25hKCkge1xyXG4gICAgdGhpcy5hY2Nlc3NNYW5hZ2VtZW50U2VydmljZS5nZXRSb2xlTGlzdCh0aGlzLm9yZ0lkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5vcmdJZCk7XHJcbiAgICAgIHRoaXMucm9sZUFkZGVkRGF0YSA9IHJlc1snZGF0YSddICYmIHJlc1snZGF0YSddLmxlbmd0aCA/IHJlc1snZGF0YSddIDogW107XHJcbiAgICAgIHRoaXMucm9sZURyb3Bkb3duLmVtaXQodGhpcy5yb2xlQWRkZWREYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc2hvd0RvcnBkb3ducyhpZCkge1xyXG4gICAgaWYgKGlkID09PSAnMScpIHtcclxuICAgICAgdGhpcy51c2VyRHJvcERvd24gPSB0cnVlO1xyXG4gICAgICB0aGlzLnJvbGVEcm9wRG93biA9IHRoaXMucG9saWN5RHJvcERvd24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09ICcyJykge1xyXG4gICAgICB0aGlzLnVzZXJEcm9wRG93biA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJvbGVEcm9wRG93biA9IHRydWU7XHJcbiAgICAgIHRoaXMucG9saWN5RHJvcERvd24gPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoaWQgPT09ICczJykge1xyXG4gICAgICB0aGlzLnVzZXJEcm9wRG93biA9IHRoaXMucm9sZURyb3BEb3duID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucG9saWN5RHJvcERvd24gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hY2Nlc3NCeS5lbWl0KGlkKTtcclxuICAgIHRoaXMucmVzZXRGb3JtKGlkKTtcclxuICB9XHJcblxyXG4gIC8vIGVkaXQgZnVuY3Rpb25hbGl0ZXMgYmFzZWQgb24gcG9saWN5IGdyb3VwXHJcbiAgZ2V0RGF0YUJhc2VkT25Qb2xpY3koKSB7XHJcbiAgICBjb25zdCBwb2xpY3lpZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHJvbGVJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncm9sZUlkJykudmFsdWU7XHJcbiAgICBjb25zdCB1c2VySWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3VzZXJJZCcpLnZhbHVlO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IHtcclxuICAgICAgdXNlcmlkOiB1c2VySWRzID8gdXNlcklkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICByb2xlaWQ6IHJvbGVJZHMgPyByb2xlSWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgIHBvbGljeWlkOiBwb2xpY3lpZHMgPyBwb2xpY3lpZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgZnJvbTogJ3BvbGljeSdcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5yYmFjRm9ybS5nZXQoJ3JvbGVJZCcpLnZhbHVlICE9PSBudWxsIHx8IHRoaXMucmJhY0Zvcm0uZ2V0KCd1c2VySWQnKS52YWx1ZSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmRyb3BEb3duU2VsZWN0ZWRWYWx1ZXMuZW1pdChzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHBvbGljeWlkcy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2V0Rm9ybSgnMycpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgnYWNjZXNzQnknKS5zZXRWYWx1ZSgnMycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0RGF0YUJhc2VkT25Sb2xlKCkge1xyXG4gICAgY29uc3Qgcm9sZUlkcyA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlSWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB7XHJcbiAgICAgIHVzZXJpZDogdXNlcklkcyA/IHVzZXJJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgcm9sZWlkOiByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICBwb2xpY3lpZDogcG9saWN5SWRzID8gcG9saWN5SWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgIGZyb206ICdyb2xlJ1xyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChyb2xlSWRzLmxlbmd0aCkge1xyXG4gICAgICBsZXQgZXhpc3RQb2xpY3lJZHMgPSBbXTtcclxuICAgICAgLy8gbG9vcCB0aGUgcm9sZSBpZHNcclxuICAgICAgZm9yIChjb25zdCByb2xlSWQgb2Ygcm9sZUlkcykge1xyXG4gICAgICAgIGNvbnN0IHJvbGVEYXRhID0gdGhpcy5yb2xlQWRkZWREYXRhLmZpbHRlcihrZXkgPT4ga2V5LmlkID09PSByb2xlSWQuaWQpO1xyXG4gICAgICAgIGNvbnN0IGdldFBvbGljeUlkcyA9IHJvbGVEYXRhWzBdWydyb2xlUG9saWN5R3JvdXBDb25maWdzJ10ubWFwKHBJZCA9PiBwSWQucG9saWN5Z3JvdXBpZCk7XHJcbiAgICAgICAgZXhpc3RQb2xpY3lJZHMucHVzaChnZXRQb2xpY3lJZHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG15TmV3QXJyYXkgPSBbXS5jb25jYXQoLi4uZXhpc3RQb2xpY3lJZHMpO1xyXG4gICAgICBjb25zdCB1bmlxdWVQb2xpY3kgPSBbLi4ubmV3IFNldChteU5ld0FycmF5KV07XHJcbiAgICAgIGV4aXN0UG9saWN5SWRzID0gdW5pcXVlUG9saWN5O1xyXG4gICAgICAvLyBzZXQgcG9saWN5IGdyb3VwIHZhbHVlc1xyXG4gICAgICBjb25zdCBwTGlzdCA9IHRoaXMucG9saWN5R3JvdXBEYXRhLmZpbHRlcihrZXkgPT4gZXhpc3RQb2xpY3lJZHMuaW5jbHVkZXMoa2V5LmlkKSk7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdwb2xpY3lJZCcpLnNldFZhbHVlKHBMaXN0KTtcclxuICAgICAgY29uc3QgcG9saWN5SWRWYWx1ZXMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgICAgc2VsZWN0ZWRWYWx1ZS5yb2xlaWQgPSByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsO1xyXG4gICAgICBzZWxlY3RlZFZhbHVlLnBvbGljeWlkID0gcG9saWN5SWRWYWx1ZXMgPyBwb2xpY3lJZFZhbHVlcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsO1xyXG4gICAgICB0aGlzLmRyb3BEb3duU2VsZWN0ZWRWYWx1ZXMuZW1pdChzZWxlY3RlZFZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucmVzZXRGb3JtKCcyJyk7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdhY2Nlc3NCeScpLnNldFZhbHVlKCcyJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRSb2xlQW5kUG9saWN5RGF0YSgpIHtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBpZiAodXNlcklkcy5sZW5ndGgpIHtcclxuICAgICAgbGV0IGV4aXN0UG9saWN5SWRzID0gW107XHJcbiAgICAgIGxldCBleGlzdFJvbGVJZHMgPSBbXTtcclxuICAgICAgLy8gbG9vcCB0aGUgcm9sZSBpZHNcclxuICAgICAgZm9yIChjb25zdCB1c2VySWQgb2YgdXNlcklkcykge1xyXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gdGhpcy51c2VyTGlzdC5maWx0ZXIoa2V5ID0+IGtleS5pZCA9PT0gdXNlcklkLmlkKTtcclxuICAgICAgICBjb25zdCBnZXRQb2xpY3lJZHMgPSB1c2VyRGF0YVswXVsncG9saWN5R3JvdXBDb25maWdzJ10ubWFwKHBJZCA9PiBwSWQucG9saWN5Z3JvdXBpZCk7XHJcbiAgICAgICAgZXhpc3RQb2xpY3lJZHMucHVzaChnZXRQb2xpY3lJZHMpO1xyXG4gICAgICAgIGNvbnN0IGdldFJvbGVJZHMgPSB1c2VyRGF0YVswXVsncm9sZUNvbmZpZ3MnXS5tYXAocElkID0+IHBJZC5yb2xlaWQpO1xyXG4gICAgICAgIGV4aXN0Um9sZUlkcy5wdXNoKGdldFJvbGVJZHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG15TmV3UG9saWN5QXJ5ID0gW10uY29uY2F0KC4uLmV4aXN0UG9saWN5SWRzKTtcclxuICAgICAgY29uc3QgdW5pcXVlUG9saWN5ID0gWy4uLm5ldyBTZXQobXlOZXdQb2xpY3lBcnkpXTtcclxuICAgICAgZXhpc3RQb2xpY3lJZHMgPSB1bmlxdWVQb2xpY3k7XHJcbiAgICAgIC8vIHNldCBwb2xpY3kgZ3JvdXAgdmFsdWVzXHJcbiAgICAgIGNvbnN0IHBMaXN0ID0gdGhpcy5wb2xpY3lHcm91cERhdGEuZmlsdGVyKGtleSA9PiBleGlzdFBvbGljeUlkcy5pbmNsdWRlcyhrZXkuaWQpKTtcclxuICAgICAgdGhpcy5yYmFjRm9ybS5nZXQoJ3BvbGljeUlkJykuc2V0VmFsdWUocExpc3QpO1xyXG5cclxuICAgICAgY29uc3QgbXlOZXdSb2xlQXJ5ID0gW10uY29uY2F0KC4uLmV4aXN0Um9sZUlkcyk7XHJcbiAgICAgIGNvbnN0IHVuaXF1ZVJvbGUgPSBbLi4ubmV3IFNldChteU5ld1JvbGVBcnkpXTtcclxuICAgICAgZXhpc3RSb2xlSWRzID0gdW5pcXVlUm9sZTtcclxuICAgICAgLy8gc2V0IHJvbGUgdmFsdWVzXHJcbiAgICAgIGNvbnN0IHJMaXN0ID0gdGhpcy5yb2xlQWRkZWREYXRhLmZpbHRlcihrZXkgPT4gZXhpc3RSb2xlSWRzLmluY2x1ZGVzKGtleS5pZCkpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgncm9sZUlkJykuc2V0VmFsdWUockxpc3QpO1xyXG4gICAgICBjb25zdCByb2xlSWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3JvbGVJZCcpLnZhbHVlO1xyXG4gICAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZSA9IHtcclxuICAgICAgICB1c2VyaWQ6IHVzZXJJZHMgPyB1c2VySWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgICAgcm9sZWlkOiByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICAgIHBvbGljeWlkOiBwb2xpY3lJZHMgPyBwb2xpY3lJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgICBmcm9tOiAndXNlcidcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2V0Rm9ybSgnMScpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgnYWNjZXNzQnknKS5zZXRWYWx1ZSgnMScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVzZXRGb3JtKGlkID0gbnVsbCkge1xyXG4gICAgdGhpcy5yYmFjRm9ybS5yZXNldCgpO1xyXG4gICAgaWYgKGlkICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdhY2Nlc3NCeScpLnNldFZhbHVlKGlkKTtcclxuICAgICAgdGhpcy5hY2Nlc3NCeS5lbWl0KGlkKTtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0T3JnUGFnZXModHlwZSkge1xyXG4gICAgY29uc3Qgcm9sZUlkcyA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlSWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWU7XHJcbiAgICBjb25zdCBwb2xpY3lJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB7XHJcbiAgICAgIHVzZXJpZDogdXNlcklkcyxcclxuICAgICAgcm9sZWlkOiByb2xlSWRzLFxyXG4gICAgICBwb2xpY3lpZDogcG9saWN5SWRzLFxyXG4gICAgICBmcm9tOiB0eXBlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxmb3JtIFtmb3JtR3JvdXBdPVwicmJhY0Zvcm1cIiBjbGFzcz1cIm1hbmFnZS1hY2Nlc3MtcmFkaW9cIj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTEyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzdHJpcF9oZWFkIHRvZ2dsZWxlZnRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInJlcG9ydF9oZWFkIGZvbnQtd2VpZ2h0LWJvbGRcIj5NYW5hZ2UgQWNjZXNzIEJ5PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPG1hdC1yYWRpby1ncm91cCBmb3JtQ29udHJvbE5hbWU9XCJhY2Nlc3NCeVwiPlxyXG4gICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uIHZhbHVlPVwiMVwiIChjbGljayk9XCJzaG93RG9ycGRvd25zKCcxJylcIiBmaWVsZEtleT1cIlNFVFRJTkdTX1BBR19BQ0NfQUNDRVNTX1VTRVJOQU1FXCJcclxuICAgICAgICAgID5Vc2VyIE5hbWU8L21hdC1yYWRpby1idXR0b25cclxuICAgICAgICA+XHJcbiAgICAgICAgPG1hdC1yYWRpby1idXR0b24gdmFsdWU9XCIyXCIgKGNsaWNrKT1cInNob3dEb3JwZG93bnMoJzInKVwiIGZpZWxkS2V5PVwiU0VUVElOR1NfUEFHX0FDQ19BQ0NFU1NfUk9MRVwiXHJcbiAgICAgICAgICA+Um9sZTwvbWF0LXJhZGlvLWJ1dHRvblxyXG4gICAgICAgID5cclxuICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIjNcIiAoY2xpY2spPVwic2hvd0RvcnBkb3ducygnMycpXCIgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19QT0xJQ1lfR1JPVVBcIlxyXG4gICAgICAgICAgPlBvbGljeSBHcm91cDwvbWF0LXJhZGlvLWJ1dHRvblxyXG4gICAgICAgID5cclxuICAgICAgPC9tYXQtcmFkaW8tZ3JvdXA+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgY29sLTEyIG10LTNcIiAqbmdJZj1cInVzZXJEcm9wRG93blwiPlxyXG4gICAgICA8cCBjbGFzcz1cInJhZGlvLXRpdGxlXCI+U2VsZWN0IFVzZXI8L3A+XHJcbiAgICAgIDxwLWRyb3Bkb3duXHJcbiAgICAgICAgaW5wdXRJZD1cInJvbGVcIlxyXG4gICAgICAgIFtvcHRpb25zXT1cInVzZXJMaXN0XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBVc2VyXCJcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJ1c2VySWRcIlxyXG4gICAgICAgIHN0eWxlQ2xhc3M9XCJ3LTEwMFwiXHJcbiAgICAgICAgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19VU0VSTkFNRV9VU0VSXCJcclxuICAgICAgICBvcHRpb25MYWJlbD1cImRpc3BsYXluYW1lXCJcclxuICAgICAgICBvcHRpb25WYWx1ZT1cImlkXCJcclxuICAgICAgICBbZmlsdGVyXT1cInRydWVcIlxyXG4gICAgICAgIGFyaWFGaWx0ZXJMYWJlbD1cIm51bGxcIlxyXG4gICAgICAgIChvbkNoYW5nZSk9XCJnZXRPcmdQYWdlcygndXNlcicpXCI+XHJcbiAgICAgIDwvcC1kcm9wZG93bj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIGNvbC0xMiBtdC0zXCIgKm5nSWY9XCJyb2xlRHJvcERvd25cIj5cclxuICAgICAgPHAgY2xhc3M9XCJyYWRpby10aXRsZVwiPlNlbGVjdCBSb2xlPC9wPlxyXG4gICAgICA8cC1kcm9wZG93blxyXG4gICAgICAgIGlucHV0SWQ9XCJyb2xlXCJcclxuICAgICAgICBbb3B0aW9uc109XCJyb2xlQWRkZWREYXRhXCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlbGVjdCBSb2xlXCJcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJyb2xlSWRcIlxyXG4gICAgICAgIGZpZWxkS2V5PVwiU0VUVElOR1NfUEFHX0FDQ19BQ0NFU1NfUk9MRV9ST0xFXCJcclxuICAgICAgICBzdHlsZUNsYXNzPVwidy0xMDBcIlxyXG4gICAgICAgIG9wdGlvbkxhYmVsPVwibmFtZVwiXHJcbiAgICAgICAgb3B0aW9uVmFsdWU9XCJpZFwiXHJcbiAgICAgICAgW2ZpbHRlcl09XCJ0cnVlXCJcclxuICAgICAgICBhcmlhRmlsdGVyTGFiZWw9XCJudWxsXCJcclxuICAgICAgICAob25DaGFuZ2UpPVwiZ2V0T3JnUGFnZXMoJ3JvbGUnKVwiPlxyXG4gICAgICA8L3AtZHJvcGRvd24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBjb2wtMTIgbXQtM1wiICpuZ0lmPVwicG9saWN5RHJvcERvd25cIj5cclxuICAgICAgPHAgY2xhc3M9XCJyYWRpby10aXRsZVwiPlNlbGVjdCBQb2xpY3kgR3JvdXA8L3A+XHJcbiAgICAgIDxwLWRyb3Bkb3duXHJcbiAgICAgICAgaW5wdXRJZD1cInJvbGVcIlxyXG4gICAgICAgIFtvcHRpb25zXT1cInBvbGljeUdyb3VwRGF0YVwiXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgUG9saWN5IEdyb3VwXCJcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJwb2xpY3lJZFwiXHJcbiAgICAgICAgc3R5bGVDbGFzcz1cInctMTAwXCJcclxuICAgICAgICBmaWVsZEtleT1cIlNFVFRJTkdTX1BBR19BQ0NfQUNDRVNTX1BPTElDWV9HUk9VUF9QT0xJQ1lcIlxyXG4gICAgICAgIG9wdGlvbkxhYmVsPVwicG9saWN5Z3JvdXBuYW1lXCJcclxuICAgICAgICBvcHRpb25WYWx1ZT1cImlkXCJcclxuICAgICAgICBbZmlsdGVyXT1cInRydWVcIlxyXG4gICAgICAgIGFyaWFGaWx0ZXJMYWJlbD1cIm51bGxcIlxyXG4gICAgICAgIChvbkNoYW5nZSk9XCJnZXRPcmdQYWdlcygncG9saWN5JylcIj5cclxuICAgICAgPC9wLWRyb3Bkb3duPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZm9ybT5cclxuPGJyIC8+XHJcbiJdfQ==