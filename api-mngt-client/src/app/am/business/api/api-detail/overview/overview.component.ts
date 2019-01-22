import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Api } from '../../api';
import { ApiVersion } from '../api-version/api-version';
import { ApiEndpoint } from '../../api-endpoint';
import { ApiService } from '../../api.service';
import { ApiVersionService } from '../api-version/api-version.service';
import { ApiMethod } from '../../api-create/api-method/api-method';
import { AppConfig } from '../../../../../app.config';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  providers: [ApiVersionService]
})
export class ApiOverviewComponent implements OnInit {
  apiId: number;
  amApi: Api;
  apiVersion: ApiVersion;
  defaultLocation: string;
  amApiEndpoints: ApiEndpoint[];
  amApiEndpoint: ApiEndpoint;
  amApiUrlMappings: ApiMethod[];
  url: any;
  apiVersionId: number;
  publishApis: PublishApi[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apiService: ApiService,
    private apiVersionService: ApiVersionService
  ) { }

  ngOnInit() {
    this.getApiIdParam();
  }

  getApiIdParam() {
    this.apiVersionId = +this.route.snapshot.parent.params['apiVersionId'];
    this.apiVersionService.findOne(this.apiVersionId)
      .then(apiVersion => {
        this.apiId = apiVersion.amApi.apiId;
        this.amApi = apiVersion.amApi;
        var amApiEndpoints = apiVersion.amApiEndpoints;
        var apiEnpointString = JSON.stringify(amApiEndpoints);
        apiEnpointString = apiEnpointString.substring(1, apiEnpointString.length - 1);
        this.amApiEndpoint = JSON.parse(apiEnpointString);
        this.amApiUrlMappings = apiVersion.amApiUrlMappings;
        this.publishApis = [];
        if (this.amApiUrlMappings != null && this.amApiUrlMappings.length > 0) {
          this.amApiUrlMappings.forEach(element => {
            let item = {
              baseRuntimeUrl: null,
              context: null,
              version: null,
              urlPattern: null,
              httpMethod: null,
              publishRuntimeUrl: null
            };
            item.baseRuntimeUrl = AppConfig.settings.runtimeUrl;
            item.context = apiVersion.context;
            item.version = apiVersion.apiVersion;
            item.urlPattern = element.urlPattern;
            item.httpMethod = element.httpMethod;
            item.publishRuntimeUrl = item.baseRuntimeUrl + "/" + item.context + "/" + item.version + "/" + item.urlPattern;
            this.publishApis.push(item);
          });
        }
      });
  }

  goBack() {
    this.location.back();
  }
}

class PublishApi {
  baseRuntimeUrl: string;
  context: string;
  version: string;
  urlPattern: string;
  httpMethod: string;
  publishRuntimeUrl: string;
}