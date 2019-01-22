import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParaSystem } from './para-system';
import { Patterns } from '../../common/util/patterns';

/**
 * @target: used to define edit, create and filter form fo 'ParaSystem'
 */
export class ParaSystemForm {
    
    /**
     * @description Get ticket price Creating or Updating form
     * @param fb 
     */
    static getParaSystemForm(fb: FormBuilder): FormGroup{
        var createForm: FormGroup;
        createForm = fb.group({
            id: null,
            name: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            value: [null, Validators.compose([
                Validators.required
            ])],
            status: [null, Validators.compose([
                Validators.required,
                Validators.min(1),
                Validators.max(2)
            ])]
        });
        return createForm;
    }

    /**
     * @description Assign value for ticket price updating form
     * @param paraSystemForm 
     * @param paraSystem 
     */
    static bindingParaSystemToParaSystemForm(paraSystemForm: FormGroup, paraSystem: ParaSystem){
        paraSystemForm.patchValue({
            id: paraSystem.id,
            name: paraSystem.name,
            value: paraSystem.value,
            status: paraSystem.status
        });
    }
}