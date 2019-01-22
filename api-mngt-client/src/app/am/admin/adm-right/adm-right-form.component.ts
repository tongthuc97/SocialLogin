import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmRight } from './adm-right';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class AdmRightForm {
    /**
     * @description Định nghĩa form search
     * @param fb 
     */
    static SearchForm(fb: FormBuilder): FormGroup {
        var admRightForm: FormGroup;

        admRightForm = fb.group({
            rightId: 0,
            rightCode: ["", Validators.compose([
                Validators.required,
            ])],
            rightName: ["", Validators.compose([
                Validators.required,
            ])]
        });
        return admRightForm;
    }

    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static CreateForm(fb: FormBuilder): FormGroup {
        var admRightForm: FormGroup;

        admRightForm = fb.group({
            rightId: 0,
            rightCode: ["", Validators.compose([
                Validators.required,
            ])],
            rightName: ["", Validators.compose([
                Validators.required,
            ])],
            parentRightId: [0, Validators.compose([
                Validators.required
            ])],
            status: [false, Validators.compose([
                Validators.required,
            ])],
            rightOrder: [0, Validators.compose([
                Validators.required,
            ])],
            hasChild: [false, Validators.compose([
                Validators.required,
            ])],
            urlRewrite: ["", Validators.compose([
                Validators.required,
            ])],
            iconUrl: ["", Validators.compose([
                Validators.required,
            ])],
            description: ["", Validators.compose([
                Validators.required,
            ])],
            applicationId: [0, Validators.compose([
                Validators.required,
            ])]
        });
        return admRightForm;
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
     * @param admRight : đối tượng đích
     */
    static bindingData(admRightForm: FormGroup, admRight: AdmRight) {
        let hasChild;
        let status;
        if (admRight.hasChild == 1) {
            hasChild = true;
        } else if (admRight.hasChild == 0) {
            hasChild = false;
        }
        if (admRight.status == 1) {
            status = true;
        } else if (admRight.status == 0) {
            status = false;
        }

        admRightForm.patchValue({
            rightId: admRight.rightId,
            rightCode: admRight.rightCode,
            rightName: admRight.rightName,
            parentRightId: admRight.parentRightId,
            status: status,
            rightOrder: admRight.rightOrder,
            hasChild: hasChild,
            urlRewrite: admRight.urlRewrite,
            iconUrl: admRight.iconUrl,
            description: admRight.description,
            applicationId: admRight.applicationId
        });
    }
}