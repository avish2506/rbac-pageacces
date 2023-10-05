import { HttpService } from '../service/http.service';
import * as i0 from "@angular/core";
export declare class AccessManagementCommonService {
    private httpService;
    private urlData;
    constructor(httpService: HttpService);
    set clickableData(data: any);
    get clickableData(): any;
    getUserList(orgid: any): import("rxjs").Observable<Object>;
    getPolicyGroupList(orgid: any): import("rxjs").Observable<Object>;
    getRoleList(orgid: any): import("rxjs").Observable<Object>;
    getOrganizationList(): import("rxjs").Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccessManagementCommonService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AccessManagementCommonService>;
}
