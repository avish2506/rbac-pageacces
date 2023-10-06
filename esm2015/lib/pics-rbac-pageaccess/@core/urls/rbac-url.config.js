export class RoleConfig {
}
RoleConfig.EndPoint = {
    role: {
        getAllUserRole: '/access-control/role',
        createRole: '/access-control/role/create',
        getLandingPage: '/platform/menu/application',
        addPolicyGroup: '/access-control/role',
        getAllOrgRole: '/access-control/role/organization/{orgid}',
        dossier: '/dossier'
    }
};
export class UserConfig {
}
UserConfig.EndPoint = {
    User: {
        getAllUserList: '/org/user',
        getAllUserActiveInactive: '/org/user?includeInactiveUsers=true',
        activateUser: '/org/user/activate',
        createUser: '/org/user/create',
        userRole: '/org/user/role',
        managementgroup: '/org/team/managementgroup',
        getAllUserOrgList: '/org/user/organization/'
    },
    Provider: {
        getProviderList: '/ref/provider',
        searchProviderList: '/ref/provider/search',
        addProviderUser: '/ref/provider/create/account'
    }
};
export class AttachmentConfig {
}
AttachmentConfig.EndPoint = {
    Attachments: {
        GetAttachmentReferral: '/ref/attachment/referral',
        GetCategoryLookup: '/platform/master/lookup/lookupbycategoryname',
        UploadKey: '/common/files/upload-key',
        DownloadKey: '/common/files/download-key',
        PostAttachment: '/ref/attachment/create',
        PutAttachment: '/ref/attachment'
    }
};
export class PolicyGroupConfig {
}
PolicyGroupConfig.EndPoint = {
    policyGroup: {
        getPolicyGroupList: '/platform/page-designer/policyGroup',
        getAllPolicyGroupList: '/platform/page-designer/policyGroup/all',
        createPolicyGroup: '/platform/page-designer/policyGroup',
        getOrgPolicyGroups: '/platform/page-designer/policyGroup/organization/{organizationid}'
    }
};
export class PermissionsURL {
}
PermissionsURL.EndPoints = {
    permission: {
        permissionRoleById: '/access-control/permission/role/{id}',
        pagePermission: '/access-control/permission/page',
        getPermission: '/access-control/permission/{id}',
        createPermission: '/access-control/permission/create',
        updateDeletePermission: '/access-control/permission/{permissionid}',
        getPermissionTree: '/access-control/permission/page/{pageid}/{parentid}',
        getPermissionTypes: '/access-control/permission/type/{applicationid}',
        applicationPermissionsTree: '/access-control/permission/application/{applicationid}'
    },
    page: {
        createPage: '/platform/menu/create',
        updateDeletePage: '/platform/menu/{pageid}',
        AllPageTree: '/platform/menu/tree/{applicationid}'
    }
};
export class AccessManagementConfig {
}
AccessManagementConfig.EndPoint = {
    Organization: {
        getOrganizationList: '/org/organization/all',
        getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
    }
};
// export class AccessManagementConfig {
//   public static EndPoint = {
//     Organization: {
//       getOrganizationList: '/platform/page-designer/page/organization/all',
//       getOrganization:
//         '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
//     },
//     Page: {
//       getPage: '/page'
//     },
//     Asset: {
//       getAsset: 'asset',
//       getPageAsset: '/platform/page-designer/asset/getpagebyid',
//       getUserAsset: '/platform/page-designer/asset/getUserAssets',
//       getRoleAsset: '/platform/page-designer/asset/getRoleAssets',
//       getPolicyGroupAsset: '/platform/page-designer/asset/getPolicyGroupAssets'
//     },
//     User: {
//       getUser: '/org/user/',
//       getUserList: '/org/user/all',
//       getUserorgList: '/org/user/organization/'
//     },
//     PolicyGroup: {
//       getPolicyGroup: '/platform/page-designer/policyGroup/',
//       getPolicyGroupList: '/platform/page-designer/policyGroup/organization/{organizationid}'
//     },
//     Role: {
//       getRole: '/access-control/role/',
//       getRoleList: '/access-control/role/organization/{orgid}'
//     }
//   };
// }
export class RBACINFO {
    constructor() {
        this.apiHost = '';
        this.tokenKey = '';
    }
}
export class Environment {
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy11cmwuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGljcy1jb3JlL3JiYWMtcGFnZWFjY2Vzcy9zcmMvbGliL3BpY3MtcmJhYy1wYWdlYWNjZXNzL0Bjb3JlL3VybHMvcmJhYy11cmwuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxVQUFVOztBQUNQLG1CQUFRLEdBQUc7SUFDdkIsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFFLHNCQUFzQjtRQUN0QyxVQUFVLEVBQUUsNkJBQTZCO1FBQ3pDLGNBQWMsRUFBRSw0QkFBNEI7UUFDNUMsY0FBYyxFQUFFLHNCQUFzQjtRQUN0QyxhQUFhLEVBQUUsMkNBQTJDO1FBQzFELE9BQU8sRUFBRSxVQUFVO0tBQ3BCO0NBQ0YsQ0FBQztBQUdKLE1BQU0sT0FBTyxVQUFVOztBQUNQLG1CQUFRLEdBQUc7SUFDdkIsSUFBSSxFQUFFO1FBQ0osY0FBYyxFQUFFLFdBQVc7UUFDM0Isd0JBQXdCLEVBQUUscUNBQXFDO1FBQy9ELFlBQVksRUFBRSxvQkFBb0I7UUFDbEMsVUFBVSxFQUFFLGtCQUFrQjtRQUM5QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLGVBQWUsRUFBRSwyQkFBMkI7UUFDNUMsaUJBQWlCLEVBQUUseUJBQXlCO0tBQzdDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsZUFBZSxFQUFFLGVBQWU7UUFDaEMsa0JBQWtCLEVBQUUsc0JBQXNCO1FBQzFDLGVBQWUsRUFBRSw4QkFBOEI7S0FDaEQ7Q0FDRixDQUFDO0FBRUosTUFBTSxPQUFPLGdCQUFnQjs7QUFDYix5QkFBUSxHQUFHO0lBQ3ZCLFdBQVcsRUFBRTtRQUNYLHFCQUFxQixFQUFFLDBCQUEwQjtRQUNqRCxpQkFBaUIsRUFBRSw4Q0FBOEM7UUFDakUsU0FBUyxFQUFFLDBCQUEwQjtRQUNyQyxXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLGNBQWMsRUFBRSx3QkFBd0I7UUFDeEMsYUFBYSxFQUFFLGlCQUFpQjtLQUNqQztDQUNGLENBQUM7QUFFSixNQUFNLE9BQU8saUJBQWlCOztBQUNkLDBCQUFRLEdBQUc7SUFDdkIsV0FBVyxFQUFFO1FBQ1gsa0JBQWtCLEVBQUUscUNBQXFDO1FBQ3pELHFCQUFxQixFQUFFLHlDQUF5QztRQUNoRSxpQkFBaUIsRUFBRSxxQ0FBcUM7UUFDeEQsa0JBQWtCLEVBQUUsbUVBQW1FO0tBQ3hGO0NBQ0YsQ0FBQztBQUVKLE1BQU0sT0FBTyxjQUFjOztBQUNYLHdCQUFTLEdBQUc7SUFDeEIsVUFBVSxFQUFFO1FBQ1Ysa0JBQWtCLEVBQUUsc0NBQXNDO1FBQzFELGNBQWMsRUFBRSxpQ0FBaUM7UUFDakQsYUFBYSxFQUFFLGlDQUFpQztRQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBbUM7UUFDckQsc0JBQXNCLEVBQUUsMkNBQTJDO1FBQ25FLGlCQUFpQixFQUFFLHFEQUFxRDtRQUN4RSxrQkFBa0IsRUFBRSxpREFBaUQ7UUFDckUsMEJBQTBCLEVBQUUsd0RBQXdEO0tBQ3JGO0lBQ0QsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLHVCQUF1QjtRQUNuQyxnQkFBZ0IsRUFBRSx5QkFBeUI7UUFDM0MsV0FBVyxFQUFFLHFDQUFxQztLQUNuRDtDQUNGLENBQUM7QUFFSixNQUFNLE9BQU8sc0JBQXNCOztBQUNuQiwrQkFBUSxHQUFHO0lBQ3ZCLFlBQVksRUFBRTtRQUNaLG1CQUFtQixFQUFFLHVCQUF1QjtRQUM1QyxlQUFlLEVBQUUseUdBQXlHO0tBQzNIO0NBQ0YsQ0FBQztBQUdKLHdDQUF3QztBQUN4QywrQkFBK0I7QUFDL0Isc0JBQXNCO0FBQ3RCLDhFQUE4RTtBQUM5RSx5QkFBeUI7QUFDekIsb0hBQW9IO0FBQ3BILFNBQVM7QUFDVCxjQUFjO0FBQ2QseUJBQXlCO0FBQ3pCLFNBQVM7QUFDVCxlQUFlO0FBQ2YsMkJBQTJCO0FBQzNCLG1FQUFtRTtBQUNuRSxxRUFBcUU7QUFDckUscUVBQXFFO0FBQ3JFLGtGQUFrRjtBQUNsRixTQUFTO0FBQ1QsY0FBYztBQUNkLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsa0RBQWtEO0FBQ2xELFNBQVM7QUFDVCxxQkFBcUI7QUFDckIsZ0VBQWdFO0FBQ2hFLGdHQUFnRztBQUNoRyxTQUFTO0FBQ1QsY0FBYztBQUNkLDBDQUEwQztBQUMxQyxpRUFBaUU7QUFDakUsUUFBUTtBQUNSLE9BQU87QUFDUCxJQUFJO0FBQ0osTUFBTSxPQUFPLFFBQVE7SUFBckI7UUFDRSxZQUFPLEdBQUUsRUFBRSxDQUFDO1FBQ1osYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUloQixDQUFDO0NBQUE7QUFDRCxNQUFNLE9BQU8sV0FBVztDQU92QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBSb2xlQ29uZmlnIHtcclxuICBwdWJsaWMgc3RhdGljIEVuZFBvaW50ID0ge1xyXG4gICAgcm9sZToge1xyXG4gICAgICBnZXRBbGxVc2VyUm9sZTogJy9hY2Nlc3MtY29udHJvbC9yb2xlJyxcclxuICAgICAgY3JlYXRlUm9sZTogJy9hY2Nlc3MtY29udHJvbC9yb2xlL2NyZWF0ZScsXHJcbiAgICAgIGdldExhbmRpbmdQYWdlOiAnL3BsYXRmb3JtL21lbnUvYXBwbGljYXRpb24nLFxyXG4gICAgICBhZGRQb2xpY3lHcm91cDogJy9hY2Nlc3MtY29udHJvbC9yb2xlJyxcclxuICAgICAgZ2V0QWxsT3JnUm9sZTogJy9hY2Nlc3MtY29udHJvbC9yb2xlL29yZ2FuaXphdGlvbi97b3JnaWR9JyxcclxuICAgICAgZG9zc2llcjogJy9kb3NzaWVyJ1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyQ29uZmlnIHtcclxuICBwdWJsaWMgc3RhdGljIEVuZFBvaW50ID0ge1xyXG4gICAgVXNlcjoge1xyXG4gICAgICBnZXRBbGxVc2VyTGlzdDogJy9vcmcvdXNlcicsXHJcbiAgICAgIGdldEFsbFVzZXJBY3RpdmVJbmFjdGl2ZTogJy9vcmcvdXNlcj9pbmNsdWRlSW5hY3RpdmVVc2Vycz10cnVlJyxcclxuICAgICAgYWN0aXZhdGVVc2VyOiAnL29yZy91c2VyL2FjdGl2YXRlJyxcclxuICAgICAgY3JlYXRlVXNlcjogJy9vcmcvdXNlci9jcmVhdGUnLFxyXG4gICAgICB1c2VyUm9sZTogJy9vcmcvdXNlci9yb2xlJyxcclxuICAgICAgbWFuYWdlbWVudGdyb3VwOiAnL29yZy90ZWFtL21hbmFnZW1lbnRncm91cCcsXHJcbiAgICAgIGdldEFsbFVzZXJPcmdMaXN0OiAnL29yZy91c2VyL29yZ2FuaXphdGlvbi8nXHJcbiAgICB9LFxyXG4gICAgUHJvdmlkZXI6IHtcclxuICAgICAgZ2V0UHJvdmlkZXJMaXN0OiAnL3JlZi9wcm92aWRlcicsXHJcbiAgICAgIHNlYXJjaFByb3ZpZGVyTGlzdDogJy9yZWYvcHJvdmlkZXIvc2VhcmNoJyxcclxuICAgICAgYWRkUHJvdmlkZXJVc2VyOiAnL3JlZi9wcm92aWRlci9jcmVhdGUvYWNjb3VudCdcclxuICAgIH1cclxuICB9O1xyXG59XHJcbmV4cG9ydCBjbGFzcyBBdHRhY2htZW50Q29uZmlnIHtcclxuICBwdWJsaWMgc3RhdGljIEVuZFBvaW50ID0ge1xyXG4gICAgQXR0YWNobWVudHM6IHtcclxuICAgICAgR2V0QXR0YWNobWVudFJlZmVycmFsOiAnL3JlZi9hdHRhY2htZW50L3JlZmVycmFsJyxcclxuICAgICAgR2V0Q2F0ZWdvcnlMb29rdXA6ICcvcGxhdGZvcm0vbWFzdGVyL2xvb2t1cC9sb29rdXBieWNhdGVnb3J5bmFtZScsXHJcbiAgICAgIFVwbG9hZEtleTogJy9jb21tb24vZmlsZXMvdXBsb2FkLWtleScsXHJcbiAgICAgIERvd25sb2FkS2V5OiAnL2NvbW1vbi9maWxlcy9kb3dubG9hZC1rZXknLFxyXG4gICAgICBQb3N0QXR0YWNobWVudDogJy9yZWYvYXR0YWNobWVudC9jcmVhdGUnLFxyXG4gICAgICBQdXRBdHRhY2htZW50OiAnL3JlZi9hdHRhY2htZW50J1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGNsYXNzIFBvbGljeUdyb3VwQ29uZmlnIHtcclxuICBwdWJsaWMgc3RhdGljIEVuZFBvaW50ID0ge1xyXG4gICAgcG9saWN5R3JvdXA6IHtcclxuICAgICAgZ2V0UG9saWN5R3JvdXBMaXN0OiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvcG9saWN5R3JvdXAnLFxyXG4gICAgICBnZXRBbGxQb2xpY3lHcm91cExpc3Q6ICcvcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9wb2xpY3lHcm91cC9hbGwnLFxyXG4gICAgICBjcmVhdGVQb2xpY3lHcm91cDogJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL3BvbGljeUdyb3VwJyxcclxuICAgICAgZ2V0T3JnUG9saWN5R3JvdXBzOiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvcG9saWN5R3JvdXAvb3JnYW5pemF0aW9uL3tvcmdhbml6YXRpb25pZH0nXHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbnNVUkwge1xyXG4gIHB1YmxpYyBzdGF0aWMgRW5kUG9pbnRzID0ge1xyXG4gICAgcGVybWlzc2lvbjoge1xyXG4gICAgICBwZXJtaXNzaW9uUm9sZUJ5SWQ6ICcvYWNjZXNzLWNvbnRyb2wvcGVybWlzc2lvbi9yb2xlL3tpZH0nLFxyXG4gICAgICBwYWdlUGVybWlzc2lvbjogJy9hY2Nlc3MtY29udHJvbC9wZXJtaXNzaW9uL3BhZ2UnLFxyXG4gICAgICBnZXRQZXJtaXNzaW9uOiAnL2FjY2Vzcy1jb250cm9sL3Blcm1pc3Npb24ve2lkfScsXHJcbiAgICAgIGNyZWF0ZVBlcm1pc3Npb246ICcvYWNjZXNzLWNvbnRyb2wvcGVybWlzc2lvbi9jcmVhdGUnLFxyXG4gICAgICB1cGRhdGVEZWxldGVQZXJtaXNzaW9uOiAnL2FjY2Vzcy1jb250cm9sL3Blcm1pc3Npb24ve3Blcm1pc3Npb25pZH0nLFxyXG4gICAgICBnZXRQZXJtaXNzaW9uVHJlZTogJy9hY2Nlc3MtY29udHJvbC9wZXJtaXNzaW9uL3BhZ2Uve3BhZ2VpZH0ve3BhcmVudGlkfScsXHJcbiAgICAgIGdldFBlcm1pc3Npb25UeXBlczogJy9hY2Nlc3MtY29udHJvbC9wZXJtaXNzaW9uL3R5cGUve2FwcGxpY2F0aW9uaWR9JyxcclxuICAgICAgYXBwbGljYXRpb25QZXJtaXNzaW9uc1RyZWU6ICcvYWNjZXNzLWNvbnRyb2wvcGVybWlzc2lvbi9hcHBsaWNhdGlvbi97YXBwbGljYXRpb25pZH0nXHJcbiAgICB9LFxyXG4gICAgcGFnZToge1xyXG4gICAgICBjcmVhdGVQYWdlOiAnL3BsYXRmb3JtL21lbnUvY3JlYXRlJyxcclxuICAgICAgdXBkYXRlRGVsZXRlUGFnZTogJy9wbGF0Zm9ybS9tZW51L3twYWdlaWR9JyxcclxuICAgICAgQWxsUGFnZVRyZWU6ICcvcGxhdGZvcm0vbWVudS90cmVlL3thcHBsaWNhdGlvbmlkfSdcclxuICAgIH1cclxuICB9O1xyXG59XHJcbmV4cG9ydCBjbGFzcyBBY2Nlc3NNYW5hZ2VtZW50Q29uZmlnIHtcclxuICBwdWJsaWMgc3RhdGljIEVuZFBvaW50ID0ge1xyXG4gICAgT3JnYW5pemF0aW9uOiB7XHJcbiAgICAgIGdldE9yZ2FuaXphdGlvbkxpc3Q6ICcvb3JnL29yZ2FuaXphdGlvbi9hbGwnLFxyXG4gICAgICBnZXRPcmdhbml6YXRpb246ICcvcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9wYWdlL29yZ2FuaXphdGlvbi97b3JnSWR9P3JldHVyblVzZXJQYWdlPWZhbHNlJmV4Y2x1ZGVOb0FjdGl2ZVZlcnNpb25QYWdlcz10cnVlJ1xyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBBY2Nlc3NNYW5hZ2VtZW50Q29uZmlnIHtcclxuLy8gICBwdWJsaWMgc3RhdGljIEVuZFBvaW50ID0ge1xyXG4vLyAgICAgT3JnYW5pemF0aW9uOiB7XHJcbi8vICAgICAgIGdldE9yZ2FuaXphdGlvbkxpc3Q6ICcvcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9wYWdlL29yZ2FuaXphdGlvbi9hbGwnLFxyXG4vLyAgICAgICBnZXRPcmdhbml6YXRpb246XHJcbi8vICAgICAgICAgJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL3BhZ2Uvb3JnYW5pemF0aW9uL3tvcmdJZH0/cmV0dXJuVXNlclBhZ2U9ZmFsc2UmZXhjbHVkZU5vQWN0aXZlVmVyc2lvblBhZ2VzPXRydWUnXHJcbi8vICAgICB9LFxyXG4vLyAgICAgUGFnZToge1xyXG4vLyAgICAgICBnZXRQYWdlOiAnL3BhZ2UnXHJcbi8vICAgICB9LFxyXG4vLyAgICAgQXNzZXQ6IHtcclxuLy8gICAgICAgZ2V0QXNzZXQ6ICdhc3NldCcsXHJcbi8vICAgICAgIGdldFBhZ2VBc3NldDogJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL2Fzc2V0L2dldHBhZ2VieWlkJyxcclxuLy8gICAgICAgZ2V0VXNlckFzc2V0OiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvYXNzZXQvZ2V0VXNlckFzc2V0cycsXHJcbi8vICAgICAgIGdldFJvbGVBc3NldDogJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL2Fzc2V0L2dldFJvbGVBc3NldHMnLFxyXG4vLyAgICAgICBnZXRQb2xpY3lHcm91cEFzc2V0OiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvYXNzZXQvZ2V0UG9saWN5R3JvdXBBc3NldHMnXHJcbi8vICAgICB9LFxyXG4vLyAgICAgVXNlcjoge1xyXG4vLyAgICAgICBnZXRVc2VyOiAnL29yZy91c2VyLycsXHJcbi8vICAgICAgIGdldFVzZXJMaXN0OiAnL29yZy91c2VyL2FsbCcsXHJcbi8vICAgICAgIGdldFVzZXJvcmdMaXN0OiAnL29yZy91c2VyL29yZ2FuaXphdGlvbi8nXHJcbi8vICAgICB9LFxyXG4vLyAgICAgUG9saWN5R3JvdXA6IHtcclxuLy8gICAgICAgZ2V0UG9saWN5R3JvdXA6ICcvcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9wb2xpY3lHcm91cC8nLFxyXG4vLyAgICAgICBnZXRQb2xpY3lHcm91cExpc3Q6ICcvcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9wb2xpY3lHcm91cC9vcmdhbml6YXRpb24ve29yZ2FuaXphdGlvbmlkfSdcclxuLy8gICAgIH0sXHJcbi8vICAgICBSb2xlOiB7XHJcbi8vICAgICAgIGdldFJvbGU6ICcvYWNjZXNzLWNvbnRyb2wvcm9sZS8nLFxyXG4vLyAgICAgICBnZXRSb2xlTGlzdDogJy9hY2Nlc3MtY29udHJvbC9yb2xlL29yZ2FuaXphdGlvbi97b3JnaWR9J1xyXG4vLyAgICAgfVxyXG4vLyAgIH07XHJcbi8vIH1cclxuZXhwb3J0IGNsYXNzIFJCQUNJTkZPIHtcclxuICBhcGlIb3N0ID0nJztcclxuICB0b2tlbktleSA9ICcnO1xyXG4gIG90aGVycz86IGFueTtcclxuICBvcmdJRD86IGFueTtcclxuICBlbnZpcm9ubWVudD86IEVudmlyb25tZW50O1xyXG59XHJcbmV4cG9ydCBjbGFzcyBFbnZpcm9ubWVudCB7XHJcbiAgbXN0clVzZXJuYW1lPzogc3RyaW5nO1xyXG4gIG1zdHJQYXNzd29yZD86IHN0cmluZztcclxuICBtc3RyVVJMPzogc3RyaW5nO1xyXG4gIG1zdHJQcm9qZWN0SUQ/OiBzdHJpbmc7XHJcbiAgYXBwbGljYXRpb25pZD86IHN0cmluZztcclxuICBwcmlvcml0eT86IHN0cmluZ1xyXG59XHJcblxyXG4iXX0=