import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-response-message',
  templateUrl: './response-message.component.html',
  styleUrls: ['./response-message.component.css']
})
export class ResponseMessageComponent implements OnInit {
  @Input() httpStatus: number;
  @Input() task: string;
  constructor() { }

  ngOnInit() {
  }

  printMessage():string{
    switch(this.httpStatus){
      case 200: case 201:
        return "Excecute " + this.task + " task successfully!";
      default:
        return "Fail with " + this.task + " task";
    }
  }

}
