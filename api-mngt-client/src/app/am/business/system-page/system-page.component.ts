import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-system-page',
  templateUrl: './system-page.component.html',
  styleUrls: ['./system-page.component.css']
})
export class SystemPageComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
  }

}
