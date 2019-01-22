import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { SubscriberListComponent } from './subscriber.component';
import { SubscriberBusinessComponent } from './subscriber-business.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSubscriberPipe } from './order/subscriber.pipe';

import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { DataTableModule } from "angular2-datatable";
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
 
  { path: '', component: SubscriberListComponent, pathMatch: 'full' },
  { path: ':business/:subscriberId', component: SubscriberBusinessComponent, pathMatch: 'full' },
  { path: ':create', component: SubscriberBusinessComponent, pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
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
    SubscriberListComponent,
    SubscriberBusinessComponent,
    OrderSubscriberPipe,
  ],
  exports: [RouterModule]
})
export class SubscriberModule { }
