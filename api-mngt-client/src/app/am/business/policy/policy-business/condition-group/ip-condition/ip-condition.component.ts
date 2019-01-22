import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IpConditionForm } from './ip-condition-form';
import { CommonUtil } from '../../../../../common/util/common-util';
import { IpCondition } from './ip-condition';

@Component({
  selector: 'app-ip-condition',
  templateUrl: './ip-condition.component.html',
  styleUrls: ['./ip-condition.component.css']
})
export class IpConditionComponent implements OnInit {

  ipConditionForm: FormGroup;

  ipConditionTypes = CommonUtil.getListIpConditionType();

  listDirectional = CommonUtil.getListDirectional();

  listStatus = CommonUtil.getListStatus();

  @Output() messageEvent = new EventEmitter<IpCondition[]>();

  @Input() listIpCondition: IpCondition[] = [];

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
    this.ipConditionForm = IpConditionForm.ipConditionForm(this.fb);
  }

  private validData(): boolean {
    // specific ip
    if (this.ipConditionForm.get('ipConditionType').value == 1) {
      // check specific ip valid
      this.ipConditionForm.get('specificIp').setValue(this.ipConditionForm.get('specificIp').value.trim());
      if (this.ipConditionForm.get('specificIp').invalid) {
        return false;
      }
    }

    // range ip
    if (this.ipConditionForm.get('ipConditionType').value == 2) {
      // check start ip valid
      this.ipConditionForm.get('startingIp').setValue(this.ipConditionForm.get('startingIp').value.trim());
      if (this.ipConditionForm.get('startingIp').invalid) {
        return false;
      }
      // check end ip valid
      this.ipConditionForm.get('endingIp').setValue(this.ipConditionForm.get('endingIp').value.trim());
      if (this.ipConditionForm.get('endingIp').invalid) {
        return false;
      }
    }
    return true;
  }

  /**
   * remove ipcondition from list ipcondition of condition group
   * @param index the index of delete condition ip
   */
  removeIpCondition(index: number) {
    this.listIpCondition.splice(index, 1);
    // sent new data to parent component
    this.messageEvent.emit(this.listIpCondition);
  }

  /**
   * add new ip condition to list ip condition of condition group
   * @param ipCondition the new ip condition
   */
  addIpCondition(ipCondition: IpCondition) {
    // check validate form data
    if (this.validData()) {
      // add ipcondition to list ip condition
      this.listIpCondition.push(ipCondition);
      // sent new data to parent component
      this.messageEvent.emit(this.listIpCondition);
      // clear form data
      this.ipConditionForm.patchValue({
        ipConditionType: 1,
        startingIp: null,
        endingIp: null,
        specificIp: null,
        ipConditionStatus: 1,
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
