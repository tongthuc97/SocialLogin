import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmApi } from './adm-api';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class AdmApiForm {
    /**
     * @description Định nghĩa form search
     * @param fb 
     */
    static SearchForm(fb: FormBuilder): FormGroup {
        var admApiForm: FormGroup;

        admApiForm = fb.group({
            apiId: 0,
            apiUrl: ["", Validators.compose([
                Validators.required,
            ])],
            apiMethod: ["", Validators.compose([
                Validators.required,
            ])],
            apiName: ["", Validators.compose([
                Validators.required
            ])],
            applicationId: [0, Validators.compose([
                Validators.required,
            ])]
        });
        return admApiForm;
    }

    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static CreateForm(fb: FormBuilder): FormGroup {
        var admApiForm: FormGroup;

        admApiForm = fb.group({
            apiId: 0,
            apiUrl: ["", Validators.compose([
                Validators.required,
            ])],
            apiMethod: ["", Validators.compose([
                Validators.required,
            ])],
            apiName: ["", Validators.compose([
                Validators.required
            ])],
            applicationId: [0, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])]
        });
        return admApiForm;
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
     * @param admApi : đối tượng đích
     */
    static bindingData(admApiForm: FormGroup, admApi: AdmApi) {
        admApiForm.patchValue({
            apiId: admApi.apiId,
            apiUrl: admApi.apiUrl,
            apiMethod: admApi.apiMethod,
            apiName: admApi.apiName,
            applicationId: admApi.applicationId
        });
    }
}