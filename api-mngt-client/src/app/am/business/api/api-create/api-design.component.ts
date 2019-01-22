import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { PolicyService } from '../../policy/policy.service';
import { ApiService } from '../api.service';
import { ApiDTO } from '../../../common/dto/ApiDTO';
import { ApiMethod } from './api-method/api-method';
import { TranslateService } from '@ngx-translate/core';
import { Swagger } from './swagger-model/swagger';
import { Operation } from './swagger-model/swagger-operation';
import { SharedDataService } from '../../../common/util/common-service/share-data.service';
import { ApiVersionService } from '../api-detail/api-version/api-version.service';
import { ApiVersion } from '../api-detail/api-version/api-version';
import { MethodParameter } from './api-method/method-param';
import { ApiCreateDTO } from '../../../common/dto/ApiCreateDTO';
import { ApiForm } from '../api-form.component';
import { GroupApiService } from '../../group-api/group-api.service';
import { GroupApi } from '../../group-api/group-api';

declare var FormWizard: any;
declare var FormEditable: any;
declare var FormiCheck: any;
const METHODS: ApiMethod[] = [
  { urlMappingId: '', httpMethod: 'GET', urlPattern: "", throttlingTier: 0, checked: false, amApiMethodParameterses: [] },
  { urlMappingId: '', httpMethod: 'POST', urlPattern: "", throttlingTier: 0, checked: false, amApiMethodParameterses: [] },
  { urlMappingId: '', httpMethod: 'PUT', urlPattern: "", throttlingTier: 0, checked: false, amApiMethodParameterses: [] },
  { urlMappingId: '', httpMethod: 'DELETE', urlPattern: "", throttlingTier: 0, checked: false, amApiMethodParameterses: [] },
];
@Component({
  selector: 'app-api-design',
  templateUrl: './api-design.component.html',
  providers: [ApiVersionService, ApiService, PolicyService, GroupApiService]
})

/**
 * @description: Component quản lý việc chỉnh sửa.
 */
export class ApiDesignComponent implements OnInit {

  // the id of api
  apiId: number;
  // the id of the apiVersion
  apiVersionId: number;
  // business name
  business: string;
  // the api infomation
  apiDto: ApiDTO = new ApiDTO();
  // the business from
  businessForm: FormGroup;
  // api version info
  apiVersion: ApiVersion;
  // the list api method of the api
  liApiMethods: ApiMethod[] = [];

  // danh sách các method để người dùng chọn khi thêm một methor
  apiMethods: ApiMethod[];
  // components = [];
  tabIndex: number;
  policies: any;
  groupApis: GroupApi[] = [];

  // check urlpattern is valid
  urlPatternIsValid: boolean = true;
  // check metho is choose
  methodIsChoose: boolean = true;

  endpointId: number;
  currentState: number;

  type: string;

  swaggerData: Swagger;
  wsdlData: any;
  wsdlUrl: string = "wsdl";

  constructor(public toastr: ToastsManager, public vcr: ViewContainerRef,
    private policyService: PolicyService,
    private apiVersionService: ApiVersionService,
    private groupApiService: GroupApiService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private translate: TranslateService,
    private shareDataService: SharedDataService,
    private fb: FormBuilder,
    public location: Location) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getDataInput();
    // khởi tạo danh sách các method
    this.apiMethods = METHODS;
    // khởi tạo form
    FormWizard.init();
    FormEditable.init();
    FormiCheck.init();
    // Get policies by policy type = 2
    this.getListPolicy();
    this.getGroupApi();
  }

  private getListPolicy() {
    this.policyService.getApiPolicy()
      .then(response => {
        this.policies = response;
      })
  }

  private getGroupApi() {
    this.groupApiService.getListGroupApi()
      .then(response => {
        this.groupApis = response.data;
      })
  }

  private getDataInput() {
    this.route.params.subscribe(params => {
      // get business from url
      this.business = params['business'];
      // get type from url
      this.type = params['type'];
      // get apiversion id from url
      this.apiVersionId = +params['apiVersionId'];
      this.bindingData();
    });
  }

  private bindingData() {
    this.apiDto = new ApiDTO();
    if (this.business == "new") {
      this.businessForm = ApiForm.createForm(this.fb)
      if (this.type == 'swagger') {
        this.mappingSwaggerToApiDto();
      } else if (this.type == 'wsdl') {
        this.getWsdlData();
      }
    } else {
      this.businessForm = ApiForm.updateForm(this.fb);
      this.apiVersionService.findOne(this.apiVersionId)
        .then(response => {
          this.mappingApiVersionToApiDto(response);
          ApiForm.bindingData(this.businessForm, this.apiDto);
        })
    }
  }

  public getWsdlData() {
    this.wsdlUrl = this.shareDataService.getWsdlUrl();
  }

  /**
   * 
   * @param apiVersion  
   */
  private mappingApiVersionToApiDto(apiVersion: ApiVersion) {
    // api infomation
    this.apiDto.apiId = apiVersion.amApi.apiId;
    this.apiDto.apiVersionId = apiVersion.apiVersionId;
    this.apiDto.apiName = apiVersion.amApi.apiName;
    this.apiDto.apiProvider = apiVersion.amApi.apiProvider;
    this.apiDto.contextTemplate = apiVersion.amApi.contextTemplate;
    this.apiDto.apiVersion = apiVersion.apiVersion;
    this.apiDto.description = apiVersion.amApi.description;
    this.apiDto.currentState = apiVersion.currentState;
    this.apiDto.createdBy = apiVersion.amApi.createdBy;
    this.apiDto.updatedBy = apiVersion.amApi.updatedBy;
    this.apiDto.groupApiId = apiVersion.amApi.amGroupApi.id;

    // api implement
    this.apiDto.endpointId = apiVersion.amApiEndpoints[0].endpointId;
    this.apiDto.endpointType = apiVersion.amApiEndpoints[0].endpointType;
    this.apiDto.productEndpoint = apiVersion.amApiEndpoints[0].url;
    this.apiDto.secured = apiVersion.amApiEndpoints[0].isSecured;
    this.apiDto.customHeader = apiVersion.amApiEndpoints[0].customHeader;

    // api manager
    this.apiDto.defaultVersion = apiVersion.isDefaultVersion;
    this.apiDto.responseCaching = apiVersion.isCache;
    this.apiDto.policyId = apiVersion.amPolicy.amPolicyId;

    // api method
    this.apiDto.apiMethods = apiVersion.amApiUrlMappings;

    this.liApiMethods = apiVersion.amApiUrlMappings
    console.log(this.apiDto);
  }

  /**
   * 
   */
  private mappingSwaggerToApiDto() {
    this.swaggerData = this.shareDataService.getSwaggerData();
    if (this.swaggerData != undefined) {

      // get list api method from swagger paths
      Object.entries(this.swaggerData.paths).forEach(item => {
        let path: any = item[1];
        path.key = item[0];
        // is get method
        if (path.get != null && path.get != undefined) {
          let operation = path.get;
          let lstMethodParameter = [];
          if (operation.parameters != undefined && operation.parameters.length > 0) {
            operation.parameters.forEach(itemMethodParam => {
              lstMethodParameter.push(this.swaggerParamToMethodParam(itemMethodParam, "GET"));
            });
          }
          this.liApiMethods.push(new ApiMethod("GET", path.key.substring(1), 0, true, lstMethodParameter))
        }
        // is post method
        if (path.post != null && path.post != undefined) {
          let operation = path.post;
          let lstMethodParameter = [];
          if (operation.parameters != undefined && operation.parameters.length > 0) {
            operation.parameters.forEach(itemMethodParam => {
              lstMethodParameter.push(this.swaggerParamToMethodParam(itemMethodParam, "POST"));
            });
          }
          this.liApiMethods.push(new ApiMethod("POST", path.key.substring(1), 0, true, lstMethodParameter))
        }
        // is put method
        if (path.put != null && path.put != undefined) {
          let operation = path.put;
          let lstMethodParameter = [];
          if (operation.parameters != undefined && operation.parameters.length > 0) {
            operation.parameters.forEach(itemMethodParam => {
              lstMethodParameter.push(this.swaggerParamToMethodParam(itemMethodParam, "PUT"));
            });
          }
          this.liApiMethods.push(new ApiMethod("PUT", path.key.substring(1), 0, true, lstMethodParameter))
        }
        // is delete method
        if (path.delete != null && path.delete != undefined) {
          let operation = path.delete;
          let lstMethodParameter = [];
          if (operation.parameters != undefined && operation.parameters.length > 0) {
            operation.parameters.forEach(itemMethodParam => {
              lstMethodParameter.push(this.swaggerParamToMethodParam(itemMethodParam, "DELETE"));
            });
          }
          this.liApiMethods.push(new ApiMethod("DELETE", path.key.substring(1), 0, true, lstMethodParameter))
        }
      });
      this.apiDto.apiMethods = this.liApiMethods;
    }
  }

  // convert swagger parameter to method parameter object
  private swaggerParamToMethodParam(swaggerParam: any, method: string): MethodParameter {
    let required = 0;
    if (swaggerParam.required == "true") {
      required = 1;
    }
    let parameterTypes = 1;
    if (swaggerParam.in == "header") {
      parameterTypes = 2;
    } else if (swaggerParam.in == "formData") {
      parameterTypes = 3;
    }
    return new MethodParameter(0, method, swaggerParam.name, swaggerParam.description, parameterTypes, swaggerParam.type, required);
  }

  /**
   * Xử lý khi ấn nút thêm method
   */
  addMethod() {
    var urlPattern = (document.getElementById("txtUrlPattern") as HTMLInputElement).value;
    // ckeck method is choosed
    if (this.checkMethod()) {
      // check url pattern is valid
      if (this.checkValidUrlPattern(urlPattern) && this.checkUrlPaternExisting(urlPattern)) {
        // add method to list api method of the api
        this.apiMethods.forEach(method => {
          if (method.checked) {
            method.urlPattern = urlPattern;
            this.liApiMethods.push(method);
          }
        })
      } else {
        // show message
        this.urlPatternIsValid = false;
        setTimeout(() => {
          this.urlPatternIsValid = true;
        }, 2000);
      }
    } else {
      // show message
      this.methodIsChoose = false;
      setTimeout(() => {
        this.methodIsChoose = true;
      }, 2000);
    }
    FormEditable.init();
  }

  /**
   * check method is choosed
   */
  private checkMethod(): boolean {
    let isChecked = false;
    this.apiMethods.forEach(item => {
      if (item.checked) {
        isChecked = true;
      }
    });
    return isChecked;

  }

  /**
   * check url pattern is valid
   * @param urlPattern 
   */
  private checkValidUrlPattern(urlPattern: string): boolean {
    var regexp = /^[a-zA-Z0-9?%+&:/._=-]+$/;
    let matchregex = urlPattern.match(regexp) != null;
    let firstCharOfPattern = urlPattern.charAt(0);
    let idxSplash = urlPattern.indexOf("//");
    if ((firstCharOfPattern != "/") && (idxSplash == -1) && matchregex) {
      return true;
    }
    return false;
  }

  /**
   * check urlpattern is existing
   * @param urlPattern 
   */
  private checkUrlPaternExisting(urlPattern: string): boolean {
    let isExisting = false;
    this.apiMethods.forEach(item => {
      if (item.checked == true) {
        this.liApiMethods.forEach(itemChoosen => {
          if ((itemChoosen.httpMethod == item.httpMethod) && (itemChoosen.urlPattern == urlPattern)) {
            isExisting = true;
          }
        });
      }
    });
    return !isExisting;
  }

  /**
   * update a api method in list api method of the api
   * @param $event the new info of the api mehtod
   * @param index the index of the api
   */
  changeMethodInfo($event, index: number) {
    console.log($event)
    this.liApiMethods[index] = $event;

  }

  /**
   * remove a api method in list api method of api
   * @param index the index of the api method
   */
  removeMethod(index: number) {
    this.liApiMethods.splice(index, 1);
  }

  submitData(data: any) {
    if (this.checkvalidateData()) {
      this.mappingFormDataToApiDto(data);
      if (this.business == 'new') {
        this.create(data);
      }
      if (this.business == 'edit') {
        this.update(data);
      }
      if (this.business == 'clone') {
        this.clone(data);
      }
    }
  }

  private create(data: any) {
    this.apiService.findByContextTemplate(data.contextTemplate).then(apiInfo => {
      // check context template is existing
      if (apiInfo != null && apiInfo.length != 0) {
        this.toastr.error('Cannot create API with existed Context Template', 'Error!', { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 2000);
          });
      } else {
        // create api
        this.apiService.create(this.apiDto)
          .then(response => {
            this.toastr.success('Created API successfully', 'Success!', { dismiss: 'controlled' })
              .then((toast: Toast) => {
                setTimeout(() => {
                  this.toastr.dismissToast(toast);
                  this.location.back();
                }, 2000);
              });
          });
      }
    });

  }

  private update(data: any) {
    // update api
    this.apiVersionService.updateApiVersion(this.apiDto)
      .then(response => {
        this.toastr.success('Updated API successfully', 'Success!', { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
              this.location.back();
            }, 2000);
          });
      });
  }

  private clone(data: any) {
    this.apiVersionService.findByContextTemplateAndVersion(this.apiVersionId, data.apiVersion).then(apiVersionInfo => {
      // check apiversion is existing
      if (apiVersionInfo != null && apiVersionInfo.length != 0) {
        this.toastr.error('Cannot clone API with existed Version', 'Error!', { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 2000);
          });
      } else {
        // create api version
        this.apiVersionService.createApiVersion(this.apiDto).then(response => {
          this.toastr.success('Clone API successfully', 'Success!', { dismiss: 'controlled' })
            .then((toast: Toast) => {
              setTimeout(() => {
                this.toastr.dismissToast(toast);
                this.location.back();
              }, 2000);
            });
        });
      }
    });
  }

  private checkvalidateData(): boolean {
    this.toastr.setRootViewContainerRef(this.vcr);
    if (this.businessForm.get('apiName').invalid) {
      return false;
    }
    if (this.businessForm.get('contextTemplate').invalid) {
      return false;
    }
    if (this.businessForm.get('apiVersion').invalid) {
      return false;
    }
    if (this.businessForm.get('endpointType').invalid) {
      return false;
    }
    if (this.businessForm.get('productEndpoint').invalid) {
      return false;
    }
    if (this.businessForm.get('policyId').invalid) {
      return false;
    }

    if (!this.liMethodIsChoose()) {
      return false;
    }
    return true;
  }

  private liMethodIsChoose(): boolean {
    let result = true;
    if (this.liApiMethods == null || this.liApiMethods.length == 0) {
      result = false
      this.toastr.error('Url pattern is not existed', 'Error!', { dismiss: 'controlled' })
        .then((toast: Toast) => {
          setTimeout(() => {
            this.toastr.dismissToast(toast);
          }, 2000);
        });
    }
    return result;
  }

  private mappingFormDataToApiDto(data: any) {
    // api infomation
    // this.apiDto.apiId = data.apiId;
    this.apiDto.apiVersionId = data.apiVersionId;
    this.apiDto.apiName = data.apiName;
    this.apiDto.apiProvider = data.apiProvider;
    this.apiDto.contextTemplate = data.contextTemplate;
    this.apiDto.apiVersion = data.apiVersion;
    this.apiDto.description = data.description;
    this.apiDto.currentState = data.currentState;
    this.apiDto.createdBy = data.createdBy;
    this.apiDto.updatedBy = data.updatedBy;
    this.apiDto.groupApiId = data.groupApiId;

    // api implement
    // this.apiDto.endpointId = data.endpointId;
    this.apiDto.endpointType = data.endpointType;
    this.apiDto.productEndpoint = data.productEndpoint;
    this.apiDto.secured = (data.secured == true ? 1 : 0);
    if (data.secured) {
      if (data.username != '' && data.password != '') {
        this.apiDto.customHeader = "Basic " + btoa(data.username + ":" + data.password);
      } else {
        this.apiDto.customHeader = data.customHeader;
      }
    }
    // api manager
    this.apiDto.defaultVersion = (data.defaultVersion == true ? 1 : 0);
    this.apiDto.responseCaching = (data.responseCaching == true ? 1 : 0);
    this.apiDto.policyId = data.policyId;

    // api method
    this.apiDto.apiMethods = this.liApiMethods;
    console.log(this.apiDto);
  }


  intToBoolean(value: number) {
    if (value == 1) {
      return true;
    }
    return false;
  }
}