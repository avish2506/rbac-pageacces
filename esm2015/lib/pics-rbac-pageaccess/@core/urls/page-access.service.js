import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccessManagementConfig } from '../urls/access-management-url.config';
import * as i0 from "@angular/core";
import * as i1 from "../service/http.service";
export class PageAccessService {
    constructor(httpService) {
        this.httpService = httpService;
        this.isfull = false;
        this.ishide = false;
        this.isread = false;
        this.isreadwrite = false;
        // This is intentional
    }
    /**
     * when user selected policy
     * @param access Raw valur of RBac form
     * @returns form array of DA
     * @childFunction of saveRbac
     */
    accessByPolicy(access, id, policyGroupData, selectedFieldData, pageData) {
        const fullArray = [];
        for (const value of id) {
            const selectedData = policyGroupData.filter(key => key.id === value);
            const formObj = {
                id: '',
                description: '',
                policygroupname: '',
                pageConfigs: [],
                assetConfigs: []
            };
            this.setPolicyObj(formObj, selectedData, value);
            this.loadAccessForPage(access, selectedData, formObj, value, pageData);
            if (access.fieldLevelData.length) {
                this.loadAccessForFields(access, selectedData, formObj, value, selectedFieldData, pageData);
            }
            fullArray.push(formObj);
        }
        return fullArray;
    }
    /**
     * when user selected Persona
     * @param access Raw valur of RBac form
     * @returns form array of DA
     * @childFunction of saveRbac
     */
    accessByPersona(access, personaId, id, roleAddedData, selectedFieldData, pageData) {
        const fullArray = [];
        // const personaId = this.rbacForm.get('roleid').value;
        // const personaId = this.rbacForm.get('roleid').value;
        const formObj = {
            id: '',
            rolekey: '',
            rolename: '',
            description: '',
            effectivedate: '',
            pageConfigs: [],
            assetConfigs: [],
            rolePolicyGroupConfigs: []
        };
        for (const item of personaId) {
            const selectedData = roleAddedData.filter(key => key.id === item);
            this.setRoleObj(formObj, selectedData, item, id);
            this.loadAccessForPage(access, selectedData, formObj, item, pageData);
            if (access.fieldLevelData.length) {
                this.loadAccessForFields(access, selectedData, formObj, item, selectedFieldData, pageData);
            }
            fullArray.push(formObj);
        }
        return fullArray;
    }
    /**
     * when user selected User
     * @param access Raw valur of RBac form
     * @returns form array of DA
     * @childFunction of saveRbac
     */
    accessByUser(access, userId, id, roleids, userList, selectedFieldData, pageData) {
        const fullArray = [];
        for (const item of userId) {
            const selectedData = userList.filter(key => key.id === item);
            const formObj = Object.assign({}, selectedData[0]);
            formObj.pageConfigs = [];
            formObj.assetConfigs = [];
            formObj.policyGroupConfigs = [];
            formObj.roleConfigs = [];
            console.log('======');
            this.setUserObj(formObj, selectedData, item, id, roleids);
            console.log('======1');
            this.loadAccessForPage(access, selectedData, formObj, item, pageData);
            console.log('======2');
            if (access.fieldLevelData.length) {
                this.loadAccessForFields(access, selectedData, formObj, item, selectedFieldData, pageData);
            }
            fullArray.push(formObj);
        }
        return fullArray;
    }
    /**
     * Fetch access list for dashboard access
     * @param access
     * @param assetDashBoardConfigs
     * @param formObj
     * @param id
     */
    loadAccessForPage(access, selectedData, formObj, id, pageData) {
        const existPageConfigs = selectedData[0]['pageConfigs'];
        for (const item of access.pageLevelData) {
            const selectedModule = pageData.filter(key => key.id === item['pageid']);
            const pageAccess = access.pageLevelData.filter(key => key.pageid === item['pageid']);
            this.pageAccessCheck(pageAccess);
            const pageKey = {
                id: null,
                isactive: true,
                isfull: this.isfull,
                ishide: this.ishide,
                isread: this.isread,
                isreadwrite: this.isreadwrite,
                pageid: item['pageid'],
                policygroupid: id,
                modulekey: selectedModule[0]['modulekey'],
                submodulekey: selectedModule[0]['submodulekey']
            };
            // check exist page length
            if (existPageConfigs.length) {
                const existIds = existPageConfigs.map(p => p.pageid);
                const chkPage = existIds.includes(item['pageid']);
                if (chkPage) {
                    const index = existIds.indexOf(item['pageid']);
                    if (index > -1) {
                        //if found
                        pageKey.id = existPageConfigs[index]['id'];
                        pageKey.isactive = false;
                        formObj.pageConfigs.push(pageKey);
                        existPageConfigs.splice(index, 1);
                    }
                }
                const d = Object.assign({}, pageKey);
                d.id = null;
                d.isactive = true;
                formObj.pageConfigs.push(d);
            }
            else {
                formObj.pageConfigs.push(pageKey);
            }
        }
        // still existconfig length
        if (existPageConfigs.length) {
            existPageConfigs.map(t => {
                t.isactive = false;
                formObj.pageConfigs.push(t);
                return t;
            });
        }
    }
    pageAccessCheck(pageAccess) {
        if (pageAccess[0].pageAccess === '1') {
            this.isfull = true;
        }
        else if (pageAccess[0].pageAccess === '4') {
            this.ishide = true;
        }
        else if (pageAccess[0].pageAccess === '3') {
            this.isread = true;
        }
        else if (pageAccess[0].pageAccess === '2') {
            this.isreadwrite = true;
        }
    }
    setPolicyObj(formObj, selectedData, id) {
        formObj.id = id;
        formObj.description = selectedData[0]['description'];
        formObj.policygroupname = selectedData[0]['policygroupname'];
    }
    loadAccessForFields(access, selectedData, formObj, id, selectedFieldData, pageData) {
        // console.log(selectedData)
        const assetConfigs = selectedData[0]['assetConfigs'].filter(key => key.modulekey !== null);
        // console.log('------------')
        const selectedModule = pageData.filter(key => key.id === access.fpages[0]['id']);
        // console.log(access.fieldLevelData)
        selectedFieldData =
            access.fieldLevelData !== null ? this.setSelectedFieldPage(access.fieldLevelData, selectedFieldData) : [];
        // console.log(selectedData, assetConfigs)
        for (const selectedField of selectedFieldData) {
            if (selectedField.access === null) {
                // continue;
            }
            console.log(selectedField);
            let isfull = false;
            let ishide = false;
            let isread = false;
            let isreadwrite = false;
            if (selectedField.access === '2' || selectedField.access === '1') {
                isfull = true;
            }
            else if (selectedField.access === '4') {
                ishide = true;
            }
            else if (selectedField.access === '3') {
                isread = true;
            }
            else if (selectedField.access === '2') {
                isreadwrite = true;
            }
            const aConfigs = {
                id: selectedField['id'] ? selectedField['id'] : null,
                isactive: true,
                isfull: isfull,
                ishide: ishide,
                isread: isread,
                isreadwrite: isreadwrite,
                assetid: selectedField['assetid'],
                policygroupid: id,
                pageid: selectedField['pageId'] ? selectedField['pageId'] : access.fpages[0]['id'],
                modulekey: selectedModule[0]['modulekey'],
                submodulekey: selectedModule[0]['submodulekey']
            };
            // check exist page length
            this.checkExistAsset(assetConfigs, selectedField, aConfigs, formObj);
        }
    }
    checkExistAsset(assetConfigs, selectedField, aConfigs, formObj) {
        if (assetConfigs.length) {
            const existIds = assetConfigs.map(p => p.assetid);
            const chkPage = existIds.includes(selectedField['assetid']);
            if (chkPage) {
                const index = existIds.indexOf(selectedField['assetid']);
                if (index > -1) {
                    //if found
                    aConfigs.id = assetConfigs[index]['id'];
                    aConfigs.isactive = false;
                    formObj.assetConfigs.push(aConfigs);
                    assetConfigs.splice(index, 1);
                }
            }
            const d = Object.assign({}, aConfigs);
            d.isactive = true;
            d.id = null;
            formObj.assetConfigs.push(d);
        }
        else {
            formObj.assetConfigs.push(aConfigs);
        }
    }
    setRoleObj(formObj, selectedData, roleid, policyid) {
        formObj.id = roleid;
        formObj.rolekey = selectedData[0]['rolekey'];
        formObj.rolename = selectedData[0]['rolename'];
        formObj.effectivedate = selectedData[0]['effectivedate'];
        formObj.description = selectedData[0]['description'];
        // loop the policy group
        const id = policyid;
        const existRolePolicyConfig = selectedData[0]['rolePolicyGroupConfigs'];
        for (const item of id) {
            const rpolicyConfig = {
                id: null,
                isactive: true,
                policygroupid: item,
                roleid: roleid // role id
            };
            // check exist page length
            if (existRolePolicyConfig.length) {
                const existIds = existRolePolicyConfig.map(p => p.policygroupid);
                const chkPage = existIds.includes(item);
                if (chkPage) {
                    const index = existIds.indexOf(item);
                    if (index > -1) {
                        //if found
                        rpolicyConfig.id = existRolePolicyConfig[index]['id'];
                        existRolePolicyConfig.splice(index, 1);
                    }
                }
            }
            formObj.rolePolicyGroupConfigs.push(rpolicyConfig);
        }
        // still existconfig length
        if (existRolePolicyConfig.length) {
            existRolePolicyConfig.map(t => {
                t.isactive = false;
                formObj.rolePolicyGroupConfigs.push(t);
                return t;
            });
        }
    }
    setUserObj(formObj, selectedData, userId, id, roleids) {
        // loop the policy group
        const existRolePolicyConfig = selectedData[0]['policyGroupConfigs'];
        this.getCheckPolicyConfig(id, userId, existRolePolicyConfig, formObj);
        // still existconfig length
        if (existRolePolicyConfig.length) {
            existRolePolicyConfig.map(t => {
                t.isactive = false;
                formObj.policyGroupConfigs.push(t);
                return t;
            });
        }
        // loop the role group
        // const roleids = this.rbacForm.get('roleid').value;
        const existRoleId = selectedData[0]['roleConfigs'];
        for (const role of existRoleId) {
            const chkRoleData = roleids.includes(role['roleid']);
            const roleGrp = {
                id: role['id'],
                isactive: false,
                isdefaultrole: role['isdefaultrole'],
                userid: userId,
                roleid: role['roleid'],
                effectivedate: role['effectivedate']
            };
            if (chkRoleData) {
                const index1 = roleids.indexOf(role['roleid']);
                if (index1 > -1) {
                    //if found
                    roleids.splice(index1, 1);
                }
                roleGrp.isactive = true;
            }
            formObj.roleConfigs.push(roleGrp);
        }
        // check new roles group ids
        if (roleids.length) {
            for (const roleId of roleids) {
                const roleGrp = {
                    id: null,
                    isactive: true,
                    isdefaultrole: false,
                    userid: userId,
                    roleid: roleId,
                    effectivedate: new Date()
                };
                formObj.roleConfigs.push(roleGrp);
            }
        }
    }
    getCheckPolicyConfig(id, userId, existRolePolicyConfig, formObj) {
        for (const item of id) {
            const rpolicyConfig = {
                id: null,
                isactive: true,
                policygroupid: item,
                userid: userId // user id
            };
            // check exist page length
            if (existRolePolicyConfig.length) {
                const existIds = existRolePolicyConfig.map(p => p.policygroupid);
                const chkPage = existIds.includes(item);
                if (chkPage) {
                    const index = existIds.indexOf(item);
                    if (index > -1) {
                        //if found
                        rpolicyConfig.id = existRolePolicyConfig[index]['id'];
                        existRolePolicyConfig.splice(index, 1);
                    }
                }
            }
            formObj.policyGroupConfigs.push(rpolicyConfig);
        }
    }
    setSelectedFieldPage(updateArray, selectedFieldData) {
        // console.log('=========>', updateArray, selectedFieldData)
        if (updateArray === null || updateArray === void 0 ? void 0 : updateArray.length) {
            if ((selectedFieldData === null || selectedFieldData === void 0 ? void 0 : selectedFieldData.length) >= updateArray.length) {
                selectedFieldData = this.updateDuplicatesinArray([...selectedFieldData], [...updateArray]);
                return selectedFieldData;
            }
            else {
                selectedFieldData = [...updateArray];
                return selectedFieldData;
            }
        }
    }
    updateDuplicatesinArray(origArr, updatingArr) {
        const updatingArrids = new Set(updatingArr.map(ele => ele.assetid));
        return [...updatingArr, ...origArr.filter(ele => !updatingArrids.has(ele.assetid))];
    }
    getMostFrequentEle(arr) {
        const hashMap = arr.reduce((acc, val) => {
            acc[String(val)] = (acc[val] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(hashMap).reduce((a, b) => (hashMap[a] > hashMap[b] ? a : b));
    }
    getAccessArrayOnClick(pagesFromField, pageData, selectedFieldData, savedPageAccessPatching, existingValue) {
        var _a, _b, _c;
        const pageAccessValue = null;
        const accessArray = [];
        for (let i = 0; i < (pagesFromField === null || pagesFromField === void 0 ? void 0 : pagesFromField.length); i++) {
            const pageName = pageData.filter(key => key.id === pagesFromField[i]);
            const fieldLevelExist = selectedFieldData.filter(ele => ele.pageId == pagesFromField[i]);
            this.checkFieldLevelExist(fieldLevelExist, savedPageAccessPatching, pageAccessValue, pagesFromField, existingValue, i);
            accessArray.push(new FormGroup({
                pageName: new FormControl(pageName[0]['pagename']),
                pageid: new FormControl(pagesFromField[i]),
                pageAccess: new FormControl(pageAccessValue ? pageAccessValue : '2'),
                validity: new FormControl((((_a = existingValue[i]) === null || _a === void 0 ? void 0 : _a.validity) && String(existingValue[i].validity)) || '0'),
                condition: new FormControl((((_b = existingValue[i]) === null || _b === void 0 ? void 0 : _b.condition) && existingValue[i].condition) || 'always'),
                fallbackTo: new FormControl((((_c = existingValue[i]) === null || _c === void 0 ? void 0 : _c.condition) && existingValue[i].fallbackTo) || 'n')
            }));
        }
        return accessArray;
    }
    checkFieldLevelExist(fieldLevelExist, savedPageAccessPatching, _pageAccessValue, pagesFromField, existingValue, i) {
        var _a, _b;
        if ((fieldLevelExist === null || fieldLevelExist === void 0 ? void 0 : fieldLevelExist.length) && savedPageAccessPatching) {
            _pageAccessValue = this.getMostFrequentEle((_a = fieldLevelExist === null || fieldLevelExist === void 0 ? void 0 : fieldLevelExist.filter(ele => (ele.pageId = pagesFromField[i]))) === null || _a === void 0 ? void 0 : _a.map(e => (e.access ? Number(e.access) : 0)));
        }
        else {
            _pageAccessValue = (_b = existingValue === null || existingValue === void 0 ? void 0 : existingValue.find(ele => ele.pageid === pagesFromField[i])) === null || _b === void 0 ? void 0 : _b.pageAccess;
        }
    }
    getAccess(access) {
        let accessField;
        accessField = '2';
        if (access === null || access === void 0 ? void 0 : access.isreadwrite) {
            accessField = '2';
        }
        else if (access === null || access === void 0 ? void 0 : access.ishide) {
            accessField = '4';
        }
        else if (access === null || access === void 0 ? void 0 : access.isread) {
            accessField = '3';
        }
        else if (access === null || access === void 0 ? void 0 : access.isfull) {
            accessField = '5';
        }
        return accessField;
    }
    getOrganizationPage(orgId) {
        return this.httpService.get(AccessManagementConfig.EndPoint.Organization.getOrganization.replace('{orgId}', orgId));
    }
    getAssetByPageId(pId) {
        return this.httpService.get(`${AccessManagementConfig.EndPoint.Asset.getPageAsset}/${pId}`);
    }
    createAsset(selectedAccess, selectedId, asset) {
        let url;
        if (selectedAccess === 'user') {
            url = `org/user/${selectedId}`;
        }
        else if (selectedAccess === 'role') {
            url = `access-control/role/${selectedId}`;
        }
        else {
            url = `platform/page-designer/policygroup/${selectedId}`;
        }
        return this.httpService.post(`/${url}/${AccessManagementConfig.EndPoint.Asset.getAsset}`, asset);
    }
    getAssetById(selectedAccess, selectedId) {
        let url;
        if (selectedAccess === 'user') {
            url = AccessManagementConfig.EndPoint.Asset.getUserAsset;
        }
        else if (selectedAccess === 'role') {
            url = AccessManagementConfig.EndPoint.Asset.getRoleAsset;
        }
        else {
            url = AccessManagementConfig.EndPoint.Asset.getPolicyGroupAsset;
        }
        return this.httpService.get(`${url}/${selectedId}`);
    }
    getPolicyGroupPage(policygroupid) {
        return this.httpService.get(`/policygroup/${policygroupid}${AccessManagementConfig.EndPoint.Page.getPage}`);
    }
    getDynamicPage(selectedAccess, selectedId) {
        let url;
        if (selectedAccess === 'user') {
            url = 'org/user';
        }
        else if (selectedAccess === 'role') {
            url = 'access-control/role';
        }
        else {
            url = 'platform/page-designer/policygroup';
        }
        return this.httpService.get(`/${url}/${selectedId}${AccessManagementConfig.EndPoint.Page.getPage}`);
    }
    updateDynamicPage(selectedAccess, selectedId, pageData) {
        let url;
        if (selectedAccess === 'user') {
            url = 'org/user';
        }
        else if (selectedAccess === 'role') {
            url = 'access-control/role';
        }
        else {
            url = 'platform/page-designer/policygroup';
        }
        return this.httpService.put(`/${url}/${selectedId}${AccessManagementConfig.EndPoint.Page.getPage}`, pageData);
    }
    createAccess(fieldLevelAccess, accessBy, payload, userId, roleId, policyId) {
        let url;
        const createUrl = fieldLevelAccess
            ? AccessManagementConfig.EndPoint.Asset.getAsset
            : AccessManagementConfig.EndPoint.Page.getPage;
        // check only policy group
        if (accessBy === '3') {
            url = `${AccessManagementConfig.EndPoint.PolicyGroup.getPolicyGroup}${policyId ? policyId : '0'}${createUrl}`;
        }
        // check persona with policy group
        if (accessBy === '2') {
            url = `${AccessManagementConfig.EndPoint.Role.getRole}${roleId ? roleId : '0'}${createUrl}`;
        }
        // check user, persona with policy group
        if (accessBy === '1') {
            url = `${AccessManagementConfig.EndPoint.User.getUser}${userId ? userId : '0'}${createUrl}`;
        }
        return this.httpService.post(url, payload);
    }
    getApplicationAccess() {
        return this.httpService.get('/applicationaccess/');
    }
}
PageAccessService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageAccessService, deps: [{ token: i1.HttpService }], target: i0.ɵɵFactoryTarget.Injectable });
PageAccessService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageAccessService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0, type: PageAccessService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1hY2Nlc3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS91cmxzL3BhZ2UtYWNjZXNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7QUFLOUUsTUFBTSxPQUFPLGlCQUFpQjtJQUs1QixZQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUo1QyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUVqQixzQkFBc0I7SUFDekIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLGlCQUFpQixFQUFFLFFBQVE7UUFDckUsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEtBQUssTUFBTSxLQUFLLElBQUksRUFBRSxFQUFFO1lBQ3RCLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sT0FBTyxHQUFHO2dCQUNkLEVBQUUsRUFBRSxFQUFFO2dCQUNOLFdBQVcsRUFBRSxFQUFFO2dCQUNmLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixXQUFXLEVBQUUsRUFBRTtn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RUQsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNyRCxDQUFDOzsrR0FqZ0JVLGlCQUFpQjttSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07NEZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgSHR0cFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlL2h0dHAuc2VydmljZSc7XHJcbmltcG9ydCB7IEFjY2Vzc01hbmFnZW1lbnRDb25maWcgfSBmcm9tICcuLi91cmxzL2FjY2Vzcy1tYW5hZ2VtZW50LXVybC5jb25maWcnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFnZUFjY2Vzc1NlcnZpY2Uge1xyXG4gIGlzZnVsbCA9IGZhbHNlO1xyXG4gIGlzaGlkZSA9IGZhbHNlO1xyXG4gIGlzcmVhZCA9IGZhbHNlO1xyXG4gIGlzcmVhZHdyaXRlID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwU2VydmljZTogSHR0cFNlcnZpY2UpIHtcclxuICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB3aGVuIHVzZXIgc2VsZWN0ZWQgcG9saWN5XHJcbiAgICogQHBhcmFtIGFjY2VzcyBSYXcgdmFsdXIgb2YgUkJhYyBmb3JtXHJcbiAgICogQHJldHVybnMgZm9ybSBhcnJheSBvZiBEQVxyXG4gICAqIEBjaGlsZEZ1bmN0aW9uIG9mIHNhdmVSYmFjXHJcbiAgICovXHJcbiAgYWNjZXNzQnlQb2xpY3koYWNjZXNzLCBpZCwgcG9saWN5R3JvdXBEYXRhLCBzZWxlY3RlZEZpZWxkRGF0YSwgcGFnZURhdGEpOiBhbnlbXSB7XHJcbiAgICBjb25zdCBmdWxsQXJyYXkgPSBbXTtcclxuICAgIGZvciAoY29uc3QgdmFsdWUgb2YgaWQpIHtcclxuICAgICAgY29uc3Qgc2VsZWN0ZWREYXRhID0gcG9saWN5R3JvdXBEYXRhLmZpbHRlcihrZXkgPT4ga2V5LmlkID09PSB2YWx1ZSk7XHJcbiAgICAgIGNvbnN0IGZvcm1PYmogPSB7XHJcbiAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnJyxcclxuICAgICAgICBwb2xpY3lncm91cG5hbWU6ICcnLFxyXG4gICAgICAgIHBhZ2VDb25maWdzOiBbXSxcclxuICAgICAgICBhc3NldENvbmZpZ3M6IFtdXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuc2V0UG9saWN5T2JqKGZvcm1PYmosIHNlbGVjdGVkRGF0YSwgdmFsdWUpO1xyXG4gICAgICB0aGlzLmxvYWRBY2Nlc3NGb3JQYWdlKGFjY2Vzcywgc2VsZWN0ZWREYXRhLCBmb3JtT2JqLCB2YWx1ZSwgcGFnZURhdGEpO1xyXG4gICAgICBpZiAoYWNjZXNzLmZpZWxkTGV2ZWxEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMubG9hZEFjY2Vzc0ZvckZpZWxkcyhhY2Nlc3MsIHNlbGVjdGVkRGF0YSwgZm9ybU9iaiwgdmFsdWUsIHNlbGVjdGVkRmllbGREYXRhLCBwYWdlRGF0YSk7XHJcbiAgICAgIH1cclxuICAgICAgZnVsbEFycmF5LnB1c2goZm9ybU9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZ1bGxBcnJheTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHdoZW4gdXNlciBzZWxlY3RlZCBQZXJzb25hXHJcbiAgICogQHBhcmFtIGFjY2VzcyBSYXcgdmFsdXIgb2YgUkJhYyBmb3JtXHJcbiAgICogQHJldHVybnMgZm9ybSBhcnJheSBvZiBEQVxyXG4gICAqIEBjaGlsZEZ1bmN0aW9uIG9mIHNhdmVSYmFjXHJcbiAgICovXHJcbiAgYWNjZXNzQnlQZXJzb25hKGFjY2VzcywgcGVyc29uYUlkLCBpZCwgcm9sZUFkZGVkRGF0YSwgc2VsZWN0ZWRGaWVsZERhdGEsIHBhZ2VEYXRhKSB7XHJcbiAgICBjb25zdCBmdWxsQXJyYXkgPSBbXTtcclxuICAgIC8vIGNvbnN0IHBlcnNvbmFJZCA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlaWQnKS52YWx1ZTtcclxuICAgIC8vIGNvbnN0IHBlcnNvbmFJZCA9IHRoaXMucmJhY0Zvcm0uZ2V0KCdyb2xlaWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IGZvcm1PYmogPSB7XHJcbiAgICAgIGlkOiAnJyxcclxuICAgICAgcm9sZWtleTogJycsXHJcbiAgICAgIHJvbGVuYW1lOiAnJyxcclxuICAgICAgZGVzY3JpcHRpb246ICcnLFxyXG4gICAgICBlZmZlY3RpdmVkYXRlOiAnJyxcclxuICAgICAgcGFnZUNvbmZpZ3M6IFtdLFxyXG4gICAgICBhc3NldENvbmZpZ3M6IFtdLFxyXG4gICAgICByb2xlUG9saWN5R3JvdXBDb25maWdzOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcGVyc29uYUlkKSB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IHJvbGVBZGRlZERhdGEuZmlsdGVyKGtleSA9PiBrZXkuaWQgPT09IGl0ZW0pO1xyXG4gICAgICB0aGlzLnNldFJvbGVPYmooZm9ybU9iaiwgc2VsZWN0ZWREYXRhLCBpdGVtLCBpZCk7XHJcbiAgICAgIHRoaXMubG9hZEFjY2Vzc0ZvclBhZ2UoYWNjZXNzLCBzZWxlY3RlZERhdGEsIGZvcm1PYmosIGl0ZW0sIHBhZ2VEYXRhKTtcclxuICAgICAgaWYgKGFjY2Vzcy5maWVsZExldmVsRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLmxvYWRBY2Nlc3NGb3JGaWVsZHMoYWNjZXNzLCBzZWxlY3RlZERhdGEsIGZvcm1PYmosIGl0ZW0sIHNlbGVjdGVkRmllbGREYXRhLCBwYWdlRGF0YSk7XHJcbiAgICAgIH1cclxuICAgICAgZnVsbEFycmF5LnB1c2goZm9ybU9iaik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVsbEFycmF5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogd2hlbiB1c2VyIHNlbGVjdGVkIFVzZXJcclxuICAgKiBAcGFyYW0gYWNjZXNzIFJhdyB2YWx1ciBvZiBSQmFjIGZvcm1cclxuICAgKiBAcmV0dXJucyBmb3JtIGFycmF5IG9mIERBXHJcbiAgICogQGNoaWxkRnVuY3Rpb24gb2Ygc2F2ZVJiYWNcclxuICAgKi9cclxuICBhY2Nlc3NCeVVzZXIoYWNjZXNzLCB1c2VySWQsIGlkLCByb2xlaWRzLCB1c2VyTGlzdCwgc2VsZWN0ZWRGaWVsZERhdGEsIHBhZ2VEYXRhKSB7XHJcbiAgICBjb25zdCBmdWxsQXJyYXkgPSBbXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdXNlcklkKSB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkRGF0YSA9IHVzZXJMaXN0LmZpbHRlcihrZXkgPT4ga2V5LmlkID09PSBpdGVtKTtcclxuICAgICAgY29uc3QgZm9ybU9iaiA9IHsgLi4uc2VsZWN0ZWREYXRhWzBdIH07XHJcbiAgICAgIGZvcm1PYmoucGFnZUNvbmZpZ3MgPSBbXTtcclxuICAgICAgZm9ybU9iai5hc3NldENvbmZpZ3MgPSBbXTtcclxuICAgICAgZm9ybU9iai5wb2xpY3lHcm91cENvbmZpZ3MgPSBbXTtcclxuICAgICAgZm9ybU9iai5yb2xlQ29uZmlncyA9IFtdO1xyXG4gICAgICBjb25zb2xlLmxvZygnPT09PT09Jyk7XHJcbiAgICAgIHRoaXMuc2V0VXNlck9iaihmb3JtT2JqLCBzZWxlY3RlZERhdGEsIGl0ZW0sIGlkLCByb2xlaWRzKTtcclxuICAgICAgY29uc29sZS5sb2coJz09PT09PTEnKTtcclxuICAgICAgdGhpcy5sb2FkQWNjZXNzRm9yUGFnZShhY2Nlc3MsIHNlbGVjdGVkRGF0YSwgZm9ybU9iaiwgaXRlbSwgcGFnZURhdGEpO1xyXG4gICAgICBjb25zb2xlLmxvZygnPT09PT09MicpO1xyXG4gICAgICBpZiAoYWNjZXNzLmZpZWxkTGV2ZWxEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgIHRoaXMubG9hZEFjY2Vzc0ZvckZpZWxkcyhhY2Nlc3MsIHNlbGVjdGVkRGF0YSwgZm9ybU9iaiwgaXRlbSwgc2VsZWN0ZWRGaWVsZERhdGEsIHBhZ2VEYXRhKTtcclxuICAgICAgfVxyXG4gICAgICBmdWxsQXJyYXkucHVzaChmb3JtT2JqKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZnVsbEFycmF5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggYWNjZXNzIGxpc3QgZm9yIGRhc2hib2FyZCBhY2Nlc3NcclxuICAgKiBAcGFyYW0gYWNjZXNzXHJcbiAgICogQHBhcmFtIGFzc2V0RGFzaEJvYXJkQ29uZmlnc1xyXG4gICAqIEBwYXJhbSBmb3JtT2JqXHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICovXHJcbiAgbG9hZEFjY2Vzc0ZvclBhZ2UoYWNjZXNzLCBzZWxlY3RlZERhdGEsIGZvcm1PYmosIGlkLCBwYWdlRGF0YSkge1xyXG4gICAgY29uc3QgZXhpc3RQYWdlQ29uZmlncyA9IHNlbGVjdGVkRGF0YVswXVsncGFnZUNvbmZpZ3MnXTtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhY2Nlc3MucGFnZUxldmVsRGF0YSkge1xyXG4gICAgICBjb25zdCBzZWxlY3RlZE1vZHVsZSA9IHBhZ2VEYXRhLmZpbHRlcihrZXkgPT4ga2V5LmlkID09PSBpdGVtWydwYWdlaWQnXSk7XHJcbiAgICAgIGNvbnN0IHBhZ2VBY2Nlc3MgPSBhY2Nlc3MucGFnZUxldmVsRGF0YS5maWx0ZXIoa2V5ID0+IGtleS5wYWdlaWQgPT09IGl0ZW1bJ3BhZ2VpZCddKTtcclxuICAgICAgdGhpcy5wYWdlQWNjZXNzQ2hlY2socGFnZUFjY2Vzcyk7XHJcbiAgICAgIGNvbnN0IHBhZ2VLZXkgPSB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgaXNhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgaXNmdWxsOiB0aGlzLmlzZnVsbCxcclxuICAgICAgICBpc2hpZGU6IHRoaXMuaXNoaWRlLFxyXG4gICAgICAgIGlzcmVhZDogdGhpcy5pc3JlYWQsXHJcbiAgICAgICAgaXNyZWFkd3JpdGU6IHRoaXMuaXNyZWFkd3JpdGUsXHJcbiAgICAgICAgcGFnZWlkOiBpdGVtWydwYWdlaWQnXSxcclxuICAgICAgICBwb2xpY3lncm91cGlkOiBpZCxcclxuICAgICAgICBtb2R1bGVrZXk6IHNlbGVjdGVkTW9kdWxlWzBdWydtb2R1bGVrZXknXSxcclxuICAgICAgICBzdWJtb2R1bGVrZXk6IHNlbGVjdGVkTW9kdWxlWzBdWydzdWJtb2R1bGVrZXknXVxyXG4gICAgICB9O1xyXG4gICAgICAvLyBjaGVjayBleGlzdCBwYWdlIGxlbmd0aFxyXG4gICAgICBpZiAoZXhpc3RQYWdlQ29uZmlncy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBleGlzdElkcyA9IGV4aXN0UGFnZUNvbmZpZ3MubWFwKHAgPT4gcC5wYWdlaWQpO1xyXG4gICAgICAgIGNvbnN0IGNoa1BhZ2UgPSBleGlzdElkcy5pbmNsdWRlcyhpdGVtWydwYWdlaWQnXSk7XHJcbiAgICAgICAgaWYgKGNoa1BhZ2UpIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gZXhpc3RJZHMuaW5kZXhPZihpdGVtWydwYWdlaWQnXSk7XHJcbiAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAvL2lmIGZvdW5kXHJcbiAgICAgICAgICAgIHBhZ2VLZXkuaWQgPSBleGlzdFBhZ2VDb25maWdzW2luZGV4XVsnaWQnXTtcclxuICAgICAgICAgICAgcGFnZUtleS5pc2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3JtT2JqLnBhZ2VDb25maWdzLnB1c2gocGFnZUtleSk7XHJcbiAgICAgICAgICAgIGV4aXN0UGFnZUNvbmZpZ3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZCA9IHsgLi4ucGFnZUtleSB9O1xyXG4gICAgICAgIGQuaWQgPSBudWxsO1xyXG4gICAgICAgIGQuaXNhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGZvcm1PYmoucGFnZUNvbmZpZ3MucHVzaChkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmb3JtT2JqLnBhZ2VDb25maWdzLnB1c2gocGFnZUtleSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIHN0aWxsIGV4aXN0Y29uZmlnIGxlbmd0aFxyXG4gICAgaWYgKGV4aXN0UGFnZUNvbmZpZ3MubGVuZ3RoKSB7XHJcbiAgICAgIGV4aXN0UGFnZUNvbmZpZ3MubWFwKHQgPT4ge1xyXG4gICAgICAgIHQuaXNhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3JtT2JqLnBhZ2VDb25maWdzLnB1c2godCk7XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICBwYWdlQWNjZXNzQ2hlY2socGFnZUFjY2Vzcykge1xyXG4gICAgaWYgKHBhZ2VBY2Nlc3NbMF0ucGFnZUFjY2VzcyA9PT0gJzEnKSB7XHJcbiAgICAgIHRoaXMuaXNmdWxsID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocGFnZUFjY2Vzc1swXS5wYWdlQWNjZXNzID09PSAnNCcpIHtcclxuICAgICAgdGhpcy5pc2hpZGUgPSB0cnVlO1xyXG4gICAgfSBlbHNlIGlmIChwYWdlQWNjZXNzWzBdLnBhZ2VBY2Nlc3MgPT09ICczJykge1xyXG4gICAgICB0aGlzLmlzcmVhZCA9IHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKHBhZ2VBY2Nlc3NbMF0ucGFnZUFjY2VzcyA9PT0gJzInKSB7XHJcbiAgICAgIHRoaXMuaXNyZWFkd3JpdGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRQb2xpY3lPYmooZm9ybU9iaiwgc2VsZWN0ZWREYXRhLCBpZCkge1xyXG4gICAgZm9ybU9iai5pZCA9IGlkO1xyXG4gICAgZm9ybU9iai5kZXNjcmlwdGlvbiA9IHNlbGVjdGVkRGF0YVswXVsnZGVzY3JpcHRpb24nXTtcclxuICAgIGZvcm1PYmoucG9saWN5Z3JvdXBuYW1lID0gc2VsZWN0ZWREYXRhWzBdWydwb2xpY3lncm91cG5hbWUnXTtcclxuICB9XHJcblxyXG4gIGxvYWRBY2Nlc3NGb3JGaWVsZHMoYWNjZXNzLCBzZWxlY3RlZERhdGEsIGZvcm1PYmosIGlkLCBzZWxlY3RlZEZpZWxkRGF0YSwgcGFnZURhdGEpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkRGF0YSlcclxuICAgIGNvbnN0IGFzc2V0Q29uZmlncyA9IHNlbGVjdGVkRGF0YVswXVsnYXNzZXRDb25maWdzJ10uZmlsdGVyKGtleSA9PiBrZXkubW9kdWxla2V5ICE9PSBudWxsKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0nKVxyXG4gICAgY29uc3Qgc2VsZWN0ZWRNb2R1bGUgPSBwYWdlRGF0YS5maWx0ZXIoa2V5ID0+IGtleS5pZCA9PT0gYWNjZXNzLmZwYWdlc1swXVsnaWQnXSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhhY2Nlc3MuZmllbGRMZXZlbERhdGEpXHJcbiAgICBzZWxlY3RlZEZpZWxkRGF0YSA9XHJcbiAgICAgIGFjY2Vzcy5maWVsZExldmVsRGF0YSAhPT0gbnVsbCA/IHRoaXMuc2V0U2VsZWN0ZWRGaWVsZFBhZ2UoYWNjZXNzLmZpZWxkTGV2ZWxEYXRhLCBzZWxlY3RlZEZpZWxkRGF0YSkgOiBbXTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHNlbGVjdGVkRGF0YSwgYXNzZXRDb25maWdzKVxyXG4gICAgZm9yIChjb25zdCBzZWxlY3RlZEZpZWxkIG9mIHNlbGVjdGVkRmllbGREYXRhKSB7XHJcbiAgICAgIGlmIChzZWxlY3RlZEZpZWxkLmFjY2VzcyA9PT0gbnVsbCkge1xyXG4gICAgICAgIC8vIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkRmllbGQpO1xyXG4gICAgICBsZXQgaXNmdWxsID0gZmFsc2U7XHJcbiAgICAgIGxldCBpc2hpZGUgPSBmYWxzZTtcclxuICAgICAgbGV0IGlzcmVhZCA9IGZhbHNlO1xyXG4gICAgICBsZXQgaXNyZWFkd3JpdGUgPSBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChzZWxlY3RlZEZpZWxkLmFjY2VzcyA9PT0gJzInIHx8IHNlbGVjdGVkRmllbGQuYWNjZXNzID09PSAnMScpIHtcclxuICAgICAgICBpc2Z1bGwgPSB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkRmllbGQuYWNjZXNzID09PSAnNCcpIHtcclxuICAgICAgICBpc2hpZGUgPSB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkRmllbGQuYWNjZXNzID09PSAnMycpIHtcclxuICAgICAgICBpc3JlYWQgPSB0cnVlO1xyXG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkRmllbGQuYWNjZXNzID09PSAnMicpIHtcclxuICAgICAgICBpc3JlYWR3cml0ZSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgYUNvbmZpZ3MgPSB7XHJcbiAgICAgICAgaWQ6IHNlbGVjdGVkRmllbGRbJ2lkJ10gPyBzZWxlY3RlZEZpZWxkWydpZCddIDogbnVsbCxcclxuICAgICAgICBpc2FjdGl2ZTogdHJ1ZSxcclxuICAgICAgICBpc2Z1bGw6IGlzZnVsbCxcclxuICAgICAgICBpc2hpZGU6IGlzaGlkZSxcclxuICAgICAgICBpc3JlYWQ6IGlzcmVhZCxcclxuICAgICAgICBpc3JlYWR3cml0ZTogaXNyZWFkd3JpdGUsXHJcbiAgICAgICAgYXNzZXRpZDogc2VsZWN0ZWRGaWVsZFsnYXNzZXRpZCddLFxyXG4gICAgICAgIHBvbGljeWdyb3VwaWQ6IGlkLFxyXG4gICAgICAgIHBhZ2VpZDogc2VsZWN0ZWRGaWVsZFsncGFnZUlkJ10gPyBzZWxlY3RlZEZpZWxkWydwYWdlSWQnXSA6IGFjY2Vzcy5mcGFnZXNbMF1bJ2lkJ10sXHJcbiAgICAgICAgbW9kdWxla2V5OiBzZWxlY3RlZE1vZHVsZVswXVsnbW9kdWxla2V5J10sXHJcbiAgICAgICAgc3VibW9kdWxla2V5OiBzZWxlY3RlZE1vZHVsZVswXVsnc3VibW9kdWxla2V5J11cclxuICAgICAgfTtcclxuICAgICAgLy8gY2hlY2sgZXhpc3QgcGFnZSBsZW5ndGhcclxuICAgICAgdGhpcy5jaGVja0V4aXN0QXNzZXQoYXNzZXRDb25maWdzLCBzZWxlY3RlZEZpZWxkLCBhQ29uZmlncywgZm9ybU9iaik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNoZWNrRXhpc3RBc3NldChhc3NldENvbmZpZ3MsIHNlbGVjdGVkRmllbGQsIGFDb25maWdzLCBmb3JtT2JqKSB7XHJcbiAgICBpZiAoYXNzZXRDb25maWdzLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBleGlzdElkcyA9IGFzc2V0Q29uZmlncy5tYXAocCA9PiBwLmFzc2V0aWQpO1xyXG4gICAgICBjb25zdCBjaGtQYWdlID0gZXhpc3RJZHMuaW5jbHVkZXMoc2VsZWN0ZWRGaWVsZFsnYXNzZXRpZCddKTtcclxuICAgICAgaWYgKGNoa1BhZ2UpIHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IGV4aXN0SWRzLmluZGV4T2Yoc2VsZWN0ZWRGaWVsZFsnYXNzZXRpZCddKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgLy9pZiBmb3VuZFxyXG4gICAgICAgICAgYUNvbmZpZ3MuaWQgPSBhc3NldENvbmZpZ3NbaW5kZXhdWydpZCddO1xyXG4gICAgICAgICAgYUNvbmZpZ3MuaXNhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIGZvcm1PYmouYXNzZXRDb25maWdzLnB1c2goYUNvbmZpZ3MpO1xyXG4gICAgICAgICAgYXNzZXRDb25maWdzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGQgPSB7IC4uLmFDb25maWdzIH07XHJcbiAgICAgIGQuaXNhY3RpdmUgPSB0cnVlO1xyXG4gICAgICBkLmlkID0gbnVsbDtcclxuICAgICAgZm9ybU9iai5hc3NldENvbmZpZ3MucHVzaChkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvcm1PYmouYXNzZXRDb25maWdzLnB1c2goYUNvbmZpZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0Um9sZU9iaihmb3JtT2JqLCBzZWxlY3RlZERhdGEsIHJvbGVpZCwgcG9saWN5aWQpIHtcclxuICAgIGZvcm1PYmouaWQgPSByb2xlaWQ7XHJcbiAgICBmb3JtT2JqLnJvbGVrZXkgPSBzZWxlY3RlZERhdGFbMF1bJ3JvbGVrZXknXTtcclxuICAgIGZvcm1PYmoucm9sZW5hbWUgPSBzZWxlY3RlZERhdGFbMF1bJ3JvbGVuYW1lJ107XHJcbiAgICBmb3JtT2JqLmVmZmVjdGl2ZWRhdGUgPSBzZWxlY3RlZERhdGFbMF1bJ2VmZmVjdGl2ZWRhdGUnXTtcclxuICAgIGZvcm1PYmouZGVzY3JpcHRpb24gPSBzZWxlY3RlZERhdGFbMF1bJ2Rlc2NyaXB0aW9uJ107XHJcbiAgICAvLyBsb29wIHRoZSBwb2xpY3kgZ3JvdXBcclxuICAgIGNvbnN0IGlkID0gcG9saWN5aWQ7XHJcbiAgICBjb25zdCBleGlzdFJvbGVQb2xpY3lDb25maWcgPSBzZWxlY3RlZERhdGFbMF1bJ3JvbGVQb2xpY3lHcm91cENvbmZpZ3MnXTtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpZCkge1xyXG4gICAgICBjb25zdCBycG9saWN5Q29uZmlnID0ge1xyXG4gICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgIGlzYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIHBvbGljeWdyb3VwaWQ6IGl0ZW0sIC8vIGdyb3VwIHBvbGljeSBpZFxyXG4gICAgICAgIHJvbGVpZDogcm9sZWlkIC8vIHJvbGUgaWRcclxuICAgICAgfTtcclxuICAgICAgLy8gY2hlY2sgZXhpc3QgcGFnZSBsZW5ndGhcclxuICAgICAgaWYgKGV4aXN0Um9sZVBvbGljeUNvbmZpZy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBleGlzdElkcyA9IGV4aXN0Um9sZVBvbGljeUNvbmZpZy5tYXAocCA9PiBwLnBvbGljeWdyb3VwaWQpO1xyXG4gICAgICAgIGNvbnN0IGNoa1BhZ2UgPSBleGlzdElkcy5pbmNsdWRlcyhpdGVtKTtcclxuICAgICAgICBpZiAoY2hrUGFnZSkge1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSBleGlzdElkcy5pbmRleE9mKGl0ZW0pO1xyXG4gICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgLy9pZiBmb3VuZFxyXG4gICAgICAgICAgICBycG9saWN5Q29uZmlnLmlkID0gZXhpc3RSb2xlUG9saWN5Q29uZmlnW2luZGV4XVsnaWQnXTtcclxuICAgICAgICAgICAgZXhpc3RSb2xlUG9saWN5Q29uZmlnLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGZvcm1PYmoucm9sZVBvbGljeUdyb3VwQ29uZmlncy5wdXNoKHJwb2xpY3lDb25maWcpO1xyXG4gICAgfVxyXG4gICAgLy8gc3RpbGwgZXhpc3Rjb25maWcgbGVuZ3RoXHJcbiAgICBpZiAoZXhpc3RSb2xlUG9saWN5Q29uZmlnLmxlbmd0aCkge1xyXG4gICAgICBleGlzdFJvbGVQb2xpY3lDb25maWcubWFwKHQgPT4ge1xyXG4gICAgICAgIHQuaXNhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3JtT2JqLnJvbGVQb2xpY3lHcm91cENvbmZpZ3MucHVzaCh0KTtcclxuICAgICAgICByZXR1cm4gdDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRVc2VyT2JqKGZvcm1PYmosIHNlbGVjdGVkRGF0YSwgdXNlcklkLCBpZCwgcm9sZWlkcykge1xyXG4gICAgLy8gbG9vcCB0aGUgcG9saWN5IGdyb3VwXHJcbiAgICBjb25zdCBleGlzdFJvbGVQb2xpY3lDb25maWcgPSBzZWxlY3RlZERhdGFbMF1bJ3BvbGljeUdyb3VwQ29uZmlncyddO1xyXG4gICAgdGhpcy5nZXRDaGVja1BvbGljeUNvbmZpZyhpZCwgdXNlcklkLCBleGlzdFJvbGVQb2xpY3lDb25maWcsIGZvcm1PYmopO1xyXG4gICAgLy8gc3RpbGwgZXhpc3Rjb25maWcgbGVuZ3RoXHJcbiAgICBpZiAoZXhpc3RSb2xlUG9saWN5Q29uZmlnLmxlbmd0aCkge1xyXG4gICAgICBleGlzdFJvbGVQb2xpY3lDb25maWcubWFwKHQgPT4ge1xyXG4gICAgICAgIHQuaXNhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3JtT2JqLnBvbGljeUdyb3VwQ29uZmlncy5wdXNoKHQpO1xyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGxvb3AgdGhlIHJvbGUgZ3JvdXBcclxuICAgIC8vIGNvbnN0IHJvbGVpZHMgPSB0aGlzLnJiYWNGb3JtLmdldCgncm9sZWlkJykudmFsdWU7XHJcbiAgICBjb25zdCBleGlzdFJvbGVJZCA9IHNlbGVjdGVkRGF0YVswXVsncm9sZUNvbmZpZ3MnXTtcclxuICAgIGZvciAoY29uc3Qgcm9sZSBvZiBleGlzdFJvbGVJZCkge1xyXG4gICAgICBjb25zdCBjaGtSb2xlRGF0YSA9IHJvbGVpZHMuaW5jbHVkZXMocm9sZVsncm9sZWlkJ10pO1xyXG4gICAgICBjb25zdCByb2xlR3JwID0ge1xyXG4gICAgICAgIGlkOiByb2xlWydpZCddLFxyXG4gICAgICAgIGlzYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICBpc2RlZmF1bHRyb2xlOiByb2xlWydpc2RlZmF1bHRyb2xlJ10sXHJcbiAgICAgICAgdXNlcmlkOiB1c2VySWQsXHJcbiAgICAgICAgcm9sZWlkOiByb2xlWydyb2xlaWQnXSxcclxuICAgICAgICBlZmZlY3RpdmVkYXRlOiByb2xlWydlZmZlY3RpdmVkYXRlJ11cclxuICAgICAgfTtcclxuICAgICAgaWYgKGNoa1JvbGVEYXRhKSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXgxID0gcm9sZWlkcy5pbmRleE9mKHJvbGVbJ3JvbGVpZCddKTtcclxuICAgICAgICBpZiAoaW5kZXgxID4gLTEpIHtcclxuICAgICAgICAgIC8vaWYgZm91bmRcclxuICAgICAgICAgIHJvbGVpZHMuc3BsaWNlKGluZGV4MSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJvbGVHcnAuaXNhY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcm1PYmoucm9sZUNvbmZpZ3MucHVzaChyb2xlR3JwKTtcclxuICAgIH1cclxuICAgIC8vIGNoZWNrIG5ldyByb2xlcyBncm91cCBpZHNcclxuICAgIGlmIChyb2xlaWRzLmxlbmd0aCkge1xyXG4gICAgICBmb3IgKGNvbnN0IHJvbGVJZCBvZiByb2xlaWRzKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZUdycCA9IHtcclxuICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgaXNhY3RpdmU6IHRydWUsXHJcbiAgICAgICAgICBpc2RlZmF1bHRyb2xlOiBmYWxzZSxcclxuICAgICAgICAgIHVzZXJpZDogdXNlcklkLFxyXG4gICAgICAgICAgcm9sZWlkOiByb2xlSWQsXHJcbiAgICAgICAgICBlZmZlY3RpdmVkYXRlOiBuZXcgRGF0ZSgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3JtT2JqLnJvbGVDb25maWdzLnB1c2gocm9sZUdycCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0Q2hlY2tQb2xpY3lDb25maWcoaWQsIHVzZXJJZCwgZXhpc3RSb2xlUG9saWN5Q29uZmlnLCBmb3JtT2JqKSB7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaWQpIHtcclxuICAgICAgY29uc3QgcnBvbGljeUNvbmZpZyA9IHtcclxuICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICBpc2FjdGl2ZTogdHJ1ZSxcclxuICAgICAgICBwb2xpY3lncm91cGlkOiBpdGVtLCAvLyBncm91cCBwb2xpY3kgaWRcclxuICAgICAgICB1c2VyaWQ6IHVzZXJJZCAvLyB1c2VyIGlkXHJcbiAgICAgIH07XHJcbiAgICAgIC8vIGNoZWNrIGV4aXN0IHBhZ2UgbGVuZ3RoXHJcbiAgICAgIGlmIChleGlzdFJvbGVQb2xpY3lDb25maWcubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgZXhpc3RJZHMgPSBleGlzdFJvbGVQb2xpY3lDb25maWcubWFwKHAgPT4gcC5wb2xpY3lncm91cGlkKTtcclxuICAgICAgICBjb25zdCBjaGtQYWdlID0gZXhpc3RJZHMuaW5jbHVkZXMoaXRlbSk7XHJcbiAgICAgICAgaWYgKGNoa1BhZ2UpIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gZXhpc3RJZHMuaW5kZXhPZihpdGVtKTtcclxuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIC8vaWYgZm91bmRcclxuICAgICAgICAgICAgcnBvbGljeUNvbmZpZy5pZCA9IGV4aXN0Um9sZVBvbGljeUNvbmZpZ1tpbmRleF1bJ2lkJ107XHJcbiAgICAgICAgICAgIGV4aXN0Um9sZVBvbGljeUNvbmZpZy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmb3JtT2JqLnBvbGljeUdyb3VwQ29uZmlncy5wdXNoKHJwb2xpY3lDb25maWcpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRTZWxlY3RlZEZpZWxkUGFnZSh1cGRhdGVBcnJheSwgc2VsZWN0ZWRGaWVsZERhdGEpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCc9PT09PT09PT0+JywgdXBkYXRlQXJyYXksIHNlbGVjdGVkRmllbGREYXRhKVxyXG4gICAgaWYgKHVwZGF0ZUFycmF5Py5sZW5ndGgpIHtcclxuICAgICAgaWYgKHNlbGVjdGVkRmllbGREYXRhPy5sZW5ndGggPj0gdXBkYXRlQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRGaWVsZERhdGEgPSB0aGlzLnVwZGF0ZUR1cGxpY2F0ZXNpbkFycmF5KFsuLi5zZWxlY3RlZEZpZWxkRGF0YV0sIFsuLi51cGRhdGVBcnJheV0pO1xyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZEZpZWxkRGF0YTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxlY3RlZEZpZWxkRGF0YSA9IFsuLi51cGRhdGVBcnJheV07XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkRmllbGREYXRhO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZUR1cGxpY2F0ZXNpbkFycmF5KG9yaWdBcnI6IGFueVtdLCB1cGRhdGluZ0FycjogYW55W10pOiBhbnlbXSB7XHJcbiAgICBjb25zdCB1cGRhdGluZ0FycmlkcyA9IG5ldyBTZXQodXBkYXRpbmdBcnIubWFwKGVsZSA9PiBlbGUuYXNzZXRpZCkpO1xyXG4gICAgcmV0dXJuIFsuLi51cGRhdGluZ0FyciwgLi4ub3JpZ0Fyci5maWx0ZXIoZWxlID0+ICF1cGRhdGluZ0Fycmlkcy5oYXMoZWxlLmFzc2V0aWQpKV07XHJcbiAgfVxyXG4gIGdldE1vc3RGcmVxdWVudEVsZShhcnIpIHtcclxuICAgIGNvbnN0IGhhc2hNYXAgPSBhcnIucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xyXG4gICAgICBhY2NbU3RyaW5nKHZhbCldID0gKGFjY1t2YWxdIHx8IDApICsgMTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhoYXNoTWFwKS5yZWR1Y2UoKGEsIGIpID0+IChoYXNoTWFwW2FdID4gaGFzaE1hcFtiXSA/IGEgOiBiKSk7XHJcbiAgfVxyXG4gIGdldEFjY2Vzc0FycmF5T25DbGljayhwYWdlc0Zyb21GaWVsZCwgcGFnZURhdGEsIHNlbGVjdGVkRmllbGREYXRhLCBzYXZlZFBhZ2VBY2Nlc3NQYXRjaGluZywgZXhpc3RpbmdWYWx1ZSkge1xyXG4gICAgY29uc3QgcGFnZUFjY2Vzc1ZhbHVlID0gbnVsbDtcclxuICAgIGNvbnN0IGFjY2Vzc0FycmF5OiBhbnkgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZXNGcm9tRmllbGQ/Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHBhZ2VOYW1lID0gcGFnZURhdGEuZmlsdGVyKGtleSA9PiBrZXkuaWQgPT09IHBhZ2VzRnJvbUZpZWxkW2ldKTtcclxuICAgICAgY29uc3QgZmllbGRMZXZlbEV4aXN0ID0gc2VsZWN0ZWRGaWVsZERhdGEuZmlsdGVyKGVsZSA9PiBlbGUucGFnZUlkID09IHBhZ2VzRnJvbUZpZWxkW2ldKTtcclxuICAgICAgdGhpcy5jaGVja0ZpZWxkTGV2ZWxFeGlzdChcclxuICAgICAgICBmaWVsZExldmVsRXhpc3QsXHJcbiAgICAgICAgc2F2ZWRQYWdlQWNjZXNzUGF0Y2hpbmcsXHJcbiAgICAgICAgcGFnZUFjY2Vzc1ZhbHVlLFxyXG4gICAgICAgIHBhZ2VzRnJvbUZpZWxkLFxyXG4gICAgICAgIGV4aXN0aW5nVmFsdWUsXHJcbiAgICAgICAgaVxyXG4gICAgICApO1xyXG4gICAgICBhY2Nlc3NBcnJheS5wdXNoKFxyXG4gICAgICAgIG5ldyBGb3JtR3JvdXAoe1xyXG4gICAgICAgICAgcGFnZU5hbWU6IG5ldyBGb3JtQ29udHJvbChwYWdlTmFtZVswXVsncGFnZW5hbWUnXSksXHJcbiAgICAgICAgICBwYWdlaWQ6IG5ldyBGb3JtQ29udHJvbChwYWdlc0Zyb21GaWVsZFtpXSksXHJcbiAgICAgICAgICBwYWdlQWNjZXNzOiBuZXcgRm9ybUNvbnRyb2wocGFnZUFjY2Vzc1ZhbHVlID8gcGFnZUFjY2Vzc1ZhbHVlIDogJzInKSxcclxuICAgICAgICAgIHZhbGlkaXR5OiBuZXcgRm9ybUNvbnRyb2woKGV4aXN0aW5nVmFsdWVbaV0/LnZhbGlkaXR5ICYmIFN0cmluZyhleGlzdGluZ1ZhbHVlW2ldLnZhbGlkaXR5KSkgfHwgJzAnKSxcclxuICAgICAgICAgIGNvbmRpdGlvbjogbmV3IEZvcm1Db250cm9sKChleGlzdGluZ1ZhbHVlW2ldPy5jb25kaXRpb24gJiYgZXhpc3RpbmdWYWx1ZVtpXS5jb25kaXRpb24pIHx8ICdhbHdheXMnKSxcclxuICAgICAgICAgIGZhbGxiYWNrVG86IG5ldyBGb3JtQ29udHJvbCgoZXhpc3RpbmdWYWx1ZVtpXT8uY29uZGl0aW9uICYmIGV4aXN0aW5nVmFsdWVbaV0uZmFsbGJhY2tUbykgfHwgJ24nKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjZXNzQXJyYXk7XHJcbiAgfVxyXG5cclxuICBjaGVja0ZpZWxkTGV2ZWxFeGlzdChmaWVsZExldmVsRXhpc3QsIHNhdmVkUGFnZUFjY2Vzc1BhdGNoaW5nLCBfcGFnZUFjY2Vzc1ZhbHVlLCBwYWdlc0Zyb21GaWVsZCwgZXhpc3RpbmdWYWx1ZSwgaSkge1xyXG4gICAgaWYgKGZpZWxkTGV2ZWxFeGlzdD8ubGVuZ3RoICYmIHNhdmVkUGFnZUFjY2Vzc1BhdGNoaW5nKSB7XHJcbiAgICAgIF9wYWdlQWNjZXNzVmFsdWUgPSB0aGlzLmdldE1vc3RGcmVxdWVudEVsZShcclxuICAgICAgICBmaWVsZExldmVsRXhpc3Q/LmZpbHRlcihlbGUgPT4gKGVsZS5wYWdlSWQgPSBwYWdlc0Zyb21GaWVsZFtpXSkpPy5tYXAoZSA9PiAoZS5hY2Nlc3MgPyBOdW1iZXIoZS5hY2Nlc3MpIDogMCkpXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBfcGFnZUFjY2Vzc1ZhbHVlID0gZXhpc3RpbmdWYWx1ZT8uZmluZChlbGUgPT4gZWxlLnBhZ2VpZCA9PT0gcGFnZXNGcm9tRmllbGRbaV0pPy5wYWdlQWNjZXNzO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRBY2Nlc3MoYWNjZXNzKSB7XHJcbiAgICBsZXQgYWNjZXNzRmllbGQ6IGFueTtcclxuICAgIGFjY2Vzc0ZpZWxkID0gJzInO1xyXG4gICAgaWYgKGFjY2Vzcz8uaXNyZWFkd3JpdGUpIHtcclxuICAgICAgYWNjZXNzRmllbGQgPSAnMic7XHJcbiAgICB9IGVsc2UgaWYgKGFjY2Vzcz8uaXNoaWRlKSB7XHJcbiAgICAgIGFjY2Vzc0ZpZWxkID0gJzQnO1xyXG4gICAgfSBlbHNlIGlmIChhY2Nlc3M/LmlzcmVhZCkge1xyXG4gICAgICBhY2Nlc3NGaWVsZCA9ICczJztcclxuICAgIH0gZWxzZSBpZiAoYWNjZXNzPy5pc2Z1bGwpIHtcclxuICAgICAgYWNjZXNzRmllbGQgPSAnNSc7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjZXNzRmllbGQ7XHJcbiAgfVxyXG5cclxuICBnZXRPcmdhbml6YXRpb25QYWdlKG9yZ0lkOiBhbnkpIHtcclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLmdldChBY2Nlc3NNYW5hZ2VtZW50Q29uZmlnLkVuZFBvaW50Lk9yZ2FuaXphdGlvbi5nZXRPcmdhbml6YXRpb24ucmVwbGFjZSgne29yZ0lkfScsIG9yZ0lkKSk7XHJcbiAgfVxyXG5cclxuICBnZXRBc3NldEJ5UGFnZUlkKHBJZDogYW55KSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoYCR7QWNjZXNzTWFuYWdlbWVudENvbmZpZy5FbmRQb2ludC5Bc3NldC5nZXRQYWdlQXNzZXR9LyR7cElkfWApO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQXNzZXQoc2VsZWN0ZWRBY2Nlc3M6IGFueSwgc2VsZWN0ZWRJZDogYW55LCBhc3NldDogYW55KSB7XHJcbiAgICBsZXQgdXJsOiBhbnk7XHJcbiAgICBpZiAoc2VsZWN0ZWRBY2Nlc3MgPT09ICd1c2VyJykge1xyXG4gICAgICB1cmwgPSBgb3JnL3VzZXIvJHtzZWxlY3RlZElkfWA7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkQWNjZXNzID09PSAncm9sZScpIHtcclxuICAgICAgdXJsID0gYGFjY2Vzcy1jb250cm9sL3JvbGUvJHtzZWxlY3RlZElkfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB1cmwgPSBgcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9wb2xpY3lncm91cC8ke3NlbGVjdGVkSWR9YDtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnBvc3QoYC8ke3VybH0vJHtBY2Nlc3NNYW5hZ2VtZW50Q29uZmlnLkVuZFBvaW50LkFzc2V0LmdldEFzc2V0fWAsIGFzc2V0KTtcclxuICB9XHJcblxyXG4gIGdldEFzc2V0QnlJZChzZWxlY3RlZEFjY2Vzczogc3RyaW5nLCBzZWxlY3RlZElkOiBhbnkpIHtcclxuICAgIGxldCB1cmw6IGFueTtcclxuICAgIGlmIChzZWxlY3RlZEFjY2VzcyA9PT0gJ3VzZXInKSB7XHJcbiAgICAgIHVybCA9IEFjY2Vzc01hbmFnZW1lbnRDb25maWcuRW5kUG9pbnQuQXNzZXQuZ2V0VXNlckFzc2V0O1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZEFjY2VzcyA9PT0gJ3JvbGUnKSB7XHJcbiAgICAgIHVybCA9IEFjY2Vzc01hbmFnZW1lbnRDb25maWcuRW5kUG9pbnQuQXNzZXQuZ2V0Um9sZUFzc2V0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXJsID0gQWNjZXNzTWFuYWdlbWVudENvbmZpZy5FbmRQb2ludC5Bc3NldC5nZXRQb2xpY3lHcm91cEFzc2V0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KGAke3VybH0vJHtzZWxlY3RlZElkfWApO1xyXG4gIH1cclxuXHJcbiAgZ2V0UG9saWN5R3JvdXBQYWdlKHBvbGljeWdyb3VwaWQ6IGFueSkge1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KGAvcG9saWN5Z3JvdXAvJHtwb2xpY3lncm91cGlkfSR7QWNjZXNzTWFuYWdlbWVudENvbmZpZy5FbmRQb2ludC5QYWdlLmdldFBhZ2V9YCk7XHJcbiAgfVxyXG5cclxuICBnZXREeW5hbWljUGFnZShzZWxlY3RlZEFjY2VzczogYW55LCBzZWxlY3RlZElkOiBhbnkpIHtcclxuICAgIGxldCB1cmw6IGFueTtcclxuICAgIGlmIChzZWxlY3RlZEFjY2VzcyA9PT0gJ3VzZXInKSB7XHJcbiAgICAgIHVybCA9ICdvcmcvdXNlcic7XHJcbiAgICB9IGVsc2UgaWYgKHNlbGVjdGVkQWNjZXNzID09PSAncm9sZScpIHtcclxuICAgICAgdXJsID0gJ2FjY2Vzcy1jb250cm9sL3JvbGUnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdXJsID0gJ3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvcG9saWN5Z3JvdXAnO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UuZ2V0KGAvJHt1cmx9LyR7c2VsZWN0ZWRJZH0ke0FjY2Vzc01hbmFnZW1lbnRDb25maWcuRW5kUG9pbnQuUGFnZS5nZXRQYWdlfWApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlRHluYW1pY1BhZ2Uoc2VsZWN0ZWRBY2Nlc3M6IGFueSwgc2VsZWN0ZWRJZDogYW55LCBwYWdlRGF0YTogYW55KSB7XHJcbiAgICBsZXQgdXJsOiBhbnk7XHJcbiAgICBpZiAoc2VsZWN0ZWRBY2Nlc3MgPT09ICd1c2VyJykge1xyXG4gICAgICB1cmwgPSAnb3JnL3VzZXInO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3RlZEFjY2VzcyA9PT0gJ3JvbGUnKSB7XHJcbiAgICAgIHVybCA9ICdhY2Nlc3MtY29udHJvbC9yb2xlJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHVybCA9ICdwbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL3BvbGljeWdyb3VwJztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmh0dHBTZXJ2aWNlLnB1dChgLyR7dXJsfS8ke3NlbGVjdGVkSWR9JHtBY2Nlc3NNYW5hZ2VtZW50Q29uZmlnLkVuZFBvaW50LlBhZ2UuZ2V0UGFnZX1gLCBwYWdlRGF0YSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVBY2Nlc3MoZmllbGRMZXZlbEFjY2VzczogYm9vbGVhbiwgYWNjZXNzQnk6IHN0cmluZywgcGF5bG9hZDogYW55LCB1c2VySWQ6IGFueSwgcm9sZUlkOiBhbnksIHBvbGljeUlkOiBhbnkpIHtcclxuICAgIGxldCB1cmw6IGFueTtcclxuICAgIGNvbnN0IGNyZWF0ZVVybCA9IGZpZWxkTGV2ZWxBY2Nlc3NcclxuICAgICAgPyBBY2Nlc3NNYW5hZ2VtZW50Q29uZmlnLkVuZFBvaW50LkFzc2V0LmdldEFzc2V0XHJcbiAgICAgIDogQWNjZXNzTWFuYWdlbWVudENvbmZpZy5FbmRQb2ludC5QYWdlLmdldFBhZ2U7XHJcbiAgICAvLyBjaGVjayBvbmx5IHBvbGljeSBncm91cFxyXG4gICAgaWYgKGFjY2Vzc0J5ID09PSAnMycpIHtcclxuICAgICAgdXJsID0gYCR7QWNjZXNzTWFuYWdlbWVudENvbmZpZy5FbmRQb2ludC5Qb2xpY3lHcm91cC5nZXRQb2xpY3lHcm91cH0ke3BvbGljeUlkID8gcG9saWN5SWQgOiAnMCd9JHtjcmVhdGVVcmx9YDtcclxuICAgIH1cclxuICAgIC8vIGNoZWNrIHBlcnNvbmEgd2l0aCBwb2xpY3kgZ3JvdXBcclxuICAgIGlmIChhY2Nlc3NCeSA9PT0gJzInKSB7XHJcbiAgICAgIHVybCA9IGAke0FjY2Vzc01hbmFnZW1lbnRDb25maWcuRW5kUG9pbnQuUm9sZS5nZXRSb2xlfSR7cm9sZUlkID8gcm9sZUlkIDogJzAnfSR7Y3JlYXRlVXJsfWA7XHJcbiAgICB9XHJcbiAgICAvLyBjaGVjayB1c2VyLCBwZXJzb25hIHdpdGggcG9saWN5IGdyb3VwXHJcbiAgICBpZiAoYWNjZXNzQnkgPT09ICcxJykge1xyXG4gICAgICB1cmwgPSBgJHtBY2Nlc3NNYW5hZ2VtZW50Q29uZmlnLkVuZFBvaW50LlVzZXIuZ2V0VXNlcn0ke3VzZXJJZCA/IHVzZXJJZCA6ICcwJ30ke2NyZWF0ZVVybH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaHR0cFNlcnZpY2UucG9zdCh1cmwsIHBheWxvYWQpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QXBwbGljYXRpb25BY2Nlc3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwU2VydmljZS5nZXQoJy9hcHBsaWNhdGlvbmFjY2Vzcy8nKTtcclxuICB9XHJcbn1cclxuIl19