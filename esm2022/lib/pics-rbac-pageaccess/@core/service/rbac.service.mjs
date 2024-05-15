import { Injectable } from '@angular/core';
import { AttachmentConfig, PermissionsURL, PolicyGroupConfig, RoleConfig, UserConfig } from '../urls/rbac-url.config';
import * as i0 from "@angular/core";
import * as i1 from "./http.service";
export class RbacService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    getAllUserList(key) {
        return this.httpService.get(`${UserConfig.EndPoint.User.getAllUserList}/${key}`);
    }
    getAllUserOrgList(orgid) {
        return this.httpService.get(UserConfig.EndPoint.User.getAllUserOrgList + orgid);
    }
    saveUser(data) {
        return this.httpService.post(UserConfig.EndPoint.User.createUser, data);
    }
    updateUser(data, userid) {
        return this.httpService.put(`${UserConfig.EndPoint.User.getAllUserList}/${userid}`, data);
    }
    deleteUser(id) {
        return this.httpService.delete(`${UserConfig.EndPoint.User.getAllUserList}/${id}`);
    }
    activateUser(data) {
        return this.httpService.post(UserConfig.EndPoint.User.activateUser, data);
    }
    addProviderUser(data) {
        return this.httpService.post(UserConfig.EndPoint.Provider.addProviderUser, data);
    }
    addUserRole(data) {
        return this.httpService.post(UserConfig.EndPoint.User.userRole, data);
    }
    uploadKey(objparams) {
        return this.httpService.post(AttachmentConfig.EndPoint.Attachments.UploadKey, objparams);
    }
    getOrgPolicyGroupList(orgid) {
        return this.httpService.get(PolicyGroupConfig.EndPoint.policyGroup.getOrgPolicyGroups.replace('{organizationid}', String(orgid)));
    }
    getAllPolicyGroupList(policyGroupId) {
        const endPoint = policyGroupId
            ? `${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${policyGroupId}`
            : PolicyGroupConfig.EndPoint.policyGroup.getAllPolicyGroupList;
        return this.httpService.get(endPoint);
    }
    getPolicyGroupById(id) {
        return this.httpService.get(PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList + '/' + id);
    }
    getPolicyGroupsByManagementGroup(policyGroupId) {
        return this.httpService.get(`/org/policyGroup/managementgroup/${policyGroupId}`);
    }
    createPolicyGroup(data) {
        return this.httpService.post(PolicyGroupConfig.EndPoint.policyGroup.createPolicyGroup, data);
    }
    updatePolicyGroup(id, item) {
        return this.httpService.put(`${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${id}`, item);
    }
    deletePolicyGroup(id) {
        return this.httpService.delete(`${PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList}/${id}`);
    }
    getAllUserRole(id) {
        return this.httpService.get(RoleConfig.EndPoint.role.getAllOrgRole.replace('{orgid}', String(id)));
    }
    deleteRole(id) {
        return this.httpService.delete(`${RoleConfig.EndPoint.role.getAllUserRole}/${id}`);
    }
    getRoleById(roleid) {
        return this.httpService.get(`${RoleConfig.EndPoint.role.getAllUserRole}/${roleid}`);
    }
    createRole(data) {
        return this.httpService.post(RoleConfig.EndPoint.role.createRole, data);
    }
    updateRole(roleId, data) {
        return this.httpService.put(`${RoleConfig.EndPoint.role.getAllUserRole}/${roleId}`, data);
    }
    getLandingPage(id) {
        return this.httpService.get(`${RoleConfig.EndPoint.role.getLandingPage}/${id}`);
    }
    createPolicyGroupForRole(roleId, data) {
        return this.httpService.post(`${RoleConfig.EndPoint.role.addPolicyGroup}/${roleId}/policygroups`, data);
    }
    updatePolicyGroupForRole(roleId, data) {
        return this.httpService.put(`${RoleConfig.EndPoint.role.addPolicyGroup}/${roleId}/policygroups`, data);
    }
    getReportDashbaord() {
        return this.httpService.get(`${RoleConfig.EndPoint.role.dossier}`);
    }
    getPermissionRoleById(id) {
        return this.httpService.get(PermissionsURL.EndPoints.permission.permissionRoleById.replace('{id}', id));
    }
    getManagementGroupTree(_organizationid) {
        return this.httpService.get('/org/management-group/organization/tree');
    }
    getPermissionsTree(applicationid) {
        return this.httpService.get(PermissionsURL.EndPoints.permission.applicationPermissionsTree.replace('{applicationid}', applicationid));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RbacService, deps: [{ token: i1.HttpService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RbacService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: RbacService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL3JiYWMtcGFnZWFjY2Vzcy9zcmMvbGliL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3NlcnZpY2UvcmJhYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7OztBQUt0SCxNQUFNLE9BQU8sV0FBVztJQUNGO0lBQXBCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUVoRCxjQUFjLENBQUMsR0FBWTtRQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUNELGlCQUFpQixDQUFDLEtBQVU7UUFDMUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0QsUUFBUSxDQUFDLElBQVM7UUFDaEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFTLEVBQUUsTUFBYztRQUNsQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFD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b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9odHRwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBdHRhY2htZW50Q29uZmlnLCBQZXJtaXNzaW9uc1VSTCwgUG9saWN5R3JvdXBDb25maWcsIFJvbGVDb25maWcsIFVzZXJDb25maWcgfSBmcm9tICcuLi91cmxzL3JiYWMtdXJsLmNvbmZpZyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYmFjU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UpIHt9XHJcblxyXG4gIGdldEFsbFVzZXJMaXN0KGtleT86IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoYCR7VXNlckNvbmZpZy5FbmRQb2ludC5Vc2VyLmdldEFsbFVzZXJMaXN0fS8ke2tleX1gKTtcclxuICB9XHJcbiAgZ2V0QWxsVXNlck9yZ0xpc3Qob3JnaWQ6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KFVzZXJDb25maWcuRW5kUG9pbnQuVXNlci5nZXRBbGxVc2VyT3JnTGlzdCArIG9yZ2lkKTtcclxuICB9XHJcbiAgc2F2ZVVzZXIoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KFVzZXJDb25maWcuRW5kUG9pbnQuVXNlci5jcmVhdGVVc2VyLCBkYXRhKTtcclxuICB9XHJcbiAgdXBkYXRlVXNlcihkYXRhOiBhbnksIHVzZXJpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wdXQoYCR7VXNlckNvbmZpZy5FbmRQb2ludC5Vc2VyLmdldEFsbFVzZXJMaXN0fS8ke3VzZXJpZH1gLCBkYXRhKTtcclxuICB9XHJcbiAgZGVsZXRlVXNlcihpZD86IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZGVsZXRlKGAke1VzZXJDb25maWcuRW5kUG9pbnQuVXNlci5nZXRBbGxVc2VyTGlzdH0vJHtpZH1gKTtcclxuICB9XHJcbiAgYWN0aXZhdGVVc2VyKGRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChVc2VyQ29uZmlnLkVuZFBvaW50LlVzZXIuYWN0aXZhdGVVc2VyLCBkYXRhKTtcclxuICB9XHJcbiAgYWRkUHJvdmlkZXJVc2VyKGRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChVc2VyQ29uZmlnLkVuZFBvaW50LlByb3ZpZGVyLmFkZFByb3ZpZGVyVXNlciwgZGF0YSk7XHJcbiAgfVxyXG4gIGFkZFVzZXJSb2xlKGRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChVc2VyQ29uZmlnLkVuZFBvaW50LlVzZXIudXNlclJvbGUsIGRhdGEpO1xyXG4gIH1cclxuICB1cGxvYWRLZXkob2JqcGFyYW1zOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QoQXR0YWNobWVudENvbmZpZy5FbmRQb2ludC5BdHRhY2htZW50cy5VcGxvYWRLZXksIG9ianBhcmFtcyk7XHJcbiAgfVxyXG4gIGdldE9yZ1BvbGljeUdyb3VwTGlzdChvcmdpZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoXHJcbiAgICAgIFBvbGljeUdyb3VwQ29uZmlnLkVuZFBvaW50LnBvbGljeUdyb3VwLmdldE9yZ1BvbGljeUdyb3Vwcy5yZXBsYWNlKCd7b3JnYW5pemF0aW9uaWR9JywgU3RyaW5nKG9yZ2lkKSlcclxuICAgICk7XHJcbiAgfVxyXG4gIGdldEFsbFBvbGljeUdyb3VwTGlzdChwb2xpY3lHcm91cElkPzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBlbmRQb2ludCA9IHBvbGljeUdyb3VwSWRcclxuICAgICAgPyBgJHtQb2xpY3lHcm91cENvbmZpZy5FbmRQb2ludC5wb2xpY3lHcm91cC5nZXRQb2xpY3lHcm91cExpc3R9LyR7cG9saWN5R3JvdXBJZH1gXHJcbiAgICAgIDogUG9saWN5R3JvdXBDb25maWcuRW5kUG9pbnQucG9saWN5R3JvdXAuZ2V0QWxsUG9saWN5R3JvdXBMaXN0O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KGVuZFBvaW50KTtcclxuICB9XHJcbiAgZ2V0UG9saWN5R3JvdXBCeUlkKGlkOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChQb2xpY3lHcm91cENvbmZpZy5FbmRQb2ludC5wb2xpY3lHcm91cC5nZXRQb2xpY3lHcm91cExpc3QgKyAnLycgKyBpZCk7XHJcbiAgfVxyXG5cclxuICBnZXRQb2xpY3lHcm91cHNCeU1hbmFnZW1lbnRHcm91cChwb2xpY3lHcm91cElkOiBudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChgL29yZy9wb2xpY3lHcm91cC9tYW5hZ2VtZW50Z3JvdXAvJHtwb2xpY3lHcm91cElkfWApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUG9saWN5R3JvdXAoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KFBvbGljeUdyb3VwQ29uZmlnLkVuZFBvaW50LnBvbGljeUdyb3VwLmNyZWF0ZVBvbGljeUdyb3VwLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVBvbGljeUdyb3VwKGlkOiBudW1iZXIsIGl0ZW06IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucHV0KGAke1BvbGljeUdyb3VwQ29uZmlnLkVuZFBvaW50LnBvbGljeUdyb3VwLmdldFBvbGljeUdyb3VwTGlzdH0vJHtpZH1gLCBpdGVtKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVBvbGljeUdyb3VwKGlkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmRlbGV0ZShgJHtQb2xpY3lHcm91cENvbmZpZy5FbmRQb2ludC5wb2xpY3lHcm91cC5nZXRQb2xpY3lHcm91cExpc3R9LyR7aWR9YCk7XHJcbiAgfVxyXG4gIGdldEFsbFVzZXJSb2xlKGlkPzogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoUm9sZUNvbmZpZy5FbmRQb2ludC5yb2xlLmdldEFsbE9yZ1JvbGUucmVwbGFjZSgne29yZ2lkfScsIFN0cmluZyhpZCkpKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZVJvbGUoaWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZGVsZXRlKGAke1JvbGVDb25maWcuRW5kUG9pbnQucm9sZS5nZXRBbGxVc2VyUm9sZX0vJHtpZH1gKTtcclxuICB9XHJcblxyXG4gIGdldFJvbGVCeUlkKHJvbGVpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoYCR7Um9sZUNvbmZpZy5FbmRQb2ludC5yb2xlLmdldEFsbFVzZXJSb2xlfS8ke3JvbGVpZH1gKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVJvbGUoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KFJvbGVDb25maWcuRW5kUG9pbnQucm9sZS5jcmVhdGVSb2xlLCBkYXRhKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVJvbGUocm9sZUlkOiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucHV0KGAke1JvbGVDb25maWcuRW5kUG9pbnQucm9sZS5nZXRBbGxVc2VyUm9sZX0vJHtyb2xlSWR9YCwgZGF0YSk7XHJcbiAgfVxyXG5cclxuICBnZXRMYW5kaW5nUGFnZShpZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoYCR7Um9sZUNvbmZpZy5FbmRQb2ludC5yb2xlLmdldExhbmRpbmdQYWdlfS8ke2lkfWApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlUG9saWN5R3JvdXBGb3JSb2xlKHJvbGVJZDogbnVtYmVyLCBkYXRhOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QoYCR7Um9sZUNvbmZpZy5FbmRQb2ludC5yb2xlLmFkZFBvbGljeUdyb3VwfS8ke3JvbGVJZH0vcG9saWN5Z3JvdXBzYCwgZGF0YSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVQb2xpY3lHcm91cEZvclJvbGUocm9sZUlkOiBudW1iZXIsIGRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucHV0KGAke1JvbGVDb25maWcuRW5kUG9pbnQucm9sZS5hZGRQb2xpY3lHcm91cH0vJHtyb2xlSWR9L3BvbGljeWdyb3Vwc2AsIGRhdGEpO1xyXG4gIH1cclxuICBnZXRSZXBvcnREYXNoYmFvcmQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoYCR7Um9sZUNvbmZpZy5FbmRQb2ludC5yb2xlLmRvc3NpZXJ9YCk7XHJcbiAgfVxyXG4gIGdldFBlcm1pc3Npb25Sb2xlQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoUGVybWlzc2lvbnNVUkwuRW5kUG9pbnRzLnBlcm1pc3Npb24ucGVybWlzc2lvblJvbGVCeUlkLnJlcGxhY2UoJ3tpZH0nLCBpZCkpO1xyXG4gIH1cclxuICBnZXRNYW5hZ2VtZW50R3JvdXBUcmVlKF9vcmdhbml6YXRpb25pZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoJy9vcmcvbWFuYWdlbWVudC1ncm91cC9vcmdhbml6YXRpb24vdHJlZScpO1xyXG4gIH1cclxuICBnZXRQZXJtaXNzaW9uc1RyZWUoYXBwbGljYXRpb25pZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoXHJcbiAgICAgIFBlcm1pc3Npb25zVVJMLkVuZFBvaW50cy5wZXJtaXNzaW9uLmFwcGxpY2F0aW9uUGVybWlzc2lvbnNUcmVlLnJlcGxhY2UoJ3thcHBsaWNhdGlvbmlkfScsIGFwcGxpY2F0aW9uaWQpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=