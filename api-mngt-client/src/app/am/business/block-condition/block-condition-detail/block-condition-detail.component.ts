import { BlockConditionService } from '../block-condition.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { CommonUtil } from '../../../common/util/common-util';


@Component({
  selector: 'app-block-condition-detail',
  templateUrl: './block-condition-detail.component.html',
  styleUrls: ['./block-condition-detail.component.css'],
  providers: [BlockConditionService]
})
export class BlockConditionDetailComponent implements OnInit {

  amBlockId: number;
  blockCondition: any;
  statuses = CommonUtil.getListStatus();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private blockConditionService: BlockConditionService

  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('amBlockId')).subscribe(amBlockId => {
        this.amBlockId = +amBlockId;
        this.blockConditionService.findOne(this.amBlockId)
          .then(response => {
            this.blockCondition = response;
          })
          .catch(error => console.log('errors: ' + error));
      });

  }

  getStatusById(id: number) {
    return CommonUtil.getStatusById(id);
  }

  goBack() {
    this.location.back();
  }

}


