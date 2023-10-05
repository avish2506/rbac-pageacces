import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicTabPageConfig } from '../urls/dynamic-tab-page-url.config';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "ngxf-uploader";
import * as i2 from "../service/http.service";
export class DynamicTabPageService {
    constructor(uploadService, httpService) {
        this.uploadService = uploadService;
        this.httpService = httpService;
        this.isPageDesign = new BehaviorSubject(false);
        this.observePage = this.isPageDesign.asObservable();
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
        var _a;
        return this.httpService.post(DynamicTabPageConfig.EndPoint.Notification.createSurveyConfig
            .replace('{id}', (_a = history === null || history === void 0 ? void 0 : history.state) === null || _a === void 0 ? void 0 : _a.usersurveyid)
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
}
DynamicTabPageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DynamicTabPageService, deps: [{ token: i1.NgxfUploaderService }, { token: i2.HttpService }], target: i0.ɵɵFactoryTarget.Injectable });
DynamicTabPageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DynamicTabPageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: DynamicTabPageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.NgxfUploaderService }, { type: i2.HttpService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy10YWItcGFnZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL3JiYWMtcGFnZWFjY2Vzcy9zcmMvbGliL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3NlcnZpY2UvZHluYW1pYy10YWItcGFnZS1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFLdkMsTUFBTSxPQUFPLHFCQUFxQjtJQUdoQyxZQUFvQixhQUFrQyxFQUFVLFdBQXdCO1FBQXBFLGtCQUFhLEdBQWIsYUFBYSxDQUFxQjtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBRmhGLGlCQUFZLEdBQUcsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDLENBQUM7UUFDM0QsZ0JBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTVDLHNCQUFzQjtJQUN6QixDQUFDO0lBRUQsYUFBYSxDQUFDLFNBQWMsRUFBRSxVQUFvQjtRQUNoRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUN6QixHQUFHLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQzVFLFVBQVUsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLEVBQzFDLEVBQUUsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFXO1FBQ3hCLE9BQU8sSUFBSSxD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RUQsV0FBVyxDQUFDLEdBQVc7UUFDckIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQUk7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsNEJBQTRCLENBQUMsSUFBSTtRQUMvQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakcsQ0FBQzs7bUhBcEZVLHFCQUFxQjt1SEFBckIscUJBQXFCLGNBRnBCLE1BQU07NEZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9odHRwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEeW5hbWljVGFiUGFnZUNvbmZpZyB9IGZyb20gJy4uL3VybHMvZHluYW1pYy10YWItcGFnZS11cmwuY29uZmlnJztcclxuaW1wb3J0IHsgTmd4ZlVwbG9hZGVyU2VydmljZSB9IGZyb20gJ25neGYtdXBsb2FkZXInO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIER5bmFtaWNUYWJQYWdlU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBpc1BhZ2VEZXNpZ24gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcclxuICBvYnNlcnZlUGFnZSA9IHRoaXMuaXNQYWdlRGVzaWduLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdXBsb2FkU2VydmljZTogTmd4ZlVwbG9hZGVyU2VydmljZSwgcHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UpIHtcclxuICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsXHJcbiAgfVxyXG5cclxuICBnZXRBY3RpdmVQYWdlKHRhYlBhZ2VJZDogYW55LCBwZXJtaXNzaW9uPzogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KFxyXG4gICAgICBgJHtEeW5hbWljVGFiUGFnZUNvbmZpZy5FbmRQb2ludC5QYWdlLmdldEFjdGl2ZVBhZ2UucmVwbGFjZSgne2lkfScsIHRhYlBhZ2VJZCl9JHtcclxuICAgICAgICBwZXJtaXNzaW9uID8gJz9hcHBseVBlcm1pc3Npb25zPXRydWUnIDogJydcclxuICAgICAgfWBcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBnZXREeW5hbWljUGFnZShwYWdlSWQ6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KGAke0R5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LlBhZ2UuZ2V0UGFnZX0vJHtwYWdlSWR9YCk7XHJcbiAgfVxyXG5cclxuICBnZXRQYWdlQnlJZChwYWdlSWQ6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KER5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LlBhZ2UuZ2V0UGFnZUJ5SWQucmVwbGFjZSgne2lkfScsIHBhZ2VJZCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGlzdEJ5U291cmNlSWQoc291cmNlSWQ6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KER5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50Lk5hcnJhdGl2ZS5nZXRJbmNpZGVudExpc3RCeUlkLnJlcGxhY2UoJ3tpZH0nLCBzb3VyY2VJZCkpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVzcG9uc2VCeVBhZ2VJZChyZXNwb25zZUlkOiBhbnksIHBhZ2VJZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoXHJcbiAgICAgIER5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LlBhZ2UuZ2V0UmVzcG9uc2VCeVBhZ2VJZFxyXG4gICAgICAgIC5yZXBsYWNlKCd7cmVzcG9uc2VJZH0nLCByZXNwb25zZUlkKVxyXG4gICAgICAgIC5yZXBsYWNlKCd7cGFnZUlkfScsIHBhZ2VJZClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVGb3JtUmVzcG9uc2UoaWQ6IGFueSwgcmVxdWVzdERhdGEpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QoXHJcbiAgICAgIGlkXHJcbiAgICAgICAgPyBEeW5hbWljVGFiUGFnZUNvbmZpZy5FbmRQb2ludC5QYWdlLnVwZGF0ZUZvcm1SZXNwb25zZVxyXG4gICAgICAgIDogRHluYW1pY1RhYlBhZ2VDb25maWcuRW5kUG9pbnQuUGFnZS5jcmVhdGVGb3JtUmVzcG9uc2UsXHJcbiAgICAgIHJlcXVlc3REYXRhXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVXNlclN1cnZleShoaXN0b3J5LCBJZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5wb3N0KFxyXG4gICAgICBEeW5hbWljVGFiUGFnZUNvbmZpZy5FbmRQb2ludC5Ob3RpZmljYXRpb24uY3JlYXRlU3VydmV5Q29uZmlnXHJcbiAgICAgICAgLnJlcGxhY2UoJ3tpZH0nLCBoaXN0b3J5Py5zdGF0ZT8udXNlcnN1cnZleWlkKVxyXG4gICAgICAgIC5yZXBsYWNlKCd7c3RhdHVzfScsICdDb21wbGV0ZWQnKVxyXG4gICAgICAgIC5yZXBsYWNlKCd7cGFnZWRhdGFpZH0nLCBJZCksXHJcbiAgICAgIHt9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRm9ybVJlc3BvbnNlKGlkOiBhbnksIHJlcXVlc3REYXRhOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBhdGNoKGAke0R5bmFtaWNUYWJQYWdlQ29uZmlnLkVuZFBvaW50LlBhZ2UucGF0Y2hGb3JtUmVzcG9uc2V9LyR7aWR9YCwgcmVxdWVzdERhdGEpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0UmVwb3J0KGRhdGE6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChEeW5hbWljVGFiUGFnZUNvbmZpZy5FbmRQb2ludC5GaW5hbmNlLmV4cG9ydERvY3VtZW50LCBkYXRhKTtcclxuICB9XHJcblxyXG4gIHVwbG9hZEZpbGUoZmlsZTogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy51cGxvYWRTZXJ2aWNlLnVwbG9hZCh7XHJcbiAgICAgIHVybDogdGhpcy5odHRwU2VydmljZS5iYXNlVXJsICsgJy8nICsgRHluYW1pY1RhYlBhZ2VDb25maWcuRW5kUG9pbnQuRmluYW5jZS51cGxvYWREb2N1bWVudCxcclxuICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKClcclxuICAgICAgICAuc2V0KCdjdHlwZScsICdmaWxlJylcclxuICAgICAgICAuc2V0KCd1bmlxdWVpZCcsICc2YjYxYWMxZS0yMjFhLTQ5NWMtOTU3Yi1hZDg1ZjY1YmUyNWEnKVxyXG4gICAgICAgIC5zZXQoJ3JvbGUnLCAncm9sZT1DUF9QVUJMSUMnKSxcclxuICAgICAgZmlsZXM6IGZpbGUsXHJcbiAgICAgIHByb2Nlc3M6IHRydWVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0VW5pcXVlSWQoYXBpOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChEeW5hbWljVGFiUGFnZUNvbmZpZy5FbmRQb2ludC5GaW5hbmNlLmdldFVuaXF1ZUlkICsgYXBpKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVBhZ2UocGFnZSkge1xyXG4gICAgdGhpcy5pc1BhZ2VEZXNpZ24ubmV4dChwYWdlKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUZvcm1SZXNwb25zZUF0dGFjaG1lbnQoZGF0YSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdChEeW5hbWljVGFiUGFnZUNvbmZpZy5FbmRQb2ludC5BdHRhY2htZW50cy5jcmVhdGVBdHRhY2htZW50LCBkYXRhKTtcclxuICB9XHJcbn1cclxuIl19