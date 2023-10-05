import { HttpService } from '../service/http.service';
import * as i0 from "@angular/core";
export declare class PageAccessService {
    private httpService;
    isfull: boolean;
    ishide: boolean;
    isread: boolean;
    isreadwrite: boolean;
    constructor(httpService: HttpService);
    /**
     * when user selected policy
     * @param access Raw valur of RBac form
     * @returns form array of DA
     * @childFunction of saveRbac
     */
    accessByPolicy(access: any, id: any, policyGroupData: any, selectedFieldData: any, pageData: any): any[];
    /**
     * when user selected Persona
     * @param access Raw valur of RBac form
     * @returns form array of DA
     * @childFunction of saveRbac
     */
    accessByPersona(access: any, personaId: any, id: any, roleAddedData: any, selectedFieldData: any, pageData: any): any[];
    /**
     * when user selected User
     * @param access Raw valur of RBac form
     * @returns form array of DA
     * @childFunction of saveRbac
     */
    accessByUser(access: any, userId: any, id: any, roleids: any, userList: any, selectedFieldData: any, pageData: any): any[];
    /**
     * Fetch access list for dashboard access
     * @param access
     * @param assetDashBoardConfigs
     * @param formObj
     * @param id
     */
    loadAccessForPage(access: any, selectedData: any, formObj: any, id: any, pageData: any): void;
    pageAccessCheck(pageAccess: any): void;
    setPolicyObj(formObj: any, selectedData: any, id: any): void;
    loadAccessForFields(access: any, selectedData: any, formObj: any, id: any, selectedFieldData: any, pageData: any): void;
    checkExistAsset(assetConfigs: any, selectedField: any, aConfigs: any, formObj: any): void;
    setRoleObj(formObj: any, selectedData: any, roleid: any, policyid: any): void;
    setUserObj(formObj: any, selectedData: any, userId: any, id: any, roleids: any): void;
    getCheckPolicyConfig(id: any, userId: any, existRolePolicyConfig: any, formObj: any): void;
    setSelectedFieldPage(updateArray: any, selectedFieldData: any): any;
    updateDuplicatesinArray(origArr: any[], updatingArr: any[]): any[];
    getMostFrequentEle(arr: any): string;
    getAccessArrayOnClick(pagesFromField: any, pageData: any, selectedFieldData: any, savedPageAccessPatching: any, existingValue: any): any;
    checkFieldLevelExist(fieldLevelExist: any, savedPageAccessPatching: any, _pageAccessValue: any, pagesFromField: any, existingValue: any, i: any): void;
    getAccess(access: any): any;
    getOrganizationPage(orgId: any): import("rxjs").Observable<Object>;
    getAssetByPageId(pId: any): import("rxjs").Observable<Object>;
    createAsset(selectedAccess: any, selectedId: any, asset: any): import("rxjs").Observable<Object>;
    getAssetById(selectedAccess: string, selectedId: any): import("rxjs").Observable<Object>;
    getPolicyGroupPage(policygroupid: any): import("rxjs").Observable<Object>;
    getDynamicPage(selectedAccess: any, selectedId: any): import("rxjs").Observable<Object>;
    updateDynamicPage(selectedAccess: any, selectedId: any, pageData: any): import("rxjs").Observable<Object>;
    createAccess(fieldLevelAccess: boolean, accessBy: string, payload: any, userId: any, roleId: any, policyId: any): import("rxjs").Observable<Object>;
    getApplicationAccess(): import("rxjs").Observable<Object>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PageAccessService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PageAccessService>;
}
