import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ApiLastAccessTimeComponent } from './api-last-access-time.component';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { ApiService } from '../../business/api/api.service';
import { ApiVersionService } from '../../business/api/api-detail/api-version/api-version.service';
import { LogdataService } from '../logdata/logdata.service';
import { SelectModule } from 'ng2-select';

export function highchartsFactory() {
  return require('highcharts');
}

const routes: Routes = [
  { path: '', component: ApiLastAccessTimeComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DataTableModule,
    SelectModule,
    DateTimePickerModule,
    ToastModule.forRoot(),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: CustomHandler },
      isolate: false
    }),
    ChartModule
  ],
  declarations: [ApiLastAccessTimeComponent],
  providers: [
    LogdataService, ApiService, DatePipe, ApiVersionService
    , {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ]
})
export class ApiLastAccessTimeModule { }
