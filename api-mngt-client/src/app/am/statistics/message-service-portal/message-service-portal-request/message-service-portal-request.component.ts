import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { LogdataService } from '../../logdata/logdata.service';
import { ApiVersionService } from '../../../business/api/api-detail/api-version/api-version.service';
import { ApplicationService } from '../../../business/application/application.service';

@Component({
  selector: 'app-message-service-portal-request',
  templateUrl: './message-service-portal-request.component.html',
  styleUrls: ['./message-service-portal-request.component.css'],
  providers: [LogdataService, ApiVersionService, ApplicationService]
})
/**
 * @description : Component quản lý việc xem chi tiết
 */
export class MessageServicePortalRequestComponent implements OnInit {
  logdataId: number;
  logdata: any;
  dataIA: any;
  dataIE: any;
  dataInputApi: any;
  dataInputEndpoint: any;
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
            this.dataIA = response.dataInputApi;
            this.dataIE = response.dataInputEndpoint;
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
            this.getData();
          })
          .catch(error => console.log("errors: " + error));
      });
  }
  /**
   * @description : hàm chuyển dữ liệu sang dạng json
   */
  getData() {
    if (this.dataIA != null) {
      this.dataInputApi = JSON.parse(this.dataIA);
    }
    else {
      this.dataInputApi = {
        'dataInputApi': 'null'
      };
    }
    if (this.dataIE != null) {
      this.dataInputEndpoint = JSON.parse(this.dataIE);
    }
    else {
      this.dataInputEndpoint = {
        'dataOutputEndpoint': 'null'
      };
    }
  }

  goBack() {
    this.location.back();
  }
}