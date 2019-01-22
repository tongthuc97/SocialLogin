import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../../common/util/patterns';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa dùng cho bảng 'Condition Group'
 */
export class ConditionGroupForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static conditionGroupForm(fb: FormBuilder): FormGroup {
        var conditionGroupForm = fb.group({
            conditionGroupId: [0, Validators.compose([

            ])],
            name: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            description: [null, Validators.compose([

            ])],
            quota: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            quotaType: [1, Validators.compose([
            ])],
            unitTime: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])]
        });
        return conditionGroupForm;
    }
    static bindingData(conditionGroupForm: FormGroup, conditionGroup: any) {
        conditionGroupForm.setValue({
            conditionGroupId: conditionGroup.conditionGroupId,
            name: conditionGroup.name,
            description: conditionGroup.description,
            quota: conditionGroup.quota,
            quotaType: conditionGroup.quotaType,
            unitTime: conditionGroup.unitTime
        });
    }
}