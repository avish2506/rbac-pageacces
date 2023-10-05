import { HttpService } from '../service/http.service';
import * as i0 from "@angular/core";
export declare class PageHeaderService {
    private httpService;
    constructor(httpService: HttpService);
    getAuthorizedPages(orgid: any): import("rxjs").Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageHeaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PageHeaderService>;
}
