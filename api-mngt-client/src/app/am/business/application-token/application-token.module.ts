import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ApplicationTokenListComponent } from './application-token-list.component';
import { ApplicationTokenBusinessComponent } from './application-token-business.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderApplicationTokenPipe } from './application-token.pipe';
import { ClipboardModule }  from 'ngx-clipboard';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from "angular2-datatable";
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';

const routes: Routes = [
 
  { path: '', component: ApplicationTokenListComponent, pathMatch: 'full' },
  { path: ':business', canActivate: [AuthGuardSubmenu], component: ApplicationTokenBusinessComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
    ClipboardModule,
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
    ApplicationTokenListComponent,
    ApplicationTokenBusinessComponent,
    OrderApplicationTokenPipe,
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class ApplicationTokenModule { }
