import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ParaSystemComponent } from './para-system.component';
import { ParaSystemDetailComponent } from './para-system-detail/para-system-detail.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParaSystemService } from './para-system.service';

import { DialogService } from '../../common/dialog/dialog.service';
import { DataTableModule } from "angular2-datatable";
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { HttpClient } from '@angular/common/http';
import { ParaSystemBusinessComponent } from './para-system-business/para-system-business.component';


const routes: Routes = [
 
  { path: '', component: ParaSystemComponent, pathMatch: 'full' },
  { path: ':id/detail', component: ParaSystemDetailComponent, pathMatch: 'full' },
  { path: ':business', component: ParaSystemBusinessComponent, pathMatch: 'full'},
  { path: ':id/:business', component: ParaSystemBusinessComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DataTableModule,
    ToastModule.forRoot()
  ],
  declarations: [
    ParaSystemComponent,
    ParaSystemDetailComponent,
    ParaSystemBusinessComponent
  ],
  exports: [RouterModule],
  providers: [ParaSystemService, DialogService]
})
export class ParaSystemModule { }

