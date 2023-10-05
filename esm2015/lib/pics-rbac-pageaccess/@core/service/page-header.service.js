import { Injectable } from '@angular/core';
import { PageHeaderURL } from '../urls/page-header-url.config';
import * as i0 from "@angular/core";
import * as i1 from "../service/http.service";
export class PageHeaderService {
    constructor(httpService) {
        this.httpService = httpService;
        // This is intentional
    }
    getAuthorizedPages(orgid) {
        return this.httpService.get(PageHeaderURL.EndPoints.page.getAuthorizedPages.replace('{orgid}', orgid));
    }
}
PageHeaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageHeaderService, deps: [{ token: i1.HttpService }], target: i0.ɵɵFactoryTarget.Injectable });
PageHeaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageHeaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageHeaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9zZXJ2aWNlL3BhZ2UtaGVhZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7OztBQUsvRCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3pDLHNCQUFzQjtJQUN6QixDQUFDO0lBRUQsa0JBQWtCLENBQUMsS0FBSztRQUN0QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6RyxDQUFDOzsrR0FQVSxpQkFBaUI7bUhBQWpCLGlCQUFpQixjQUZoQixNQUFNOzRGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS9odHRwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWdlSGVhZGVyVVJMIH0gZnJvbSAnLi4vdXJscy9wYWdlLWhlYWRlci11cmwuY29uZmlnJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHBTZXJ2aWNlOiBIdHRwU2VydmljZSkge1xyXG4gICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxcclxuICB9XHJcblxyXG4gIGdldEF1dGhvcml6ZWRQYWdlcyhvcmdpZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KFBhZ2VIZWFkZXJVUkwuRW5kUG9pbnRzLnBhZ2UuZ2V0QXV0aG9yaXplZFBhZ2VzLnJlcGxhY2UoJ3tvcmdpZH0nLCBvcmdpZCkpO1xyXG4gIH1cclxufVxyXG4iXX0=