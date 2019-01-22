import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from "angular2-datatable";
import { MessageServicePortalComponent } from './message-service-portal.component';
import { MessageServicePortalResponseComponent } from './message-service-portal-response/message-service-portal-resonse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseMessageModule } from '../../common/util/response-message/response-message.module';
import { ResponseMessage2Module } from '../../common/util/response-message-2/response-message-2.module';
import { TranslateModule, TranslateLoader, MissingTranslationHandler } from '@ngx-translate/core';
import { createTranslateLoader, CustomHandler } from '../../../i18n-setting';
import { HttpClient } from '@angular/common/http';
import { SelectModule } from 'ng2-select';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MessageServicePortalRequestComponent } from './message-service-portal-request/message-service-portal-request.component';
const routes: Routes = [
 
  { path: '', component: MessageServicePortalComponent, pathMatch: 'full' },
  { path: ':id/response', component: MessageServicePortalResponseComponent, pathMatch: 'full' },
  { path: ':id/request', component: MessageServicePortalRequestComponent, pathMatch: 'full' }

]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgxJsonViewerModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    ResponseMessage2Module,
    DataTableModule,
    SelectModule,
    DateTimePickerModule,
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
    MessageServicePortalComponent,
    MessageServicePortalResponseComponent,
    MessageServicePortalRequestComponent
  ],
  providers: [
    DatePipe
  ],
  exports: [RouterModule]
})
export class MessageServicePortalModule { }
