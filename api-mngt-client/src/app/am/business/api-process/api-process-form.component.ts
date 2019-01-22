import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../common/util/patterns';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class ApiProcessForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static apiProcessForm(fb: FormBuilder): FormGroup {
        var apiProcessForm: FormGroup;
        
        apiProcessForm = fb.group({
            taskId: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(20),
                Validators.pattern(Patterns.CODE_PATTERN)
            ])],
            apiName: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            processName: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            processContentPrevious: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            processContent: ["", Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            state: ["0", Validators.compose([
                Validators.required
            ])],
        });
        return apiProcessForm;
    }
    
}