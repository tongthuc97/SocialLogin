import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { ApiLcComponent } from './api-lc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: ApiLcComponent, pathMatch: 'full' },
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
    ApiLcComponent,
  ],
  exports: [RouterModule]
})
export class ApiLcModule { }
