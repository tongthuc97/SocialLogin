import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';

import { ChartModule }  from 'angular2-highcharts'; 
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { ApiMostUsedByApplicationComponent } from './api-most-used-by-application.component';
import { ApiService } from '../../business/api/api.service';
import { ApiVersionService } from '../../business/api/api-detail/api-version/api-version.service';
import { LogdataService } from '../logdata/logdata.service';
import { ChartsModule } from 'ng2-charts';
import { ApplicationService } from '../../business/application/application.service';
import { SelectModule } from 'ng2-select';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

const routes: Routes = [
  { path: '', component: ApiMostUsedByApplicationComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    DataTableModule,
    SelectModule,
    ToastModule.forRoot(),
    DateTimePickerModule,
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
  declarations: [ApiMostUsedByApplicationComponent],
  providers: [
    LogdataService, ApiService, DatePipe, ApiVersionService,ApplicationService
    ,{
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ]
})
export class ApiMostUsedByApplicationModule { }
