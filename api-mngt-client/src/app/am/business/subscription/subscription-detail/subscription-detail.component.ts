import { SubscriptionService } from '../subscription.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { Subscription } from '../subscription';
import { CommonUtil } from '../../../common/util/common-util';


@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.css'],
  providers: [SubscriptionService]
})
export class SubscriptionDetailComponent implements OnInit {

  subscriptionId: number;
  subscription: Subscription;
  statuses = CommonUtil.getListStatus();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private subscriptionService: SubscriptionService,
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('subscriptionId')).subscribe(subscriptionId => {
        this.subscriptionId = +subscriptionId;
        this.subscriptionService.findOne(this.subscriptionId)
          .then(response => {
            this.subscription = response;
          })
          .catch(error => console.log('errors: ' + error));
      });

  }

  goBack() {
    this.location.back();
  }

  getStatusById(id: number){
    return CommonUtil.getStatusById(id);
  }

}


