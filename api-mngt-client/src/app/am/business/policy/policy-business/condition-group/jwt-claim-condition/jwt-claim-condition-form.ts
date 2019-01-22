import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtClaimCondition } from './jwt-claim-condition';
import { Patterns } from '../../../../../common/util/patterns';
export class JwtClaimConditionForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static jwtClaimConditionForm(fb: FormBuilder): FormGroup {
        var jwtClaimConditionForm: FormGroup;
        jwtClaimConditionForm = fb.group({
            jwtClaimId: [0, Validators.compose([

            ])],
            claimAttrib: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            claimUri: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            isClaimMapping: [1, Validators.compose([

            ])]
        });
        return jwtClaimConditionForm;
    }

    static bindingData(formGroup: FormGroup, jwtClaimCondition: JwtClaimCondition) {
        debugger;
        formGroup.setValue({
            jwtClaimId: jwtClaimCondition.jwtClaimId,
            claimAttrib: jwtClaimCondition.claimAttrib,
            claimUri: jwtClaimCondition.claimUri,
            isClaimMapping: jwtClaimCondition.isClaimMapping
        });
    }

}