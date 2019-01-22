import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ChartModule }  from 'angular2-highcharts'; 
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { LogdataService } from '../../../statistics/logdata/logdata.service';

declare var require: any;
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    ChartModule
  ],
  declarations: [HomeComponent],
  exports: [RouterModule],
  providers: [
    LogdataService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ]
})
export class HomeModule { }
