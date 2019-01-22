import { ResultServiceUsageComponent } from './result-service-usage.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { DataTableModule } from 'angular2-datatable';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { SelectModule } from 'ng2-select';

const routes: Routes = [

  { path: '', component: ResultServiceUsageComponent, pathMatch: 'full' },
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    DataTableModule,
    SelectModule,
    ReactiveFormsModule,
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
    })
  ],
  declarations: [ResultServiceUsageComponent],
  providers: [
    AuthGuardSubmenu,
    DatePipe
  ]
})
export class ResultServiceUsageModule { }
