import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResponseMessageModule } from '../../../../common/util/response-message/response-message.module';
import { DataTableModule } from 'angular2-datatable';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ApplicationChildBusiness } from './application-business/application-business.component';
import { ApplicationChildList } from './application-list.component';
import { ApplicationChildDetail } from './application-detail/application-detail.component';
import { AuthGuardSubmenu } from '../../../../../authentication/guard/auth.guard-submenu';


const routes: Routes = [
 
  { path: '', component: ApplicationChildList, pathMatch: 'full' },
  { path: ':business/:subscriberId', canActivate: [AuthGuardSubmenu], component: ApplicationChildBusiness, pathMatch: 'full' },
  { path: ':detail/:subscriberId', component: ApplicationChildDetail, pathMatch: 'full' },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ResponseMessageModule,
    DataTableModule,
    ToastModule.forRoot()
  ],
  declarations: [
    ApplicationChildList,
    ApplicationChildBusiness,
    ApplicationChildDetail
  ],
  exports: [RouterModule],
  providers: [AuthGuardSubmenu]
})
export class ApplicationChildModule { }
