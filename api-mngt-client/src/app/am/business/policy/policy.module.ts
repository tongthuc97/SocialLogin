import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PolicyComponent } from './policy.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { DataTableModule } from 'angular2-datatable';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { PolicyBusinessComponent } from './policy-business/policy-business.component';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { PolicyService } from './policy.service';
import { ConditionGroupComponent } from './policy-business/condition-group/condition-group.component';
import { QueryParamConditionComponent } from './policy-business/condition-group/query-param-condition/query-param-condition.component';
import { JwtClaimConditionComponent } from './policy-business/condition-group/jwt-claim-condition/jwt-claim-condition.component';
import { IpConditionComponent } from './policy-business/condition-group/ip-condition/ip-condition.component';
import { HeaderFieldConditionComponent } from './policy-business/condition-group/header-field-condition/header-field-condition.component';


const routes: Routes = [

  { path: '', component: PolicyComponent, pathMatch: 'full' },
  { path: ':amPolicyId/detail', component: PolicyDetailComponent, },
  { path: ':amPolicyId/:business', canActivate: [AuthGuardSubmenu], component: PolicyBusinessComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [AuthGuardSubmenu], component: PolicyBusinessComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessage2Module,
    ResponseMessageModule,
    DataTableModule,
    Ng2OrderModule,
    ToastModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomHandler },
      isolate: false
    })
  ],
  declarations: [
    PolicyComponent,
    PolicyDetailComponent,
    PolicyBusinessComponent,
    ConditionGroupComponent,
    QueryParamConditionComponent,
    JwtClaimConditionComponent,
    IpConditionComponent,
    HeaderFieldConditionComponent,
  ],
  exports: [RouterModule],
  providers: [PolicyService, AuthGuardSubmenu]
})
export class PolicyModule { }
