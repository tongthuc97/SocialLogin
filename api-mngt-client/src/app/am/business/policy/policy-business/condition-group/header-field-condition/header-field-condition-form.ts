import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderFieldCondition } from './header-field-condition';
import { Patterns } from '../../../../../common/util/patterns';
export class HeaderFieldConditionForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static headerFieldConditionForm(fb: FormBuilder): FormGroup {
        var headerFieldConditionForm: FormGroup;
        headerFieldConditionForm = fb.group({
            headerFieldId: [0, Validators.compose([

            ])],
            headerFieldName: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            headerFieldValue: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            headerFieldStatus: [1, Validators.compose([

            ])],
            directional: [1, Validators.compose([

            ])]
        });
        return headerFieldConditionForm;
    }

    static bindingData(formGroup: FormGroup, headerFieldCondition: HeaderFieldCondition) {
        debugger;
        formGroup.setValue({
            headerFieldId: headerFieldCondition.headerFieldId,
            headerFieldName: headerFieldCondition.headerFieldName,
            headerFieldValue: headerFieldCondition.headerFieldValue,
            headerFieldStatus: headerFieldCondition.headerFieldStatus,
            directional: headerFieldCondition.directional
        });
    }

}