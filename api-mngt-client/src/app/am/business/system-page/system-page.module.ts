import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemPageComponent } from './system-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
   { path: '', component: SystemPageComponent, pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [SystemPageComponent]
})
export class SystemPageModule { }
