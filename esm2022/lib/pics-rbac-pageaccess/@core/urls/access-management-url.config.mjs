export class AccessManagementConfig {
    static EndPoint = {
        Organization: {
            getOrganizationList: '/platform/page-designer/page/organization/all',
            getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
        },
        Page: {
            getPage: '/page'
        },
        Asset: {
            getAsset: 'asset',
            getPageAsset: '/platform/page-designer/asset/getpagebyid',
            getUserAsset: '/platform/page-designer/asset/getUserAssets',
            getRoleAsset: '/platform/page-designer/asset/getRoleAssets',
            getPolicyGroupAsset: '/platform/page-designer/asset/getPolicyGroupAssets'
        },
        User: {
            getUser: '/org/user/',
            getUserList: '/org/user/all',
            getUserorgList: '/org/user/organization/'
        },
        PolicyGroup: {
            getPolicyGroup: '/platform/page-designer/policyGroup/',
            getPolicyGroupList: '/platform/page-designer/policyGroup/organization/{organizationid}'
        },
        Role: {
            getRole: '/access-control/role/',
            getRoleList: '/access-control/role/organization/{orgid}'
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLW1hbmFnZW1lbnQtdXJsLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BpY3MtY29yZS9yYmFjLXBhZ2VhY2Nlc3Mvc3JjL2xpYi9waWNzLXJiYWMtcGFnZWFjY2Vzcy9AY29yZS91cmxzL2FjY2Vzcy1tYW5hZ2VtZW50LXVybC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLHNCQUFzQjtJQUMxQixNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ3ZCLFlBQVksRUFBRTtZQUNaLG1CQUFtQixFQUFFLCtDQUErQztZQUNwRSxlQUFlLEVBQ2IseUdBQXlHO1NBQzVHO1FBQ0QsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLE9BQU87U0FDakI7UUFDRCxLQUFLLEVBQUU7WUFDTCxRQUFRLEVBQUUsT0FBTztZQUNqQixZQUFZLEVBQUUsMkNBQTJDO1lBQ3pELFlBQVksRUFBRSw2Q0FBNkM7WUFDM0QsWUFBWSxFQUFFLDZDQUE2QztZQUMzRCxtQkFBbUIsRUFBRSxvREFBb0Q7U0FDMUU7UUFDRCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsWUFBWTtZQUNyQixXQUFXLEVBQUUsZUFBZTtZQUM1QixjQUFjLEVBQUUseUJBQXlCO1NBQzFDO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsY0FBYyxFQUFFLHNDQUFzQztZQUN0RCxrQkFBa0IsRUFBRSxtRUFBbUU7U0FDeEY7UUFDRCxJQUFJLEVBQUU7WUFDSixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFdBQVcsRUFBRSwyQ0FBMkM7U0FDekQ7S0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFjY2Vzc01hbmFnZW1lbnRDb25maWcge1xyXG4gIHB1YmxpYyBzdGF0aWMgRW5kUG9pbnQgPSB7XHJcbiAgICBPcmdhbml6YXRpb246IHtcclxuICAgICAgZ2V0T3JnYW5pemF0aW9uTGlzdDogJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL3BhZ2Uvb3JnYW5pemF0aW9uL2FsbCcsXHJcbiAgICAgIGdldE9yZ2FuaXphdGlvbjpcclxuICAgICAgICAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvcGFnZS9vcmdhbml6YXRpb24ve29yZ0lkfT9yZXR1cm5Vc2VyUGFnZT1mYWxzZSZleGNsdWRlTm9BY3RpdmVWZXJzaW9uUGFnZXM9dHJ1ZSdcclxuICAgIH0sXHJcbiAgICBQYWdlOiB7XHJcbiAgICAgIGdldFBhZ2U6ICcvcGFnZSdcclxuICAgIH0sXHJcbiAgICBBc3NldDoge1xyXG4gICAgICBnZXRBc3NldDogJ2Fzc2V0JyxcclxuICAgICAgZ2V0UGFnZUFzc2V0OiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvYXNzZXQvZ2V0cGFnZWJ5aWQnLFxyXG4gICAgICBnZXRVc2VyQXNzZXQ6ICcvcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9hc3NldC9nZXRVc2VyQXNzZXRzJyxcclxuICAgICAgZ2V0Um9sZUFzc2V0OiAnL3BsYXRmb3JtL3BhZ2UtZGVzaWduZXIvYXNzZXQvZ2V0Um9sZUFzc2V0cycsXHJcbiAgICAgIGdldFBvbGljeUdyb3VwQXNzZXQ6ICcvcGxhdGZvcm0vcGFnZS1kZXNpZ25lci9hc3NldC9nZXRQb2xpY3lHcm91cEFzc2V0cydcclxuICAgIH0sXHJcbiAgICBVc2VyOiB7XHJcbiAgICAgIGdldFVzZXI6ICcvb3JnL3VzZXIvJyxcclxuICAgICAgZ2V0VXNlckxpc3Q6ICcvb3JnL3VzZXIvYWxsJyxcclxuICAgICAgZ2V0VXNlcm9yZ0xpc3Q6ICcvb3JnL3VzZXIvb3JnYW5pemF0aW9uLydcclxuICAgIH0sXHJcbiAgICBQb2xpY3lHcm91cDoge1xyXG4gICAgICBnZXRQb2xpY3lHcm91cDogJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL3BvbGljeUdyb3VwLycsXHJcbiAgICAgIGdldFBvbGljeUdyb3VwTGlzdDogJy9wbGF0Zm9ybS9wYWdlLWRlc2lnbmVyL3BvbGljeUdyb3VwL29yZ2FuaXphdGlvbi97b3JnYW5pemF0aW9uaWR9J1xyXG4gICAgfSxcclxuICAgIFJvbGU6IHtcclxuICAgICAgZ2V0Um9sZTogJy9hY2Nlc3MtY29udHJvbC9yb2xlLycsXHJcbiAgICAgIGdldFJvbGVMaXN0OiAnL2FjY2Vzcy1jb250cm9sL3JvbGUvb3JnYW5pemF0aW9uL3tvcmdpZH0nXHJcbiAgICB9XHJcbiAgfTtcclxufVxyXG4iXX0=