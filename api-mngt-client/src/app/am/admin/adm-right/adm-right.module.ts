import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { SelectModule } from 'ng2-select';
import { AdmRightListComponent } from './adm-right-list.component';
import { AdmRightBusinessComponent } from './adm-right-business/adm-right-business.component';

const routes: Routes = [

  { path: '', component: AdmRightListComponent, pathMatch: 'full' },
  { path: ':business/:id', component: AdmRightBusinessComponent, pathMatch: 'full' },
  { path: ':business', component: AdmRightBusinessComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DataTableModule,
    SelectModule,
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
    AdmRightListComponent,
    AdmRightBusinessComponent,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class AdmRightModule { }
