import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HeaderField } from '../../../../../common/util/header-field';
import { CommonUtil } from '../../../../../common/util/common-util';
import { HeaderFieldConditionForm } from './header-field-condition-form';

@Component({
  selector: 'app-header-field-condition',
  templateUrl: './header-field-condition.component.html',
  styleUrls: ['./header-field-condition.component.css']
})
export class HeaderFieldConditionComponent implements OnInit {

  headerFieldForm: FormGroup;

  @Input() listHeaderField: HeaderField[] = [];

  listDirectional = CommonUtil.getListDirectional();

  listStatus = CommonUtil.getListStatus();

  @Output() messageEvent = new EventEmitter<HeaderField[]>();

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
    this.headerFieldForm = HeaderFieldConditionForm.headerFieldConditionForm(this.fb);
  }

  private validData(): boolean {
    // check header field name valid
    this.headerFieldForm.get('headerFieldName').setValue(this.headerFieldForm.get('headerFieldName').value.trim());
    if (this.headerFieldForm.get('headerFieldName').invalid) {
      return false;
    }
    // check header field value valid
    this.headerFieldForm.get('headerFieldValue').setValue(this.headerFieldForm.get('headerFieldValue').value.trim());
    if (this.headerFieldForm.get('headerFieldValue').invalid) {
      return false;
    }
    return true;
  }

  /**
   * remove ipcondition from list ipcondition of condition group
   * @param index the index of delete condition ip
   */
  removeHeaderField(index: number) {
    this.listHeaderField.splice(index, 1);
    // sent new data to parent component
    this.messageEvent.emit(this.listHeaderField);
  }

  /**
   * add new ip condition to list ip condition of condition group
   * @param headerField the new ip condition
   */
  addHeaderField(headerField: HeaderField) {
    // check validate form data
    if (this.validData()) {
      // add ipcondition to list ip condition
      this.listHeaderField.push(headerField);
      // sent new data to parent component
      this.messageEvent.emit(this.listHeaderField);
      // clear form data
      this.headerFieldForm.patchValue({
        headerFieldName: null,
        headerFieldValue: null,
        headerFieldStatus: 1,
        directional: 1
      });
    }
  }

  /**
   * get status string by status id
   * @param id the id of the status
   */
  getStatusById(id: number) {
    return CommonUtil.getStatusById(id);
  }

  /**
   * get directional string by directional id
   * @param id the id of the directional
   */
  getDirectionalById(id: number) {
    return CommonUtil.getDirectionalById(id);
  }

}
