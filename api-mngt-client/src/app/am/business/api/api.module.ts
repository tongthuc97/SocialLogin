import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ApiListComponent } from './api-list.component';
import { ApiDesignComponent } from './api-create/api-design.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule, DataTable } from 'angular2-datatable';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ApiMethodComponent } from './api-create/api-method/api-method.component';
import { ApiDetailComponent } from './api-detail/api-detail.component';

import { ApiService } from './api.service';
import { ApiVersionService } from './api-detail/api-version/api-version.service';

import { ApiVersionComponent } from "./api-detail/api-version/api-version.component";
import { ApiOverviewComponent } from './api-detail/overview/overview.component';
import { ApplicationChildBusiness } from './api-detail/application/application-business/application-business.component';
import { ApplicationChildList } from './api-detail/application/application-list.component';
import { ApplicationChildDetail } from './api-detail/application/application-detail/application-detail.component';
import { DialogService } from '../../common/dialog/dialog.service';
import { SelectModule } from 'ng2-select';
import { FileUploadModule } from 'ng2-file-upload';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { SubscriptionService } from '../subscription/subscription.service';
import { ApiProcessService } from '../api-process/api-process.service';
import { FileSdk } from './api-detail/file-sdk/file-sdk.component';
import { DocumentBusinessComponent } from './api-detail/document/document-business.component';
import { StartCreateComponent } from './api-create/start-create/start-create.component';
import { SharedDataService } from '../../common/util/common-service/share-data.service';
import { DocumentListComponent } from './api-detail/document/document-list.component';
import { ApiLifecycleComponent } from './api-detail/api-lifecycle/api-lifecycle.component';
import { PolicyService } from '../policy/policy.service';
import { ApiUpdateStateComponent } from './api-update-state/api-update-state.component';

const routes: Routes = [
  { path: '', component: ApiListComponent },
  { path: 'create/start-create', component: StartCreateComponent },
  { path: 'create/design/:apiVersionId/:business', canActivate: [AuthGuardSubmenu], component: ApiDesignComponent },
  { path: 'create/design/:apiVersionId/:business/:type', canActivate: [AuthGuardSubmenu], component: ApiDesignComponent },
  { path: 'update-state/:apiVersionId', component: ApiUpdateStateComponent },
  {
    path: ':apiVersionId/detail', component: ApiDetailComponent,

    children: [
      // api overview
      { path: '', redirectTo: 'overview' },
      { path: 'overview', component: ApiOverviewComponent },
      // api version
      { path: 'version', component: ApiVersionComponent },
      // api application
      { path: 'application', component: ApplicationChildList },
      { path: 'application/detail/:subscriptionId', component: ApplicationChildDetail, pathMatch: 'full' },
      { path: 'application/:business/:subscriptionId', component: ApplicationChildBusiness, pathMatch: 'full' },
      // api document
      { path: 'document', component: DocumentListComponent },
      { path: 'document/:business', component: DocumentBusinessComponent },
      { path: 'document/:business/:id', component: DocumentBusinessComponent },
      // sdk
      { path: 'file-sdk', component: FileSdk },
      // api lifecycle
      { path: 'lifecycle', component: ApiLifecycleComponent },
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
    ToastModule.forRoot(),
    SelectModule,
    FileUploadModule,
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
    ApiListComponent,
    ApiDesignComponent,
    ApiMethodComponent,
    DocumentListComponent,
    DocumentBusinessComponent,
    ApiDetailComponent,
    ApiVersionComponent,
    ApiOverviewComponent,
    ApplicationChildList,
    ApplicationChildBusiness,
    ApplicationChildDetail,
    FileSdk,
    StartCreateComponent,
    ApiLifecycleComponent,
    ApiUpdateStateComponent
  ],
  exports: [RouterModule],
  providers: [ApiService, DialogService, DataTable, ApiVersionService, PolicyService, SubscriptionService, ApiProcessService, AuthGuardSubmenu, SharedDataService]
})
export class ApiModule { }
