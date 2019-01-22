import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { State } from '../state';
@Component({
  selector: 'app-dialog',
  templateUrl: './process-dialog.component.html',
  styleUrls: ['./process-dialog.component.css']
})
export class ProcessDialogComponent implements OnInit {

  public processContent: string;
  public states: State[];

  constructor(public dialogRef: MdDialogRef<ProcessDialogComponent>) {

  }

  ngOnInit() {
  }

}
