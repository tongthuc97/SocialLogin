import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QueryParamCondition } from './query-param-condition';
import { QueryParamConditionForm } from './query-param-condition-form';

@Component({
  selector: 'app-query-param-condition',
  templateUrl: './query-param-condition.component.html',
  styleUrls: ['./query-param-condition.component.css']
})
export class QueryParamConditionComponent implements OnInit {

  queryParamForm: FormGroup;

  @Input() listQueryParam: QueryParamCondition[] = [];

  @Output() messageEvent = new EventEmitter<QueryParamCondition[]>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.bindingData();
  }

  /**
   * binding data when init form
   */
  private bindingData() {
    this.queryParamForm = QueryParamConditionForm.queryParamConditionForm(this.fb);
  }

  private validData(): boolean {
    // check parameter name valid
    this.queryParamForm.get('parameterName').setValue(this.queryParamForm.get('parameterName').value.trim());
    if (this.queryParamForm.get('parameterName').invalid) {
      return false;
    }
    // check parameter value valid
    this.queryParamForm.get('parameterValue').setValue(this.queryParamForm.get('parameterValue').value.trim());
    if (this.queryParamForm.get('parameterValue').invalid) {
      return false;
    }
    return true;
  }

  /**
   * remove ipcondition from list ipcondition of condition group
   * @param index the index of delete condition ip
   */
  removeQueryParam(index: number) {
    this.listQueryParam.splice(index, 1);
    // sent new data to parent component
    this.messageEvent.emit(this.listQueryParam);
  }

  /**
   * add new ip condition to list ip condition of condition group
   * @param queryParam the new ip condition
   */
  addQueryParam(queryParam: QueryParamCondition) {
    // check validate form data
    if (this.validData()) {
      // add ipcondition to list ip condition
      this.listQueryParam.push(queryParam);
      // sent new data to parent component
      this.messageEvent.emit(this.listQueryParam);
      // clear form data
      this.queryParamForm.patchValue({
        parameterName: null,
        parameterValue: null,
        isParamMapping: 1
      });
    }
  }

}
