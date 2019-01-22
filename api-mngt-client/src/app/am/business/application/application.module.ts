import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationBusinessComponent } from './application-business.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderApplicationPipe } from './application.pipe';

import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from "angular2-datatable";
import { AppDetailComponent } from './app-detail/app-detail.component';
import { AppOverviewComponent } from './app-detail/overview/overview.component';
import { SelectModule } from 'ng2-select';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';
import { ProductionKey } from './app-detail/production-key/production-key.component';
import { ClipboardModule } from 'ngx-clipboard';
const routes: Routes = [
 
  { path: '', component: ApplicationListComponent, pathMatch: 'full' },
  // { path: 'detail', loadChildren: './app-detail/app-detail.module#AppDetailModule' },
  {
    path: ':applicationId/detail',
      component: AppDetailComponent,
      children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'overview' },
          { path: 'overview', component: AppOverviewComponent },
          { path: 'production-key', component: ProductionKey },
          { path: 'token', loadChildren: '../application-token/application-token.module#ApplicationTokenModule' },
          { path: 'subscription', loadChildren: '../subscription/subscription.module#SubscriptionModule' },
        ]
      }
    ]
  },

  // { path: 'applicationToken', component: ApplicationTokenListComponent, pathMatch: 'full' },
  { path: ':applicationId/:business',canActivate: [AuthGuardSubmenu], component: ApplicationBusinessComponent, pathMatch: 'full'},
  { path: ':business',canActivate: [AuthGuardSubmenu], component: ApplicationBusinessComponent, pathMatch: 'full'},
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
    SelectModule,
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
    ApplicationListComponent,
    ApplicationBusinessComponent,
    OrderApplicationPipe,
    AppDetailComponent,
    AppOverviewComponent,
    ProductionKey

  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class ApplicationModule { }
