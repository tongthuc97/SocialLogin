import { ApiVersion } from '../../api-version/api-version';
import { ApiVersionService } from '../../api-version/api-version.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { SubscriptionService } from '../../../../subscription/subscription.service';
import { Subscription } from '../../../../subscription/subscription';
import { CommonUtil } from '../../../../../common/util/common-util';


@Component({
    selector: 'app-application-detail',
    templateUrl: './application-detail.component.html',
    providers: [SubscriptionService, ApiVersionService ]
})
export class ApplicationChildDetail implements OnInit {

  subscriptionId: number;
  subscription: Subscription;

  statuses = CommonUtil.getListStatus()

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private subscriptionService: SubscriptionService,
    private apiVersionService: ApiVersionService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('subscriptionId')).subscribe(subscriptionId => {
        this.subscriptionId = +subscriptionId;
        this.subscriptionService.findOne(this.subscriptionId)
          .then(response => {
            this.subscription = response;
          })
          .catch(error => console.log('errors: ' +  error));
      });
  }

  getStatusById(id: number): string {
    return CommonUtil.getStatusById(id);
  }

  goBack() {
    this.location.back();
  }
}


