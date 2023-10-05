import { HttpService } from '../service/http.service';
import { NgxfUploaderService } from 'ngxf-uploader';
import * as i0 from "@angular/core";
export declare class DynamicTabPageService {
    private uploadService;
    private httpService;
    private isPageDesign;
    observePage: import("rxjs").Observable<boolean>;
    constructor(uploadService: NgxfUploaderService, httpService: HttpService);
    getActivePage(tabPageId: any, permission?: boolean): import("rxjs").Observable<Object>;
    getDynamicPage(pageId: any): import("rxjs").Observable<Object>;
    getPageById(pageId: any): import("rxjs").Observable<Object>;
    getListBySourceId(sourceId: any): import("rxjs").Observable<Object>;
    getResponseByPageId(responseId: any, pageId: any): import("rxjs").Observable<Object>;
    createFormResponse(id: any, requestData: any): import("rxjs").Observable<Object>;
    createUserSurvey(history: any, Id: any): import("rxjs").Observable<Object>;
    updateFormResponse(id: any, requestData: any): import("rxjs").Observable<Object>;
    exportReport(data: any): import("rxjs").Observable<Object>;
    uploadFile(file: any): import("rxjs").Observable<import("ngxf-uploader").UploadEvent>;
    getUniqueId(api: string): import("rxjs").Observable<Object>;
    changePage(page: any): void;
    createFormResponseAttachment(data: any): import("rxjs").Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicTabPageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DynamicTabPageService>;
}
