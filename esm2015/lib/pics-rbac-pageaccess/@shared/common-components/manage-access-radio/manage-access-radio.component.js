import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RBACINFO } from '../../../@core/urls/rbac-url.config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../../@core/urls/access-management-common.service";
import * as i3 from "../../../@core/service/data-store.service";
import * as i4 from "@angular/material/radio";
import * as i5 from "primeng/dropdown";
import * as i6 from "../../../@core/directives/permission.directive";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWFjY2Vzcy1yYWRpby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQHNoYXJlZC9jb21tb24tY29tcG9uZW50cy9tYW5hZ2UtYWNjZXNzLXJhZGlvL21hbmFnZS1hY2Nlc3MtcmFkaW8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL3JiYWMtcGFnZWFjY2Vzcy9zcmMvbGliL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0BzaGFyZWQvY29tbW9uLWNvbXBvbmVudHMvbWFuYWdlLWFjY2Vzcy1yYWRpby9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFlLFdBQVcsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBS3JFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7Ozs7Ozs7O0FBTS9ELE1BQU0sT0FBTywwQkFBMEI7SUFzQnJDLFlBQ1UsV0FBd0IsRUFDekIsS0FBd0IsRUFDeEIsdUJBQXNELEVBQ3JELGFBQStCO1FBSC9CLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBK0I7UUFDckQsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBeEJ6QyxhQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3JCLG9CQUFlLEdBQVUsRUFBRSxDQUFDO1FBQzVCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLGlCQUFZ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O2tCQUx0QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFdBQVcsRUFBRSxzQ0FBc0M7b0JBQ25ELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO2lCQUNwRDs2TUFTVyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBQ0csWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLHNCQUFzQjtzQkFBL0IsTUFBTTtnQkFDRSxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdDaGVja2VkLFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vQGNvcmUvc2VydmljZS9hdXRoLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBY2Nlc3NNYW5hZ2VtZW50Q29tbW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL0Bjb3JlL3VybHMvYWNjZXNzLW1hbmFnZW1lbnQtY29tbW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGF0YVN0b3JlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL0Bjb3JlL3NlcnZpY2UvZGF0YS1zdG9yZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUkJBQ0lORk8gfSBmcm9tICcuLi8uLi8uLi9AY29yZS91cmxzL3JiYWMtdXJsLmNvbmZpZyc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwLW1hbmFnZS1hY2Nlc3MtcmFkaW8nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tYW5hZ2UtYWNjZXNzLXJhZGlvLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hbmFnZUFjY2Vzc1JhZGlvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkRlc3Ryb3kge1xyXG4gIHJiYWNGb3JtOiBGb3JtR3JvdXA7XHJcbiAgdXNlckxpc3Q6IGFueVtdID0gW107XHJcbiAgcG9saWN5R3JvdXBEYXRhOiBhbnlbXSA9IFtdO1xyXG4gIHJvbGVBZGRlZERhdGE6IGFueVtdID0gW107XHJcbiAgdXNlckRyb3BEb3duID0gZmFsc2U7XHJcbiAgcm9sZURyb3BEb3duID0gZmFsc2U7XHJcbiAgcG9saWN5RHJvcERvd24gPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgYWNjZXNzQnkgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcG9saWN5RHJvcGRvd24gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICBAT3V0cHV0KCkgcm9sZURyb3Bkb3duID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHVzZXJEcm9wZG93biA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gIEBPdXRwdXQoKSBkcm9wRG93blNlbGVjdGVkVmFsdWVzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQElucHV0KCkgcmVsb2FkRm9ybTogYm9vbGVhbjtcclxuICB1c2VyRHJvcGRvd25TZXR0aW5ncyA9IHt9O1xyXG4gIHJvbGVEcm9wZG93blNldHRpbmdzID0ge307XHJcbiAgcG9saWN5RHJvcGRvd25TZXR0aW5ncyA9IHt9O1xyXG4gIG9yZ1N1YnM6IFN1YnNjcmlwdGlvbjtcclxuICBvcmdJZDogYW55O1xyXG4gIGVudmlyb25tZW50OiBhbnk7XHJcbiAgUkJBQ09SRzogUkJBQ0lORk8gPSBuZXcgUkJBQ0lORk8oKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcixcclxuICAgIHB1YmxpYyBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwdWJsaWMgYWNjZXNzTWFuYWdlbWVudFNlcnZpY2U6IEFjY2Vzc01hbmFnZW1lbnRDb21tb25TZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfc3RvcmVzZXJ2aWNlOiBEYXRhU3RvcmVTZXJ2aWNlLFxyXG4gICAgLy8gcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2VcclxuICApIHtcclxuICAgIC8vIHRoaXMub3JnU3VicyA9IHRoaXMuYXV0aFNlcnZpY2Uub3JnSW5mby5zdWJzY3JpYmUobyA9PiB7XHJcbiAgICAvLyAgIHRoaXMub3JnSWQgPSBvO1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyh0aGlzLm9yZ0lkLCAnbWFuYWdlYWNjZXNzcmFkaW8gY29tcCcpO1xyXG4gICAgLy8gICBpZiAodGhpcy5vcmdJZCkge1xyXG4gICAgLy8gICAgIHRoaXMubG9hZERyb3Bkb3ducygpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9KTtcclxuICAgIHRoaXMub3JnU3VicyA9ICB0aGlzLl9zdG9yZXNlcnZpY2UuY3VycmVudFN0b3JlLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcclxuICAgICAgaWYgKHJlc1snUkJBQ09SRyddICYmIHJlc1snUkJBQ09SRyddICE9PSAnJykge1xyXG4gICAgICAgIHRoaXMuUkJBQ09SRyA9IHJlc1snUkJBQ09SRyddO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUkJBQ09SRywgJ1JCQUNPUkcgRXZlbnQgU2NoZWR1bGVyJyk7XHJcbiAgICAgICAgdGhpcy5lbnZpcm9ubWVudCA9IHRoaXMuUkJBQ09SR1snZW52aXJvbm1lbnQnXTtcclxuICAgICAgICB0aGlzLm9yZ0lkID0gcGFyc2VJbnQodGhpcy5SQkFDT1JHWydvcmdJRCddKTtcclxuICAgICAgICBpZih0aGlzLmVudmlyb25tZW50KXtcclxuICAgICAgICAgIHRoaXMubG9hZERyb3Bkb3ducygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMubG9hZEZvcm0oKTtcclxuICAgIHRoaXMudXNlckRyb3Bkb3duU2V0dGluZ3MgPSB7XHJcbiAgICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRleHQ6ICdTZWxlY3QgVXNlcicsXHJcbiAgICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgQWxsJyxcclxuICAgICAgdW5TZWxlY3RBbGxUZXh0OiAnVW5TZWxlY3QgQWxsJyxcclxuICAgICAgZW5hYmxlU2VhcmNoRmlsdGVyOiB0cnVlLFxyXG4gICAgICBsYWJlbEtleTogJ2Rpc3BsYXluYW1lJyxcclxuICAgICAgc2VhcmNoQnk6IFsnZGlzcGxheW5hbWUnXVxyXG4gICAgfTtcclxuICAgIHRoaXMucm9sZURyb3Bkb3duU2V0dGluZ3MgPSB7XHJcbiAgICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRleHQ6ICdTZWxlY3QgUGVyc29uYScsXHJcbiAgICAgIHNlbGVjdEFsbFRleHQ6ICdTZWxlY3QgQWxsJyxcclxuICAgICAgdW5TZWxlY3RBbGxUZXh0OiAnVW5TZWxlY3QgQWxsJyxcclxuICAgICAgZW5hYmxlU2VhcmNoRmlsdGVyOiB0cnVlLFxyXG4gICAgICBsYWJlbEtleTogJ25hbWUnLFxyXG4gICAgICBzZWFyY2hCeTogWyduYW1lJ11cclxuICAgIH07XHJcbiAgICB0aGlzLnBvbGljeURyb3Bkb3duU2V0dGluZ3MgPSB7XHJcbiAgICAgIHNpbmdsZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRleHQ6ICdTZWxlY3QgUG9saWN5JyxcclxuICAgICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxyXG4gICAgICB1blNlbGVjdEFsbFRleHQ6ICdVblNlbGVjdCBBbGwnLFxyXG4gICAgICBlbmFibGVTZWFyY2hGaWx0ZXI6IHRydWUsXHJcbiAgICAgIGxhYmVsS2V5OiAncG9saWN5Z3JvdXBuYW1lJyxcclxuICAgICAgc2VhcmNoQnk6IFsncG9saWN5Z3JvdXBuYW1lJ11cclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5vcmdTdWJzLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gIH1cclxuICBsb2FkRHJvcGRvd25zKCkge1xyXG4gICAgdGhpcy5sb2FkVXNlcm5hbWUoKTtcclxuICAgIHRoaXMuZ2V0UGVyc29uYSgpO1xyXG4gICAgdGhpcy5nZXRQb2xpY3lHcm91cCgpO1xyXG4gIH1cclxuXHJcbiAgbG9hZEZvcm0oKSB7XHJcbiAgICB0aGlzLnJiYWNGb3JtID0gdGhpcy5mb3JtQnVpbGRlci5ncm91cCh7XHJcbiAgICAgIGlkOiBuZXcgRm9ybUNvbnRyb2wobnVsbCksXHJcbiAgICAgIGFjY2Vzc0J5OiBuZXcgRm9ybUNvbnRyb2wobnVsbCksXHJcbiAgICAgIHVzZXJJZDogbmV3IEZvcm1Db250cm9sKCcnKSxcclxuICAgICAgcG9saWN5SWQ6IG5ldyBGb3JtQ29udHJvbChudWxsKSxcclxuICAgICAgcm9sZUlkOiBuZXcgRm9ybUNvbnRyb2wobnVsbClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbG9hZFVzZXJuYW1lKCkge1xyXG4gICAgdGhpcy5hY2Nlc3NNYW5hZ2VtZW50U2VydmljZS5nZXRVc2VyTGlzdCh0aGlzLm9yZ0lkKS5zdWJzY3JpYmUocmVzID0+IHtcclxuICAgICAgdGhpcy51c2VyTGlzdCA9IHJlc1snZGF0YSddICYmIHJlc1snZGF0YSddLmxlbmd0aCA/IHJlc1snZGF0YSddIDogW107XHJcbiAgICAgIHRoaXMudXNlckxpc3QuZm9yRWFjaChhID0+IChhLmRpc3BsYXluYW1lID0gYCR7YS5maXJzdG5hbWV9ICR7YS5sYXN0bmFtZX1gKSk7XHJcbiAgICAgIHRoaXMudXNlckRyb3Bkb3duLmVtaXQodGhpcy51c2VyTGlzdCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldFBvbGljeUdyb3VwKCkge1xyXG4gICAgdGhpcy5hY2Nlc3NNYW5hZ2VtZW50U2VydmljZS5nZXRQb2xpY3lHcm91cExpc3QodGhpcy5vcmdJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIHRoaXMucG9saWN5R3JvdXBEYXRhID0gcmVzWydkYXRhJ10gJiYgcmVzWydkYXRhJ10ubGVuZ3RoID8gcmVzWydkYXRhJ10gOiBbXTtcclxuICAgICAgdGhpcy5wb2xpY3lEcm9wZG93bi5lbWl0KHRoaXMucG9saWN5R3JvdXBEYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGVyc29uYSgpIHtcclxuICAgIHRoaXMuYWNjZXNzTWFuYWdlbWVudFNlcnZpY2UuZ2V0Um9sZUxpc3QodGhpcy5vcmdJZCkuc3Vic2NyaWJlKHJlcyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMub3JnSWQpO1xyXG4gICAgICB0aGlzLnJvbGVBZGRlZERhdGEgPSByZXNbJ2RhdGEnXSAmJiByZXNbJ2RhdGEnXS5sZW5ndGggPyByZXNbJ2RhdGEnXSA6IFtdO1xyXG4gICAgICB0aGlzLnJvbGVEcm9wZG93bi5lbWl0KHRoaXMucm9sZUFkZGVkRGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNob3dEb3JwZG93bnMoaWQpIHtcclxuICAgIGlmIChpZCA9PT0gJzEnKSB7XHJcbiAgICAgIHRoaXMudXNlckRyb3BEb3duID0gdHJ1ZTtcclxuICAgICAgdGhpcy5yb2xlRHJvcERvd24gPSB0aGlzLnBvbGljeURyb3BEb3duID0gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGlkID09PSAnMicpIHtcclxuICAgICAgdGhpcy51c2VyRHJvcERvd24gPSBmYWxzZTtcclxuICAgICAgdGhpcy5yb2xlRHJvcERvd24gPSB0cnVlO1xyXG4gICAgICB0aGlzLnBvbGljeURyb3BEb3duID0gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKGlkID09PSAnMycpIHtcclxuICAgICAgdGhpcy51c2VyRHJvcERvd24gPSB0aGlzLnJvbGVEcm9wRG93biA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnBvbGljeURyb3BEb3duID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuYWNjZXNzQnkuZW1pdChpZCk7XHJcbiAgICB0aGlzLnJlc2V0Rm9ybShpZCk7XHJcbiAgfVxyXG5cclxuICAvLyBlZGl0IGZ1bmN0aW9uYWxpdGVzIGJhc2VkIG9uIHBvbGljeSBncm91cFxyXG4gIGdldERhdGFCYXNlZE9uUG9saWN5KCkge1xyXG4gICAgY29uc3QgcG9saWN5aWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3BvbGljeUlkJykudmFsdWU7XHJcbiAgICBjb25zdCByb2xlSWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3JvbGVJZCcpLnZhbHVlO1xyXG4gICAgY29uc3QgdXNlcklkcyA9IHRoaXMucmJhY0Zvcm0uZ2V0KCd1c2VySWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB7XHJcbiAgICAgIHVzZXJpZDogdXNlcklkcyA/IHVzZXJJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgcm9sZWlkOiByb2xlSWRzID8gcm9sZUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICBwb2xpY3lpZDogcG9saWN5aWRzID8gcG9saWN5aWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgIGZyb206ICdwb2xpY3knXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlSWQnKS52YWx1ZSAhPT0gbnVsbCB8fCB0aGlzLnJiYWNGb3JtLmdldCgndXNlcklkJykudmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChwb2xpY3lpZHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuZHJvcERvd25TZWxlY3RlZFZhbHVlcy5lbWl0KHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZXNldEZvcm0oJzMnKTtcclxuICAgICAgdGhpcy5yYmFjRm9ybS5nZXQoJ2FjY2Vzc0J5Jykuc2V0VmFsdWUoJzMnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldERhdGFCYXNlZE9uUm9sZSgpIHtcclxuICAgIGNvbnN0IHJvbGVJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncm9sZUlkJykudmFsdWU7XHJcbiAgICBjb25zdCB1c2VySWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3VzZXJJZCcpLnZhbHVlO1xyXG4gICAgY29uc3QgcG9saWN5SWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3BvbGljeUlkJykudmFsdWU7XHJcbiAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0ge1xyXG4gICAgICB1c2VyaWQ6IHVzZXJJZHMgPyB1c2VySWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgIHJvbGVpZDogcm9sZUlkcyA/IHJvbGVJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgcG9saWN5aWQ6IHBvbGljeUlkcyA/IHBvbGljeUlkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICBmcm9tOiAncm9sZSdcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5yYmFjRm9ybS5nZXQoJ3VzZXJJZCcpLnZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuZHJvcERvd25TZWxlY3RlZFZhbHVlcy5lbWl0KHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAocm9sZUlkcy5sZW5ndGgpIHtcclxuICAgICAgbGV0IGV4aXN0UG9saWN5SWRzID0gW107XHJcbiAgICAgIC8vIGxvb3AgdGhlIHJvbGUgaWRzXHJcbiAgICAgIGZvciAoY29uc3Qgcm9sZUlkIG9mIHJvbGVJZHMpIHtcclxuICAgICAgICBjb25zdCByb2xlRGF0YSA9IHRoaXMucm9sZUFkZGVkRGF0YS5maWx0ZXIoa2V5ID0+IGtleS5pZCA9PT0gcm9sZUlkLmlkKTtcclxuICAgICAgICBjb25zdCBnZXRQb2xpY3lJZHMgPSByb2xlRGF0YVswXVsncm9sZVBvbGljeUdyb3VwQ29uZmlncyddLm1hcChwSWQgPT4gcElkLnBvbGljeWdyb3VwaWQpO1xyXG4gICAgICAgIGV4aXN0UG9saWN5SWRzLnB1c2goZ2V0UG9saWN5SWRzKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBteU5ld0FycmF5ID0gW10uY29uY2F0KC4uLmV4aXN0UG9saWN5SWRzKTtcclxuICAgICAgY29uc3QgdW5pcXVlUG9saWN5ID0gWy4uLm5ldyBTZXQobXlOZXdBcnJheSldO1xyXG4gICAgICBleGlzdFBvbGljeUlkcyA9IHVuaXF1ZVBvbGljeTtcclxuICAgICAgLy8gc2V0IHBvbGljeSBncm91cCB2YWx1ZXNcclxuICAgICAgY29uc3QgcExpc3QgPSB0aGlzLnBvbGljeUdyb3VwRGF0YS5maWx0ZXIoa2V5ID0+IGV4aXN0UG9saWN5SWRzLmluY2x1ZGVzKGtleS5pZCkpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgncG9saWN5SWQnKS5zZXRWYWx1ZShwTGlzdCk7XHJcbiAgICAgIGNvbnN0IHBvbGljeUlkVmFsdWVzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3BvbGljeUlkJykudmFsdWU7XHJcbiAgICAgIHNlbGVjdGVkVmFsdWUucm9sZWlkID0gcm9sZUlkcyA/IHJvbGVJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbDtcclxuICAgICAgc2VsZWN0ZWRWYWx1ZS5wb2xpY3lpZCA9IHBvbGljeUlkVmFsdWVzID8gcG9saWN5SWRWYWx1ZXMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbDtcclxuICAgICAgdGhpcy5kcm9wRG93blNlbGVjdGVkVmFsdWVzLmVtaXQoc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlc2V0Rm9ybSgnMicpO1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgnYWNjZXNzQnknKS5zZXRWYWx1ZSgnMicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Um9sZUFuZFBvbGljeURhdGEoKSB7XHJcbiAgICBjb25zdCB1c2VySWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3VzZXJJZCcpLnZhbHVlO1xyXG4gICAgaWYgKHVzZXJJZHMubGVuZ3RoKSB7XHJcbiAgICAgIGxldCBleGlzdFBvbGljeUlkcyA9IFtdO1xyXG4gICAgICBsZXQgZXhpc3RSb2xlSWRzID0gW107XHJcbiAgICAgIC8vIGxvb3AgdGhlIHJvbGUgaWRzXHJcbiAgICAgIGZvciAoY29uc3QgdXNlcklkIG9mIHVzZXJJZHMpIHtcclxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IHRoaXMudXNlckxpc3QuZmlsdGVyKGtleSA9PiBrZXkuaWQgPT09IHVzZXJJZC5pZCk7XHJcbiAgICAgICAgY29uc3QgZ2V0UG9saWN5SWRzID0gdXNlckRhdGFbMF1bJ3BvbGljeUdyb3VwQ29uZmlncyddLm1hcChwSWQgPT4gcElkLnBvbGljeWdyb3VwaWQpO1xyXG4gICAgICAgIGV4aXN0UG9saWN5SWRzLnB1c2goZ2V0UG9saWN5SWRzKTtcclxuICAgICAgICBjb25zdCBnZXRSb2xlSWRzID0gdXNlckRhdGFbMF1bJ3JvbGVDb25maWdzJ10ubWFwKHBJZCA9PiBwSWQucm9sZWlkKTtcclxuICAgICAgICBleGlzdFJvbGVJZHMucHVzaChnZXRSb2xlSWRzKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBteU5ld1BvbGljeUFyeSA9IFtdLmNvbmNhdCguLi5leGlzdFBvbGljeUlkcyk7XHJcbiAgICAgIGNvbnN0IHVuaXF1ZVBvbGljeSA9IFsuLi5uZXcgU2V0KG15TmV3UG9saWN5QXJ5KV07XHJcbiAgICAgIGV4aXN0UG9saWN5SWRzID0gdW5pcXVlUG9saWN5O1xyXG4gICAgICAvLyBzZXQgcG9saWN5IGdyb3VwIHZhbHVlc1xyXG4gICAgICBjb25zdCBwTGlzdCA9IHRoaXMucG9saWN5R3JvdXBEYXRhLmZpbHRlcihrZXkgPT4gZXhpc3RQb2xpY3lJZHMuaW5jbHVkZXMoa2V5LmlkKSk7XHJcbiAgICAgIHRoaXMucmJhY0Zvcm0uZ2V0KCdwb2xpY3lJZCcpLnNldFZhbHVlKHBMaXN0KTtcclxuXHJcbiAgICAgIGNvbnN0IG15TmV3Um9sZUFyeSA9IFtdLmNvbmNhdCguLi5leGlzdFJvbGVJZHMpO1xyXG4gICAgICBjb25zdCB1bmlxdWVSb2xlID0gWy4uLm5ldyBTZXQobXlOZXdSb2xlQXJ5KV07XHJcbiAgICAgIGV4aXN0Um9sZUlkcyA9IHVuaXF1ZVJvbGU7XHJcbiAgICAgIC8vIHNldCByb2xlIHZhbHVlc1xyXG4gICAgICBjb25zdCByTGlzdCA9IHRoaXMucm9sZUFkZGVkRGF0YS5maWx0ZXIoa2V5ID0+IGV4aXN0Um9sZUlkcy5pbmNsdWRlcyhrZXkuaWQpKTtcclxuICAgICAgdGhpcy5yYmFjRm9ybS5nZXQoJ3JvbGVJZCcpLnNldFZhbHVlKHJMaXN0KTtcclxuICAgICAgY29uc3Qgcm9sZUlkcyA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlSWQnKS52YWx1ZTtcclxuICAgICAgY29uc3QgcG9saWN5SWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3BvbGljeUlkJykudmFsdWU7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSB7XHJcbiAgICAgICAgdXNlcmlkOiB1c2VySWRzID8gdXNlcklkcy5tYXAoa2V5ID0+IGtleS5pZCkgOiBudWxsLFxyXG4gICAgICAgIHJvbGVpZDogcm9sZUlkcyA/IHJvbGVJZHMubWFwKGtleSA9PiBrZXkuaWQpIDogbnVsbCxcclxuICAgICAgICBwb2xpY3lpZDogcG9saWN5SWRzID8gcG9saWN5SWRzLm1hcChrZXkgPT4ga2V5LmlkKSA6IG51bGwsXHJcbiAgICAgICAgZnJvbTogJ3VzZXInXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuZHJvcERvd25TZWxlY3RlZFZhbHVlcy5lbWl0KHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZXNldEZvcm0oJzEnKTtcclxuICAgICAgdGhpcy5yYmFjRm9ybS5nZXQoJ2FjY2Vzc0J5Jykuc2V0VmFsdWUoJzEnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlc2V0Rm9ybShpZCA9IG51bGwpIHtcclxuICAgIHRoaXMucmJhY0Zvcm0ucmVzZXQoKTtcclxuICAgIGlmIChpZCAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJiYWNGb3JtLmdldCgnYWNjZXNzQnknKS5zZXRWYWx1ZShpZCk7XHJcbiAgICAgIHRoaXMuYWNjZXNzQnkuZW1pdChpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE9yZ1BhZ2VzKHR5cGUpIHtcclxuICAgIGNvbnN0IHJvbGVJZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncm9sZUlkJykudmFsdWU7XHJcbiAgICBjb25zdCB1c2VySWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3VzZXJJZCcpLnZhbHVlO1xyXG4gICAgY29uc3QgcG9saWN5SWRzID0gdGhpcy5yYmFjRm9ybS5nZXQoJ3BvbGljeUlkJykudmFsdWU7XHJcbiAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0ge1xyXG4gICAgICB1c2VyaWQ6IHVzZXJJZHMsXHJcbiAgICAgIHJvbGVpZDogcm9sZUlkcyxcclxuICAgICAgcG9saWN5aWQ6IHBvbGljeUlkcyxcclxuICAgICAgZnJvbTogdHlwZVxyXG4gICAgfTtcclxuICAgIHRoaXMuZHJvcERvd25TZWxlY3RlZFZhbHVlcy5lbWl0KHNlbGVjdGVkVmFsdWUpO1xyXG4gIH1cclxufVxyXG4iLCI8Zm9ybSBbZm9ybUdyb3VwXT1cInJiYWNGb3JtXCIgY2xhc3M9XCJtYW5hZ2UtYWNjZXNzLXJhZGlvXCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic3RyaXBfaGVhZCB0b2dnbGVsZWZ0XCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJyZXBvcnRfaGVhZCBmb250LXdlaWdodC1ib2xkXCI+TWFuYWdlIEFjY2VzcyBCeTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgZm9ybUNvbnRyb2xOYW1lPVwiYWNjZXNzQnlcIj5cclxuICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiB2YWx1ZT1cIjFcIiAoY2xpY2spPVwic2hvd0RvcnBkb3ducygnMScpXCIgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19VU0VSTkFNRVwiXHJcbiAgICAgICAgICA+VXNlciBOYW1lPC9tYXQtcmFkaW8tYnV0dG9uXHJcbiAgICAgICAgPlxyXG4gICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uIHZhbHVlPVwiMlwiIChjbGljayk9XCJzaG93RG9ycGRvd25zKCcyJylcIiBmaWVsZEtleT1cIlNFVFRJTkdTX1BBR19BQ0NfQUNDRVNTX1JPTEVcIlxyXG4gICAgICAgICAgPlJvbGU8L21hdC1yYWRpby1idXR0b25cclxuICAgICAgICA+XHJcbiAgICAgICAgPG1hdC1yYWRpby1idXR0b24gdmFsdWU9XCIzXCIgKGNsaWNrKT1cInNob3dEb3JwZG93bnMoJzMnKVwiIGZpZWxkS2V5PVwiU0VUVElOR1NfUEFHX0FDQ19BQ0NFU1NfUE9MSUNZX0dST1VQXCJcclxuICAgICAgICAgID5Qb2xpY3kgR3JvdXA8L21hdC1yYWRpby1idXR0b25cclxuICAgICAgICA+XHJcbiAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZC0zIGNvbC0xMiBtdC0zXCIgKm5nSWY9XCJ1c2VyRHJvcERvd25cIj5cclxuICAgICAgPHAgY2xhc3M9XCJyYWRpby10aXRsZVwiPlNlbGVjdCBVc2VyPC9wPlxyXG4gICAgICA8cC1kcm9wZG93blxyXG4gICAgICAgIGlucHV0SWQ9XCJyb2xlXCJcclxuICAgICAgICBbb3B0aW9uc109XCJ1c2VyTGlzdFwiXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgVXNlclwiXHJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwidXNlcklkXCJcclxuICAgICAgICBzdHlsZUNsYXNzPVwidy0xMDBcIlxyXG4gICAgICAgIGZpZWxkS2V5PVwiU0VUVElOR1NfUEFHX0FDQ19BQ0NFU1NfVVNFUk5BTUVfVVNFUlwiXHJcbiAgICAgICAgb3B0aW9uTGFiZWw9XCJkaXNwbGF5bmFtZVwiXHJcbiAgICAgICAgb3B0aW9uVmFsdWU9XCJpZFwiXHJcbiAgICAgICAgW2ZpbHRlcl09XCJ0cnVlXCJcclxuICAgICAgICBhcmlhRmlsdGVyTGFiZWw9XCJudWxsXCJcclxuICAgICAgICAob25DaGFuZ2UpPVwiZ2V0T3JnUGFnZXMoJ3VzZXInKVwiPlxyXG4gICAgICA8L3AtZHJvcGRvd24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMyBjb2wtMTIgbXQtM1wiICpuZ0lmPVwicm9sZURyb3BEb3duXCI+XHJcbiAgICAgIDxwIGNsYXNzPVwicmFkaW8tdGl0bGVcIj5TZWxlY3QgUm9sZTwvcD5cclxuICAgICAgPHAtZHJvcGRvd25cclxuICAgICAgICBpbnB1dElkPVwicm9sZVwiXHJcbiAgICAgICAgW29wdGlvbnNdPVwicm9sZUFkZGVkRGF0YVwiXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWxlY3QgUm9sZVwiXHJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwicm9sZUlkXCJcclxuICAgICAgICBmaWVsZEtleT1cIlNFVFRJTkdTX1BBR19BQ0NfQUNDRVNTX1JPTEVfUk9MRVwiXHJcbiAgICAgICAgc3R5bGVDbGFzcz1cInctMTAwXCJcclxuICAgICAgICBvcHRpb25MYWJlbD1cIm5hbWVcIlxyXG4gICAgICAgIG9wdGlvblZhbHVlPVwiaWRcIlxyXG4gICAgICAgIFtmaWx0ZXJdPVwidHJ1ZVwiXHJcbiAgICAgICAgYXJpYUZpbHRlckxhYmVsPVwibnVsbFwiXHJcbiAgICAgICAgKG9uQ2hhbmdlKT1cImdldE9yZ1BhZ2VzKCdyb2xlJylcIj5cclxuICAgICAgPC9wLWRyb3Bkb3duPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTMgY29sLTEyIG10LTNcIiAqbmdJZj1cInBvbGljeURyb3BEb3duXCI+XHJcbiAgICAgIDxwIGNsYXNzPVwicmFkaW8tdGl0bGVcIj5TZWxlY3QgUG9saWN5IEdyb3VwPC9wPlxyXG4gICAgICA8cC1kcm9wZG93blxyXG4gICAgICAgIGlucHV0SWQ9XCJyb2xlXCJcclxuICAgICAgICBbb3B0aW9uc109XCJwb2xpY3lHcm91cERhdGFcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IFBvbGljeSBHcm91cFwiXHJcbiAgICAgICAgZm9ybUNvbnRyb2xOYW1lPVwicG9saWN5SWRcIlxyXG4gICAgICAgIHN0eWxlQ2xhc3M9XCJ3LTEwMFwiXHJcbiAgICAgICAgZmllbGRLZXk9XCJTRVRUSU5HU19QQUdfQUNDX0FDQ0VTU19QT0xJQ1lfR1JPVVBfUE9MSUNZXCJcclxuICAgICAgICBvcHRpb25MYWJlbD1cInBvbGljeWdyb3VwbmFtZVwiXHJcbiAgICAgICAgb3B0aW9uVmFsdWU9XCJpZFwiXHJcbiAgICAgICAgW2ZpbHRlcl09XCJ0cnVlXCJcclxuICAgICAgICBhcmlhRmlsdGVyTGFiZWw9XCJudWxsXCJcclxuICAgICAgICAob25DaGFuZ2UpPVwiZ2V0T3JnUGFnZXMoJ3BvbGljeScpXCI+XHJcbiAgICAgIDwvcC1kcm9wZG93bj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Zvcm0+XHJcbjxiciAvPlxyXG4iXX0=