import { Injectable } from '@angular/core';
import { AccessManagementConfig } from '../urls/access-management-url.config';
import * as i0 from "@angular/core";
import * as i1 from "../service/http.service";
export class AccessManagementCommonService {
    httpService;
    urlData;
    constructor(httpService) {
        this.httpService = httpService;
        // This is intentional
    }
    set clickableData(data) {
        this.urlData = data;
    }
    get clickableData() {
        return this.urlData;
    }
    getUserList(orgid) {
        return this.httpService.get(AccessManagementConfig.EndPoint.User.getUserorgList + orgid);
    }
    getPolicyGroupList(orgid) {
        return this.httpService.get(AccessManagementConfig.EndPoint.PolicyGroup.getPolicyGroupList.replace('{organizationid}', String(orgid)));
    }
    getRoleList(orgid) {
        return this.httpService.get(AccessManagementConfig.EndPoint.Role.getRoleList.replace('{orgid}', String(orgid)));
    }
    getOrganizationList() {
        return this.httpService.get(AccessManagementConfig.EndPoint.Organization.getOrganizationList);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AccessManagementCommonService, deps: [{ token: i1.HttpService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AccessManagementCommonService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: AccessManagementCommonService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLW1hbmFnZW1lbnQtY29tbW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9waWNzLWNvcmUvcmJhYy1wYWdlYWNjZXNzL3NyYy9saWIvcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQGNvcmUvdXJscy9hY2Nlc3MtbWFuYWdlbWVudC1jb21tb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7QUFLOUUsTUFBTSxPQUFPLDZCQUE2QjtJQUVwQjtJQURaLE9BQU8sQ0FBTTtJQUNyQixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN6QyxzQkFBc0I7SUFDekIsQ0FBQztJQUVELElBQUksYUFBYSxDQUFDLElBQVM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQztJQUNELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUs7UUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFLO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQ3pCLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUMxRyxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEgsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNoRyxDQUFDO3dHQTdCVSw2QkFBNkI7NEdBQTdCLDZCQUE2QixjQUY1QixNQUFNOzs0RkFFUCw2QkFBNkI7a0JBSHpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2UvaHR0cC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQWNjZXNzTWFuYWdlbWVudENvbmZpZyB9IGZyb20gJy4uL3VybHMvYWNjZXNzLW1hbmFnZW1lbnQtdXJsLmNvbmZpZyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY2Nlc3NNYW5hZ2VtZW50Q29tbW9uU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB1cmxEYXRhOiBhbnk7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UpIHtcclxuICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsXHJcbiAgfVxyXG5cclxuICBzZXQgY2xpY2thYmxlRGF0YShkYXRhOiBhbnkpIHtcclxuICAgIHRoaXMudXJsRGF0YSA9IGRhdGE7XHJcbiAgfVxyXG4gIGdldCBjbGlja2FibGVEYXRhKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudXJsRGF0YTtcclxuICB9XHJcblxyXG4gIGdldFVzZXJMaXN0KG9yZ2lkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoQWNjZXNzTWFuYWdlbWVudENvbmZpZy5FbmRQb2ludC5Vc2VyLmdldFVzZXJvcmdMaXN0ICsgb3JnaWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9saWN5R3JvdXBMaXN0KG9yZ2lkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoXHJcbiAgICAgIEFjY2Vzc01hbmFnZW1lbnRDb25maWcuRW5kUG9pbnQuUG9saWN5R3JvdXAuZ2V0UG9saWN5R3JvdXBMaXN0LnJlcGxhY2UoJ3tvcmdhbml6YXRpb25pZH0nLCBTdHJpbmcob3JnaWQpKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFJvbGVMaXN0KG9yZ2lkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoQWNjZXNzTWFuYWdlbWVudENvbmZpZy5FbmRQb2ludC5Sb2xlLmdldFJvbGVMaXN0LnJlcGxhY2UoJ3tvcmdpZH0nLCBTdHJpbmcob3JnaWQpKSk7XHJcbiAgfVxyXG5cclxuICBnZXRPcmdhbml6YXRpb25MaXN0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KEFjY2Vzc01hbmFnZW1lbnRDb25maWcuRW5kUG9pbnQuT3JnYW5pemF0aW9uLmdldE9yZ2FuaXphdGlvbkxpc3QpO1xyXG4gIH1cclxufVxyXG4iXX0=