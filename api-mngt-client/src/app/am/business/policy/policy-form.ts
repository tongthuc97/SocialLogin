import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Patterns } from '../../common/util/patterns';


export class PolicyForm {
    static policySearchForm(fb: FormBuilder): FormGroup {
        var policyForm: FormGroup;
        policyForm = fb.group({
            amPolicyId: [0],
            description: [null],
            displayName: [null],
            name: [''],
            isDeployed: [0],
            policyType: [0],
            quotaType: [0],
        });
        return policyForm;
    }

    static policyCreateForm(fb: FormBuilder): FormGroup {
        var policyForm: FormGroup;
        policyForm = fb.group({
            amPolicyId: [0, Validators.compose([

            ])],
            description: [null, Validators.compose([

            ])],
            displayName: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            name: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            isDeployed: [1, Validators.compose([
                Validators.required
            ])],
            policyType: [1, Validators.compose([
                Validators.required
            ])],
            quota: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            quotaType: [1, Validators.compose([
                Validators.required
            ])],
            unitTime: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            amConditionGroups: fb.array([

            ])
        });
        return policyForm;
    }

    static policyUpdateForm(fb: FormBuilder): FormGroup {
        var policyForm = this.policyCreateForm(fb);
        policyForm.controls['policyType'].disable();
        return policyForm;
    }

    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param policy : đối tượng đích
     */
    static bindingData(updateForm: FormGroup, policy: any) {

        updateForm.setValue({
            amPolicyId: policy.amPolicyId,
            displayName: policy.displayName,
            name: policy.name,
            description: policy.description,
            isDeployed: policy.isDeployed,
            policyType: policy.policyType,
            quota: policy.quota,
            quotaType: policy.quotaType,
            unitTime: policy.unitTime,
            amConditionGroups: []
        });
    }
}
