import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadChildren: './am/am.module#AmModule'},
      { path: 'auth', loadChildren: './authentication/auth-routing.module#AuthRoutingModule' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
