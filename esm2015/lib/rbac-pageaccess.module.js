import { NgModule } from '@angular/core';
import { RbacPageaccessComponent } from './rbac-pageaccess.component';
import { PicsRbacPageaccessModule } from './pics-rbac-pageaccess/pics-rbac-pageaccess.module';
import { RbacService } from './pics-rbac-pageaccess/@core/service/rbac.service';
import { MicrostrategyService } from './pics-rbac-pageaccess/@core/service/microstrategy.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './pics-rbac-pageaccess/@core/service/http.service';
import { AlertService } from './pics-rbac-pageaccess/@core/service/alert.service';
import { ConfirmationService } from 'primeng/api';
import { PermissionStore } from './pics-rbac-pageaccess/@core/permissions/permission.store';
import { DataStoreService } from './pics-rbac-pageaccess/@core/service/data-store.service';
import { PageAccessService } from './pics-rbac-pageaccess/@core/urls/page-access.service';
import { AuthService } from './pics-rbac-pageaccess/@core/service/auth.service';
import { ShareDataService } from './pics-rbac-pageaccess/@core/service/share-data.service';
import * as i0 from "@angular/core";
export class RbacPageaccessModule {
}
RbacPageaccessModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacPageaccessModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RbacPageaccessModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacPageaccessModule, declarations: [RbacPageaccessComponent], imports: [PicsRbacPageaccessModule], exports: [RbacPageaccessComponent] });
RbacPageaccessModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacPageaccessModule, providers: [RbacService, MicrostrategyService, HttpClient, HttpService, AlertService, ConfirmationService, PermissionStore, DataStoreService, PageAccessService, AuthService, ShareDataService], imports: [[
            PicsRbacPageaccessModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: RbacPageaccessModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        RbacPageaccessComponent,
                    ],
                    imports: [
                        PicsRbacPageaccessModule,
                    ],
                    exports: [
                        RbacPageaccessComponent
                    ],
                    providers: [RbacService, MicrostrategyService, HttpClient, HttpService, AlertService, ConfirmationService, PermissionStore, DataStoreService, PageAccessService, AuthService, ShareDataService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy1wYWdlYWNjZXNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9yYmFjLXBhZ2VhY2Nlc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDOUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDNUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDM0YsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDMUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlEQUF5RCxDQUFDOztBQW1CM0YsTUFBTSxPQUFPLG9CQUFvQjs7a0hBQXBCLG9CQUFvQjttSEFBcEIsb0JBQW9CLGlCQVY3Qix1QkFBdUIsYUFHdkIsd0JBQXdCLGFBR3hCLHVCQUF1QjttSEFJZCxvQkFBb0IsYUFGcEIsQ0FBQyxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxnQkFBZ0IsQ0FBQyxZQU5uTDtZQUNQLHdCQUF3QjtTQUN6Qjs0RkFNVSxvQkFBb0I7a0JBWmhDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHdCQUF3QjtxQkFDekI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1QjtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBQyxpQkFBaUIsRUFBQyxXQUFXLEVBQUMsZ0JBQWdCLENBQUM7aUJBQzdMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJiYWNQYWdlYWNjZXNzQ29tcG9uZW50IH0gZnJvbSAnLi9yYmFjLXBhZ2VhY2Nlc3MuY29tcG9uZW50JztcbmltcG9ydCB7IFBpY3NSYmFjUGFnZWFjY2Vzc01vZHVsZSB9IGZyb20gJy4vcGljcy1yYmFjLXBhZ2VhY2Nlc3MvcGljcy1yYmFjLXBhZ2VhY2Nlc3MubW9kdWxlJztcbmltcG9ydCB7IFJiYWNTZXJ2aWNlIH0gZnJvbSAnLi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9zZXJ2aWNlL3JiYWMuc2VydmljZSc7XG5pbXBvcnQgeyBNaWNyb3N0cmF0ZWd5U2VydmljZSB9IGZyb20gJy4vcGljcy1yYmFjLXBhZ2VhY2Nlc3MvQGNvcmUvc2VydmljZS9taWNyb3N0cmF0ZWd5LnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEh0dHBTZXJ2aWNlIH0gZnJvbSAnLi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9zZXJ2aWNlL2h0dHAuc2VydmljZSc7XG5pbXBvcnQgeyBBbGVydFNlcnZpY2UgfSBmcm9tICcuL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3NlcnZpY2UvYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25TZXJ2aWNlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUGVybWlzc2lvblN0b3JlIH0gZnJvbSAnLi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS9wZXJtaXNzaW9ucy9wZXJtaXNzaW9uLnN0b3JlJztcbmltcG9ydCB7IERhdGFTdG9yZVNlcnZpY2UgfSBmcm9tICcuL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3NlcnZpY2UvZGF0YS1zdG9yZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2VBY2Nlc3NTZXJ2aWNlIH0gZnJvbSAnLi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS91cmxzL3BhZ2UtYWNjZXNzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3NlcnZpY2UvYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlRGF0YVNlcnZpY2UgfSBmcm9tICcuL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3NlcnZpY2Uvc2hhcmUtZGF0YS5zZXJ2aWNlJztcblxuXG5cblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFJiYWNQYWdlYWNjZXNzQ29tcG9uZW50LFxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgUGljc1JiYWNQYWdlYWNjZXNzTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUmJhY1BhZ2VhY2Nlc3NDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbUmJhY1NlcnZpY2UsIE1pY3Jvc3RyYXRlZ3lTZXJ2aWNlLCBIdHRwQ2xpZW50LCBIdHRwU2VydmljZSwgQWxlcnRTZXJ2aWNlLCBDb25maXJtYXRpb25TZXJ2aWNlLCBQZXJtaXNzaW9uU3RvcmUsIERhdGFTdG9yZVNlcnZpY2UsUGFnZUFjY2Vzc1NlcnZpY2UsQXV0aFNlcnZpY2UsU2hhcmVEYXRhU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUmJhY1BhZ2VhY2Nlc3NNb2R1bGUgeyB9XG4iXX0=