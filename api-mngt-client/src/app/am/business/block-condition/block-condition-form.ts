import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../common/util/patterns';


export class BlockConditionForm {

    static getBlockForm(fb: FormBuilder, business: string): FormGroup {
        var blockForm: FormGroup;
        blockForm = fb.group({
            amBlockId: ['', Validators.compose([
                Validators.required
              ])],
            blockName: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50)
              ])],

            blockValue: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Patterns.NAME_PATTERN),
                //Validators.pattern(Patterns.CODE_PATTERN)
              ])],

            blockStatus: ['', Validators.compose([
                Validators.required,
                Validators.min(1),
                Validators.max(2),
              ])],
            });
        return blockForm;
    }
    //
    /**
     * @description : Ä�áº·t giÃ¡ trá»‹ cho form Update
     * @param updateForm : form Update cáº§n set giÃ¡ trá»‹
     * @param blockCondition : Ä‘á»‘i tÆ°á»£ng Ä‘Ã­ch
     */
    static setValueForm(updateForm: FormGroup, blockCondition: any) {
        updateForm.setValue({
            amBlockId: blockCondition.amBlockId,
            blockName: blockCondition.blockName,
            blockValue: blockCondition.blockValue,
            blockStatus: blockCondition.blockStatus,
        });
    }
}
