import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmAccess } from './adm-access';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class AdmAccessForm {
    /**
     * @description Định nghĩa form search
     * @param fb 
     */
    static SearchForm(fb: FormBuilder): FormGroup {
        var admAccessForm: FormGroup;

        admAccessForm = fb.group({
            accessId: 0,
            accessType: ["", Validators.compose([
                Validators.required,
            ])],
            accessName: ["", Validators.compose([
                Validators.required,
            ])],
            accessKey: ["", Validators.compose([
                Validators.required
            ])],
            viewOrder: [0, Validators.compose([
                Validators.required,
            ])]
        });
        return admAccessForm;
    }

    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static CreateForm(fb: FormBuilder): FormGroup {
        var admAccessForm: FormGroup;

        admAccessForm = fb.group({
            accessId: 0,
            accessType: ["", Validators.compose([
                Validators.required,
            ])],
            accessName: ["", Validators.compose([
                Validators.required,
            ])],
            accessKey: ["", Validators.compose([
                Validators.required
            ])],
            viewOrder: [0, Validators.compose([
                Validators.required,
            ])]
        });
        return admAccessForm;
    }

    /**
     * @description Định nghĩa form cập nhật
     * @param fb 
     */
    static UpdateForm(fb: FormBuilder): FormGroup {
        return this.CreateForm(fb);
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param admAccess : đối tượng đích
     */
    static bindingData(admAccessForm: FormGroup, admAccess: AdmAccess) {
        admAccessForm.patchValue({
            accessId: admAccess.accessId,
            accessType: admAccess.accessType,
            accessName: admAccess.accessName,
            accessKey: admAccess.accessKey,
            viewOrder: admAccess.viewOrder
        });
    }
}