import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IpCondition } from './ip-condition';
import { Patterns } from '../../../../../common/util/patterns';
export class IpConditionForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static ipConditionForm(fb: FormBuilder): FormGroup {
        var ipConditionForm: FormGroup;
        ipConditionForm = fb.group({
            amIpConditionId: [0, Validators.compose([

            ])],
            ipConditionType: [1, Validators.compose([

            ])],
            startingIp: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.IP_PATTERN)
            ])],
            endingIp: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.IP_PATTERN)
            ])],
            specificIp: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.IP_PATTERN)
            ])],
            ipConditionStatus: [1, Validators.compose([

            ])],
            directional: [1, Validators.compose([

            ])]
        });
        return ipConditionForm;
    }

    static bindingData(formGroup: FormGroup, ipCondition: IpCondition) {
        debugger;
        formGroup.setValue({
            amIpConditionId: ipCondition.amIpConditionId,
            ipConditionType: ipCondition.ipConditionType,
            startingIp: ipCondition.startingIp,
            endingIp: ipCondition.endingIp,
            specificIp: ipCondition.specificIp,
            ipConditionStatus: ipCondition.ipConditionStatus,
            directional: ipCondition.directional
        });
    }

}