import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { SubscriptionCreateComponent } from './subscription-create/subscription-create.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { SubscriptionUpdateComponent } from './subscription-update/subscription-update.component';
import { SubscriptionComponent } from './subscription.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from 'angular2-datatable';
import { SelectModule } from 'ng2-select';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { AuthGuardSubmenu } from '../../../authentication/guard/auth.guard-submenu';



const routes: Routes = [

  { path: '', component: SubscriptionComponent, pathMatch: 'full' },
  { path: ':subscriptionId/detail', component: SubscriptionDetailComponent, pathMatch: 'full' },
  { path: ':create', canActivate: [AuthGuardSubmenu], component: SubscriptionCreateComponent, pathMatch: 'full' },
  { path: ':subscriptionId/update', canActivate: [AuthGuardSubmenu], component: SubscriptionUpdateComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessage2Module,
    ResponseMessageModule,
    DataTableModule,
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
    SubscriptionComponent,
    SubscriptionCreateComponent,
    SubscriptionDetailComponent,
    SubscriptionUpdateComponent
  ],
  exports: [RouterModule, SubscriptionComponent],
  providers: [AuthGuardSubmenu]
})
export class SubscriptionModule { }
