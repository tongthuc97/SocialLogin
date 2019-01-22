import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from 'angular2-datatable';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { ApiUpdateHistory } from './api-update-history.component';



const routes: Routes = [

  { path: '', component: ApiUpdateHistory, pathMatch: 'full' },
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
    ApiUpdateHistory,
  ],
  exports: [RouterModule]
})
export class ApiUpdateHistoryModule { }
