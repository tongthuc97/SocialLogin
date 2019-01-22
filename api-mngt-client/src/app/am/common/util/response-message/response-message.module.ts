import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseMessageComponent } from './response-message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ResponseMessageComponent],
  exports: [ResponseMessageComponent]
})
export class ResponseMessageModule { }
