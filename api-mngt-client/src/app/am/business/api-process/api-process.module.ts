import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule, DataTable } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { DialogService } from '../../common/dialog/dialog.service';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { SelectModule } from 'ng2-select';
import { FileUploadModule } from 'ng2-file-upload';
import { ApiProcessComponent } from './api-process.component';
import { ApiProcessService } from './api-process.service';
import { ApiProcessBusinessComponent } from './api-process-business/api-process-business.component';
import { ProcessDialogService } from './dialog/process-dialog.service';
import { ApiVersionService } from '../api/api-detail/api-version/api-version.service';

const routes: Routes = [
  { path: '', component: ApiProcessComponent, pathMatch: 'full' },
  { path: ':taskId/process', component: ApiProcessBusinessComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    ResponseMessage2Module,
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
    ApiProcessComponent,
    ApiProcessBusinessComponent,
  ],
  exports: [RouterModule],
  providers: [DialogService, ProcessDialogService, DataTable, ApiVersionService, ApiProcessService, AuthGuardSubmenu]
})
export class ApiProcessModule { }
