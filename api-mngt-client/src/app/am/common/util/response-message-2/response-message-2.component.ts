import { Component, OnInit, Input } from '@angular/core';
import { ResponseMessage2 } from './response-message-2';

@Component({
  selector: 'app-response-message-2',
  templateUrl: './response-message-2.component.html',
  styleUrls: ['./response-message-2.component.css']
})
export class ResponseMessage2Component implements OnInit {

  @Input() responseMessage: ResponseMessage2;
  succeed: boolean;

  constructor() { }

  ngOnInit() {
    this.responseMessage.isHide = false;
  }

 printMessage():string{
   this.succeed = true;
    switch(this.responseMessage.response.status){
      case 200: case 201:
        return "Excecute " + this.responseMessage.title + " task successfully!";
      default:
        this.succeed = false;
        return "Fail with " + this.responseMessage.title + " task";
    }
  }

  closeMessage() {
    this.responseMessage.isHide = true;
  }

}
