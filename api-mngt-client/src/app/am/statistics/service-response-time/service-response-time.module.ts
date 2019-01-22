import { ServiceResponseTimeComponent } from './service-response-time.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../business/api/api.service';
import { ApiVersionService } from '../../business/api/api-detail/api-version/api-version.service';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { DataTableModule } from 'angular2-datatable';
import { LogdataService } from '../logdata/logdata.service';
import { ChartsModule } from 'ng2-charts';
import { SelectModule } from 'ng2-select';

const routes: Routes = [

  { path: '', component: ServiceResponseTimeComponent, pathMatch: 'full' },
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
  ],
  declarations: [ServiceResponseTimeComponent],
  providers: [
    LogdataService,
    ApiService,
    DatePipe,
    ApiVersionService,
    AuthGuardSubmenu
  ]
})
export class ServiceResponseTimeModule { }
