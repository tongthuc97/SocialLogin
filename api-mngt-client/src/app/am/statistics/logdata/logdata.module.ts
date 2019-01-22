import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { LogdataComponent } from './logdata.component';
import { LogdataDetailComponent } from './logdata-detail/logdata-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { SelectModule } from 'ng2-select';
import { DateTimePickerModule } from 'ng-pick-datetime';

const routes: Routes = [
 
  { path: '', component: LogdataComponent, pathMatch: 'full' },
  { path: ':id/detail', component: LogdataDetailComponent, pathMatch: 'full' }

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
    SelectModule,
    DateTimePickerModule,
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
    LogdataComponent,
    LogdataDetailComponent,
  ],
  providers: [
    DatePipe
  ],
  exports: [RouterModule]
})
export class LogdataModule { }
