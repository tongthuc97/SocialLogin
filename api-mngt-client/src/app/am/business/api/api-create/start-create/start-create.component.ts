import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CreateApiService } from '../api-create.service';
import { SharedDataService } from '../../../../common/util/common-service/share-data.service';
import { Swagger } from '../swagger-model/swagger';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';
import { Toast } from 'ng2-toastr';

@Component({
  selector: 'app-start-create',
  templateUrl: './start-create.component.html',
  styleUrls: ['./start-create.component.css'],
  providers: [CreateApiService]
})
export class StartCreateComponent implements OnInit {

  testUrl = "http://petstore.swagger.io/v2/swagger.json";

  swaggerData: Swagger;

  swaggerType: string = "url";

  swaggerUrl: string ;

  swaggerFile: string;

  constructor(
    private router: Router,
    private location: Location,
    private createApiService: CreateApiService,
    private shareDataService: SharedDataService,
    private translate: TranslateService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {

  }

  onImport(event) {
    var file = event.srcElement.files[0];
    this.swaggerFile = file.name;
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (evt: any) => {
        this.swaggerData = JSON.parse(evt.target.result);
      }
      reader.onerror = (evt: any) => {
        console.log('error reading file');
        this.toastr.error('', 'Loading Swagger error!', { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });

      }
    }
  }

  public createApiFromSwagger() {
    if (this.swaggerType == 'url') {
      this.getSwaggerFromUrl(this.swaggerUrl);
    } else if (this.swaggerType == 'file') {
      this.shareDataService.setSwaggerData(this.swaggerData);
      this.router.navigate(['api/create/design', 0, 'new', 'swagger']);
    }
  }

  public getSwaggerFromUrl(swaggerUrl: string) {
    this.createApiService.getSwaggerUrl(swaggerUrl)
      .then(response => {
        this.swaggerData = response;
        this.shareDataService.setSwaggerData(this.swaggerData);
        this.router.navigate(['api/create/design', 0, 'new', 'swagger']);
      }).catch(error => {
        this.toastr.error('', 'Loading Swagger error!', { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
        console.log(error);
      });
  }

  public getWsdlFromUrl(wsdlUrl: string) {
    this.createApiService.getWsdlUrl(wsdlUrl)
      .then(response => {
        this.shareDataService.setWsdlUrl(wsdlUrl);
        this.shareDataService.setWsdlData(response);
        this.router.navigate(['api/create/design', 0, 'new', 'wsdl']);
      }).catch(error => {
        this.toastr.error('', 'Loading Wsdl error!', { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
        console.log(error);
      });
  }

  onSelectionChange(swaggerType) {
    this.swaggerType = swaggerType;
  }

  goBack() {
    this.location.back();
  }

}
