import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicTabPageConfig } from '../urls/dynamic-tab-page-url.config';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "ngxf-uploader";
import * as i2 from "../service/http.service";
export class DynamicTabPageService {
    uploadService;
    httpService;
    isPageDesign = new BehaviorSubject(false);
    observePage = this.isPageDesign.asObservable();
    constructor(uploadService, httpService) {
        this.uploadService = uploadService;
        this.httpService = httpService;
        // This is intentional
    }
    getActivePage(tabPageId, permission) {
        return this.httpService.get(`${DynamicTabPageConfig.EndPoint.Page.getActivePage.replace('{id}', tabPageId)}${permission ? '?applyPermissions=true' : ''}`);
    }
    getDynamicPage(pageId) {
        return this.httpService.get(`${DynamicTabPageConfig.EndPoint.Page.getPage}/${pageId}`);
    }
    getPageById(pageId) {
        return this.httpService.get(DynamicTabPageConfig.EndPoint.Page.getPageById.replace('{id}', pageId));
    }
    getListBySourceId(sourceId) {
        return this.httpService.get(DynamicTabPageConfig.EndPoint.Narrative.getIncidentListById.replace('{id}', sourceId));
    }
    getResponseByPageId(responseId, pageId) {
        return this.httpService.get(DynamicTabPageConfig.EndPoint.Page.getResponseByPageId
            .replace('{responseId}', responseId)
            .replace('{pageId}', pageId));
    }
    createFormResponse(id, requestData) {
        return this.httpService.post(id
            ? DynamicTabPageConfig.EndPoint.Page.updateFormResponse
            : DynamicTabPageConfig.EndPoint.Page.createFormResponse, requestData);
    }
    createUserSurvey(history, Id) {
        return this.httpService.post(DynamicTabPageConfig.EndPoint.Notification.createSurveyConfig
            .replace('{id}', history?.state?.usersurveyid)
            .replace('{status}', 'Completed')
            .replace('{pagedataid}', Id), {});
    }
    updateFormResponse(id, requestData) {
        return this.httpService.patch(`${DynamicTabPageConfig.EndPoint.Page.patchFormResponse}/${id}`, requestData);
    }
    exportReport(data) {
        return this.httpService.post(DynamicTabPageConfig.EndPoint.Finance.exportDocument, data);
    }
    uploadFile(file) {
        return this.uploadService.upload({
            url: this.httpService.baseUrl + '/' + DynamicTabPageConfig.EndPoint.Finance.uploadDocument,
            headers: new HttpHeaders()
                .set('ctype', 'file')
                .set('uniqueid', '6b61ac1e-221a-495c-957b-ad85f65be25a')
                .set('role', 'role=CP_PUBLIC'),
            files: file,
            process: true
        });
    }
    getUniqueId(api) {
        return this.httpService.get(DynamicTabPageConfig.EndPoint.Finance.getUniqueId + api);
    }
    changePage(page) {
        this.isPageDesign.next(page);
    }
    createFormResponseAttachment(data) {
        return this.httpService.post(DynamicTabPageConfig.EndPoint.Attachments.createAttachment, data);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicTabPageService, deps: [{ token: i1.NgxfUploaderService }, { token: i2.HttpService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicTabPageService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicTabPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgxfUploaderService }, { type: i2.HttpService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy10YWItcGFnZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL3JiYWMtcGFnZWFjY2Vzcy9zcmMvbGliL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3NlcnZpY2UvZHluYW1pYy10YWItcGFnZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFLdkMsTUFBTSxPQUFPLHFCQUFxQjtJQUdaO0lBQTRDO0lBRnhELFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUMzRCxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvQyxZQUFvQixhQUFrQyxFQUFVLFdBQXdCO1FBQXBFLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3JGLHNCQUFzQjtJQUN6QixDQUFDO0lBRUQsYUFBYSxDQUFDLFNBQWMsRUFBRSxVQUFvQjtRQUNoRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUN6QixHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQzVFLFVBQVUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLEVBQzFDLEVBQUUsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFXO1FBQ3hCLE9B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QUNyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBSTtRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCw0QkFBNEIsQ0FBQyxJQUFJO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRyxDQUFDO3dHQXBGVSxxQkFBcUI7NEdBQXJCLHFCQUFxQixjQUZwQixNQUFNOzs0RkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2h0dHAuc2VydmljZSc7XHJcbmltcG9ydCB7IER5bmFtaWNUYWJQYWdlQ29uZmlnIH0gZnJvbSAnLi4vdXJscy9keW5hbWljLXRhYi1wYWdlLXVybC5jb25maWcnO1xyXG5pbXBvcnQgeyBOZ3hmVXBsb2FkZXJTZXJ2aWNlIH0gZnJvbSAnbmd4Zi11cGxvYWRlcic7XHJcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRHluYW1pY1RhYlBhZ2VTZXJ2aWNlIHtcclxuICBwcml2YXRlIGlzUGFnZURlc2lnbiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG4gIG9ic2VydmVQYWdlID0gdGhpcy5pc1BhZ2VEZXNpZ24uYXNPYnNlcnZhYmxlKCk7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1cGxvYWRTZXJ2aWNlOiBOZ3hmVXBsb2FkZXJTZXJ2aWNlLCBwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSkge1xyXG4gICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxcclxuICB9XHJcblxyXG4gIGdldEFjdGl2ZVBhZ2UodGFiUGFnZUlkOiBhbnksIHBlcm1pc3Npb24/OiBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoXHJcbiAgICAgIGAke0R5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LlBhZ2UuZ2V0QWN0aXZlUGFnZS5yZXBsYWNlKCd7aWR9JywgdGFiUGFnZUlkKX0ke1xyXG4gICAgICAgIHBlcm1pc3Npb24gPyAnP2FwcGx5UGVybWlzc2lvbnM9dHJ1ZScgOiAnJ1xyXG4gICAgICB9YFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldER5bmFtaWNQYWdlKHBhZ2VJZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoYCR7RHluYW1pY1RhYlBhZ2VDb25maWcuRW5kUG9pbnQuUGFnZS5nZXRQYWdlfS8ke3BhZ2VJZH1gKTtcclxuICB9XHJcblxyXG4gIGdldFBhZ2VCeUlkKHBhZ2VJZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoRHluYW1pY1RhYlBhZ2VDb25maWcuRW5kUG9pbnQuUGFnZS5nZXRQYWdlQnlJZC5yZXBsYWNlKCd7aWR9JywgcGFnZUlkKSk7XHJcbiAgfVxyXG5cclxuICBnZXRMaXN0QnlTb3VyY2VJZChzb3VyY2VJZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoRHluYW1pY1RhYlBhZ2VDb25maWcuRW5kUG9pbnQuTmFycmF0aXZlLmdldEluY2lkZW50TGlzdEJ5SWQucmVwbGFjZSgne2lkfScsIHNvdXJjZUlkKSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNwb25zZUJ5UGFnZUlkKHJlc3BvbnNlSWQ6IGFueSwgcGFnZUlkOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChcclxuICAgICAgRHluYW1pY1RhYlBhZ2VDb25maWcuRW5kUG9pbnQuUGFnZS5nZXRSZXNwb25zZUJ5UGFnZUlkXHJcbiAgICAgICAgLnJlcGxhY2UoJ3tyZXNwb25zZUlkfScsIHJlc3BvbnNlSWQpXHJcbiAgICAgICAgLnJlcGxhY2UoJ3twYWdlSWR9JywgcGFnZUlkKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUZvcm1SZXNwb25zZShpZDogYW55LCByZXF1ZXN0RGF0YSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChcclxuICAgICAgaWRcclxuICAgICAgICA/IER5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LlBhZ2UudXBkYXRlRm9ybVJlc3BvbnNlXHJcbiAgICAgICAgOiBEeW5hbWljVGFiUGFnZUNvbmZpZy5FbmRQb2ludC5QYWdlLmNyZWF0ZUZvcm1SZXNwb25zZSxcclxuICAgICAgcmVxdWVzdERhdGFcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVVc2VyU3VydmV5KGhpc3RvcnksIElkOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QoXHJcbiAgICAgIER5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50Lk5vdGlmaWNhdGlvbi5jcmVhdGVTdXJ2ZXlDb25maWdcclxuICAgICAgICAucmVwbGFjZSgne2lkfScsIGhpc3Rvcnk/LnN0YXRlPy51c2Vyc3VydmV5aWQpXHJcbiAgICAgICAgLnJlcGxhY2UoJ3tzdGF0dXN9JywgJ0NvbXBsZXRlZCcpXHJcbiAgICAgICAgLnJlcGxhY2UoJ3twYWdlZGF0YWlkfScsIElkKSxcclxuICAgICAge31cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVGb3JtUmVzcG9uc2UoaWQ6IGFueSwgcmVxdWVzdERhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucGF0Y2goYCR7RHluYW1pY1RhYlBhZ2VDb25maWcuRW5kUG9pbnQuUGFnZS5wYXRjaEZvcm1SZXNwb25zZX0vJHtpZH1gLCByZXF1ZXN0RGF0YSk7XHJcbiAgfVxyXG5cclxuICBleHBvcnRSZXBvcnQoZGF0YTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KER5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LkZpbmFuY2UuZXhwb3J0RG9jdW1lbnQsIGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgdXBsb2FkRmlsZShmaWxlOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLnVwbG9hZFNlcnZpY2UudXBsb2FkKHtcclxuICAgICAgdXJsOiB0aGlzLmh0dHBTZXJ2aWNlLmJhc2VVcmwgKyAnLycgKyBEeW5hbWljVGFiUGFnZUNvbmZpZy5FbmRQb2ludC5GaW5hbmNlLnVwbG9hZERvY3VtZW50LFxyXG4gICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoKVxyXG4gICAgICAgIC5zZXQoJ2N0eXBlJywgJ2ZpbGUnKVxyXG4gICAgICAgIC5zZXQoJ3VuaXF1ZWlkJywgJzZiNjFhYzFlLTIyMWEtNDk1Yy05NTdiLWFkODVmNjViZTI1YScpXHJcbiAgICAgICAgLnNldCgncm9sZScsICdyb2xlPUNQX1BVQkxJQycpLFxyXG4gICAgICBmaWxlczogZmlsZSxcclxuICAgICAgcHJvY2VzczogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRVbmlxdWVJZChhcGk6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KER5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LkZpbmFuY2UuZ2V0VW5pcXVlSWQgKyBhcGkpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlUGFnZShwYWdlKSB7XHJcbiAgICB0aGlzLmlzUGFnZURlc2lnbi5uZXh0KHBhZ2UpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRm9ybVJlc3BvbnNlQXR0YWNobWVudChkYXRhKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KER5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LkF0dGFjaG1lbnRzLmNyZWF0ZUF0dGFjaG1lbnQsIGRhdGEpO1xyXG4gIH1cclxufVxyXG4iXX0=