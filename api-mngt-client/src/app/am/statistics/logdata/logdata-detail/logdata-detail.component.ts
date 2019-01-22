import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { LogdataService } from '../logdata.service';
import { Logdata } from '../logdata';
import { ApiVersionService } from '../../../business/api/api-detail/api-version/api-version.service';
import { ApplicationService } from '../../../business/application/application.service';

@Component({
  selector: 'app-logdata-detail',
  templateUrl: './logdata-detail.component.html',
  styleUrls: ['./logdata-detail.component.css'],
  providers: [LogdataService, ApiVersionService, ApplicationService]
})
/**
 * @description : Component quản lý việc xem chi tiết
 */
export class LogdataDetailComponent implements OnInit {
  logdataId: number;
  logdata: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apiVersionService: ApiVersionService,
    private applicationService: ApplicationService,
    private logdataService: LogdataService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => params.getAll('id')).subscribe(id => {
        this.logdataId = +id;
        this.logdataService.findOne(this.logdataId)
          .then(response => {
            this.logdata = response;
            if (this.logdata != null) {
              if (this.logdata.apiVersionId != null) {
                this.apiVersionService.findOne(this.logdata.apiVersionId).then(response => {
                  if (response != null) {
                    this.logdata.apiVersionName = response.amApi.apiName;
                  }
                });
              }
              if (this.logdata.applicationId != null) {
                this.applicationService.findOne(this.logdata.applicationId).then(response => {
                  if (response != null) {
                    this.logdata.applicationName = response.name;
                  }
                });
              }
            }
          })
          .catch(error => console.log("errors: " +  error));
      });      
  }

  goBack() {
    this.location.back();
  }
}