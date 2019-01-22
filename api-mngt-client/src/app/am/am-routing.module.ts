import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmComponent } from './am.component';
import { AuthGuard } from '../authentication/guard/auth.guard';
const routes: Routes = [
  {
    path: '', component: AmComponent,
    canActivate: [AuthGuard],
    children: [
      // home
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: './common/shared/home/home.module#HomeModule' },
      { path: 'user-profile', loadChildren: './common/shared/user-info/user-info.module#UserInfoModule' },
      { path: 'system', loadChildren: './business/system-page/system-page.module#SystemPageModule' },

      //business
      { path: 'subscriber', loadChildren: './business/subscriber/subscriber.module#SubscriberModule' },
      { path: 'application', loadChildren: './business/application/application.module#ApplicationModule' },
      { path: 'history', loadChildren: './business/api-update-history/api-update-history.moudle#ApiUpdateHistoryModule' },
      { path: 'policy', loadChildren: './business/policy/policy.module#PolicyModule' },
      { path: 'api', loadChildren: './business/api/api.module#ApiModule' },
      { path: 'group-api', loadChildren: './business/group-api/group-api.module#GroupApiModule' },
      { path: 'api-lc', loadChildren: './business/api-lc/api-lc.module#ApiLcModule' },
      { path: 'api-process', loadChildren: './business/api-process/api-process.module#ApiProcessModule' },
      { path: 'action-history', loadChildren: './business/action-history/action-history.module#ActionHistoryModule' },
      { path: 'block-condition', loadChildren: './business/block-condition/block-condition.module#BlockConditionModule' },
      { path: 'para-system', loadChildren: './business/para-system/para-system.module#ParaSystemModule' },

      // statitic
      { path: 'logdata', loadChildren: './statistics/logdata/logdata.module#LogdataModule' },
      { path: 'apiusage', loadChildren: './statistics/api-usage/api-usage.module#ApiUsageModule' },
      { path: 'service-feedback-time', loadChildren: './statistics/service-response-time/service-response-time.module#ServiceResponseTimeModule' },
      { path: 'api-last-access-time', loadChildren: './statistics/api-last-access-time/api-last-access-time.module#ApiLastAccessTimeModule' },
      { path: 'service-method', loadChildren: './statistics/service-method-usage/service-method-usage.module#ServiceMethodUsageModule' },
      { path: 'result-service-usage', loadChildren: './statistics/result-service-usage/result-service-usage.module#ResultServiceUsageModule' },
      { path: 'top-api-application', loadChildren: './statistics/api-most-used-by-application/api-most-used-by-application.module#ApiMostUsedByApplicationModule' },
      { path: 'message-service-portal', loadChildren: './statistics/message-service-portal/message-service-portal.module#MessageServicePortalModule' },

      // admin
      { path: 'adm-api', loadChildren: './admin/adm-api/adm-api.module#AdmApiModule' },
      { path: 'adm-access', loadChildren: './admin/adm-access/adm-access.module#AdmAccessModule' },
      { path: 'adm-right', loadChildren: './admin/adm-right/adm-right.module#AdmRightModule' },
      { path: 'adm-role', loadChildren: './admin/adm-role/adm-role.module#AdmRoleModule' },
      { path: 'adm-user', loadChildren: './admin/adm-user/adm-user.module#AdmUserModule' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmRoutingModule { }
