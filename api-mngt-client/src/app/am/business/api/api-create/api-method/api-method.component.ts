import { Component, OnInit, Input, Output, ViewContainerRef, EventEmitter } from '@angular/core';
import { MethodParameter } from './method-param';
import { ApiMethod } from './api-method';
import { PolicyService } from '../../../policy/policy.service';
declare var FormEditable: any;
@Component({
  selector: 'app-api-method',
  templateUrl: './api-method.component.html',
  styleUrls: ['./api-method.component.css'],
  providers: [PolicyService]
})
export class ApiMethodComponent implements OnInit {
  @Input() apiMethod: ApiMethod;
  @Output() showStyle = 'none';
  @Output() removeMethodMes = new EventEmitter();
  @Output() changeMethodInfoMes = new EventEmitter<ApiMethod>();
  methodParams: MethodParameter[] = [];
  paramNameIsValid: boolean = true;
  policies: any;

  parameterTypes = [
    { value: 1, text: "query" },
    { value: 2, text: "header" },
    { value: 3, text: "formData" }
  ];
  dataTypes = [
    { value: "string", text: "String" },
    { value: "int", text: "Int" },
    { value: "datetime", text: "Datetime" }
  ];
  requireds = [
    { value: 1, text: "True" },
    { value: 2, text: "False" }
  ];
  constructor(private policyService: PolicyService) { }

  ngOnInit() {
    this.methodParams = this.apiMethod.amApiMethodParameterses;
    FormEditable.init();
    this.getListPolicy();
  }

  private getListPolicy() {
    this.policyService.getMethodPolicy()
      .then(response => {
        this.policies = response;
      })
  }

  /**
   * show or hide table parameter
   */
  onChange() {
    if (this.showStyle == 'none') {
      this.showStyle = '';
    } else {
      this.showStyle = 'none';
    }
    FormEditable.init();
  }

  /**
   * handle even when user click add param
   */
  addParam() {
    let paramName: string = (document.getElementById(this.apiMethod.httpMethod + "-" + this.apiMethod.urlPattern + "-param-name") as HTMLInputElement).value;
    // check parameter name
    if (this.checkParamIsValid(paramName)) {
      // add parameter method
      this.methodParams.push(new MethodParameter(0, this.apiMethod.httpMethod, paramName, "", 1, "string", 2));
      this.apiMethod.amApiMethodParameterses = this.methodParams;
    } else {
      // show message
      this.paramNameIsValid = false;
      setTimeout(() => {
        this.paramNameIsValid = true;
      }, 2000);
    }
    (<HTMLInputElement>document.getElementById(this.apiMethod.httpMethod + "-" + this.apiMethod.urlPattern + "-param-name")).value = '';
  }

  /**
   * check parameter name is existing
   * @param paramName parameter name
   */
  private checkParamIsValid(paramName: String): boolean {
    if (paramName == '') {
      return false;
    }
    let isExisting = false;
    this.methodParams.forEach(item => {
      if (item.name == paramName) {
        isExisting = true;
      }
    })
    return !isExisting
  }

  /**
   * 
   * @param index the index of the method parameter in list parammeter
   */
  deleteParam(index) {
    this.methodParams.splice(index, 1);
    this.apiMethod.amApiMethodParameterses = this.methodParams;
    this.changeMethodInfoMes.emit(this.apiMethod);
  }

  /**
   * remove a method in the list method of the api
   */
  removeMethod() {
    this.removeMethodMes.emit();
  }

  /**
   * update method infomation when the method be changed
   */
  changeMethodInfo() {
    this.apiMethod.amApiMethodParameterses = this.methodParams;
    this.changeMethodInfoMes.emit(this.apiMethod);
  }
}
