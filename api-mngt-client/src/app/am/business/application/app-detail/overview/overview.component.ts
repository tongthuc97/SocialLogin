import { Component, OnInit } from '@angular/core';
import { Application } from '../../application';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../application.service';
import { CommonUtil } from '../../../../common/util/common-util';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class AppOverviewComponent implements OnInit {
  private sub: any;
  public application: Application;
  public applicationId: number;

  listStatus = CommonUtil.getListStatus();

  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
  ) { }

  getStatusById(id: number) {
    return CommonUtil.getStatusById(id);
  }

  ngOnInit() {
    this.applicationId = this.route.snapshot.parent.params['applicationId'];
    this.applicationService.findOne(this.applicationId)
      .then(response => {
        this.application = response;
      })
      .catch(error => console.log("errors: " + error));
  }

}