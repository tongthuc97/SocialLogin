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
import { AdmRoleListComponent } from './adm-role-list.component';
import { AdmRoleBusinessComponent } from './adm-role-business/adm-role-business.component';

const routes: Routes = [

  { path: '', component: AdmRoleListComponent, pathMatch: 'full' },
  { path: ':business/:id', component: AdmRoleBusinessComponent, pathMatch: 'full' },
  { path: ':business', component: AdmRoleBusinessComponent, pathMatch: 'full' },
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
    AdmRoleListComponent,
    AdmRoleBusinessComponent,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class AdmRoleModule { }
