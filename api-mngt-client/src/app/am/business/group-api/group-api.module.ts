import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { GroupApiListComponent } from './group-api-list.component';
import { GroupApiBusinessComponent } from './group-api-business.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderGroupApiPipe } from './group-api.pipe';

import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from "angular2-datatable";
import { SelectModule } from 'ng2-select';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { ClipboardModule } from 'ngx-clipboard';
import { GroupApiService } from './group-api.service'
const routes: Routes = [
 
  { path: '', component: GroupApiListComponent, pathMatch: 'full' },

 

  // { path: 'applicationToken', component: ApplicationTokenListComponent, pathMatch: 'full' },
  { path: ':groupApiId/:business',canActivate: [AuthGuardSubmenu], component: GroupApiBusinessComponent, pathMatch: 'full'},
  { path: ':business',canActivate: [AuthGuardSubmenu], component: GroupApiBusinessComponent, pathMatch: 'full'},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
    ClipboardModule,
    ToastModule.forRoot(),
    SelectModule,
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
    GroupApiListComponent,
    GroupApiBusinessComponent,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu,GroupApiService]
})
export class GroupApiModule { }
