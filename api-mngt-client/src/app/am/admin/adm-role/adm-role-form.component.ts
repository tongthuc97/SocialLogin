import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmRole } from './adm-role';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class AdmRoleForm {
    /**
     * @description Định nghĩa form search
     * @param fb 
     */
    static SearchForm(fb: FormBuilder): FormGroup {
        var admRoleForm: FormGroup;

        admRoleForm = fb.group({
            roleId: 0,
            roleName: ["", Validators.compose([
                Validators.required,
            ])],
            roleCode: ["", Validators.compose([
                Validators.required
            ])]
        });
        return admRoleForm;
    }

    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static CreateForm(fb: FormBuilder): FormGroup {
        var admRoleForm: FormGroup;

        admRoleForm = fb.group({
            roleId: 0,
            roleCode: ["", Validators.compose([
                Validators.required,
            ])],
            roleName: ["", Validators.compose([
                Validators.required,
            ])],
            loweredRoleName: ["", Validators.compose([
                Validators.required,
            ])],
            description: ["", Validators.compose([
                Validators.required,
            ])],
            enableDelete: ["", Validators.compose([
                Validators.required,
            ])],
            status: ["", Validators.compose([
                Validators.required,
            ])],
            applicationId: [0, Validators.compose([
                Validators.required,
            ])]
        });
        return admRoleForm;
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
     * @param admRole : đối tượng đích
     */
    static bindingData(admRoleForm: FormGroup, admRole: AdmRole) {
        let enableDelete;
        let status;
        if(admRole.enableDelete == 1){
            enableDelete = "Enable";
        } else if(admRole.enableDelete == 0){
            enableDelete = "Disable";
        }
        if(admRole.status == 1){
            status = "Enable";
        } else if(admRole.status == 0){
            status = "Disable";
        }
        admRoleForm.patchValue({
            roleId: admRole.roleId,
            loweredRoleName: admRole.loweredRoleName,
            roleName: admRole.roleName,
            roleCode: admRole.roleCode,
            description: admRole.description,
            enableDelete: enableDelete,
            status: status,
            applicationId: admRole.applicationId
        });
    }
}