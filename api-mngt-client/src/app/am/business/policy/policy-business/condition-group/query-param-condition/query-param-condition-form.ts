import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryParamCondition } from './query-param-condition';
import { Patterns } from '../../../../../common/util/patterns';
export class QueryParamConditionForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static queryParamConditionForm(fb: FormBuilder): FormGroup {
        var queryParamConditionForm: FormGroup;
        queryParamConditionForm = fb.group({
            queryParameterId: [0, Validators.compose([

            ])],
            parameterName: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            parameterValue: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            isParamMapping: [1, Validators.compose([

            ])]
        });
        return queryParamConditionForm;
    }

    static bindingData(formGroup: FormGroup, queryParamCondition: QueryParamCondition) {
        debugger;
        formGroup.setValue({
            queryParameterId: queryParamCondition.queryParameterId,
            parameterName: queryParamCondition.parameterName,
            parameterValue: queryParamCondition.parameterValue,
            isParamMapping: queryParamCondition.isParamMapping
        });
    }

}