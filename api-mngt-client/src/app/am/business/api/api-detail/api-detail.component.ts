import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from '../../subscriber/subscriber';
import { ApiVersionService } from './api-version/api-version.service';
import { ApiVersion } from './api-version/api-version';


@Component({
  selector: 'app-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.css'],
  providers: [ApiVersionService]
})
export class ApiDetailComponent implements OnInit {
  private sub: any;
  public apiVersionId: number;
  private apiVersion: ApiVersion;
  constructor(
    private route: ActivatedRoute,  
    private apiVersionService: ApiVersionService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.apiVersionId = params['apiVersionId'];
      this.apiVersionService.findOne(this.apiVersionId)
          .then(response => {
            this.apiVersion = response;
          })
          .catch(error => console.log(error))
    });
  }

}
