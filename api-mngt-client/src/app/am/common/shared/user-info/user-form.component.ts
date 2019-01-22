import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfo } from '../../../../authentication/sso-processing/user-info';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class UserForm {
    static updateInfo(fb: FormBuilder): FormGroup {
        var updateInfoForm: FormGroup;

        updateInfoForm = fb.group({
            userName: ["", Validators.required],
            surname: ["", Validators.required],
            givenName: ["", Validators.required],
            displayName: ["", Validators.required],
            mobileAlias: ["", Validators.required],
        });
        return updateInfoForm;
    }

    static changePasswordForm(fb: FormBuilder): FormGroup {
        var changePassForm: FormGroup;

        changePassForm = fb.group({
            oldPass: ["", Validators.required],
            newPass: ["", Validators.compose([
                Validators.required,
                Validators.max(22),
            ])],
            reNewPass: ["", Validators.compose([
                Validators.required,
                Validators.max(22),
            ])],
        });
        return changePassForm;
    }

    static bindingDataInfo(updateInfoForm: FormGroup, user: UserInfo) {
        updateInfoForm.setValue({
            userName: user.userName,
            surname: user.surname,
            givenName: user.givenName,
            displayName: user.displayName,
            mobileAlias: user.mobileAlias
        });
    }
}