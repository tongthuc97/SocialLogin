import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { JwtClaimCondition } from './jwt-claim-condition';
import { JwtClaimConditionForm } from './jwt-claim-condition-form';

@Component({
  selector: 'app-jwt-claim-condition',
  templateUrl: './jwt-claim-condition.component.html',
  styleUrls: ['./jwt-claim-condition.component.css']
})
export class JwtClaimConditionComponent implements OnInit {

  jwtClaimForm: FormGroup;

  @Input() listJwtClaim: JwtClaimCondition[] = [];

  @Output() messageEvent = new EventEmitter<JwtClaimCondition[]>();

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
    this.jwtClaimForm = JwtClaimConditionForm.jwtClaimConditionForm(this.fb);
  }

  private validData(): boolean {
    // check claim attrib valid
    this.jwtClaimForm.get('claimAttrib').setValue(this.jwtClaimForm.get('claimAttrib').value.trim());
    if (this.jwtClaimForm.get('claimAttrib').invalid) {
      return false;
    }
    // check claim uri valid
    this.jwtClaimForm.get('claimUri').setValue(this.jwtClaimForm.get('claimUri').value.trim());
    if (this.jwtClaimForm.get('claimUri').invalid) {
      return false;
    }
    return true;
  }

  /**
   * remove ipcondition from list ipcondition of condition group
   * @param index the index of delete condition ip
   */
  removeJwtClaim(index: number) {
    this.listJwtClaim.splice(index, 1);
    // sent new data to parent component
    this.messageEvent.emit(this.listJwtClaim);
  }

  /**
   * add new ip condition to list ip condition of condition group
   * @param jwtClaim the new ip condition
   */
  addJwtClaim(jwtClaim: JwtClaimCondition) {
    // check validate form data
    if (this.validData()) {
      // add ipcondition to list ip condition
      this.listJwtClaim.push(jwtClaim);
      // sent new data to parent component
      this.messageEvent.emit(this.listJwtClaim);
      // clear form data
      this.jwtClaimForm.patchValue({
        claimAttrib: null,
        claimUri: null,
        isClaimMapping: 1
      });
    }
  }

}
