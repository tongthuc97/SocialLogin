import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { ActionHistoryService } from '../action-history.service';
import { ActionHistory } from '../action-history';
import { ActionHistoryCommon } from '../action-history-common';

@Component({
  selector: 'app-action-history-detail',
  templateUrl: './action-history-detail.component.html',
  styleUrls: ['./action-history-detail.component.css']
})
export class ActionHistoryDetailComponent implements OnInit {

  actionHistoryId: number;
  actionHistory: ActionHistory;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private actionHistoryService: ActionHistoryService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('id')).subscribe(id => {
        this.actionHistoryId = +id;
        this.actionHistoryService.findOne(this.actionHistoryId)
                                  .then(response => {
                                    this.actionHistory = response;
                                  })
                                  .catch(error => console.log("errors: " +  error));
      });
  }

  goBack() {
    this.location.back();
  }
}