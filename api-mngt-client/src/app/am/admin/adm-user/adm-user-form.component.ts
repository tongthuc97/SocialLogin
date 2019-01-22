import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdmUser } from './adm-user';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class AdmUserForm {
    /**
     * @description Định nghĩa form search
     * @param fb 
     */
    static SearchForm(fb: FormBuilder): FormGroup {
        var admUserForm: FormGroup;

        admUserForm = fb.group({
            userName: ["", Validators.compose([
                Validators.required,
            ])],
            mobileAlias: ["", Validators.compose([
                Validators.required
            ])]
        });
        return admUserForm;
    }

    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static CreateForm(fb: FormBuilder): FormGroup {
        var admUserForm: FormGroup;

        admUserForm = fb.group({
            userId: 0,
            loweredUsername: ["", Validators.compose([
                Validators.required,
            ])],
            userName: ["", Validators.compose([
                Validators.required,
            ])],
            surname: ["", Validators.compose([
                Validators.required,
            ])],
            givenName: ["", Validators.compose([
                Validators.required,
            ])],
            displayName: ["", Validators.compose([
                Validators.required,
            ])],
            mobileAlias: ["", Validators.compose([
                Validators.required
            ])],
            isAnonymous: [false, Validators.compose([
                Validators.required,
            ])],
            lastActivityDate: ["", Validators.compose([
                Validators.required,
            ])],
            userType: ["", Validators.compose([
                Validators.required,
            ])],
            applicationId: [0, Validators.compose([
                Validators.required,
            ])]
        });
        return admUserForm;
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
     * @param admUser : đối tượng đích
     */
    static bindingData(admUserForm: FormGroup, admUser: AdmUser) {
        debugger;
        let isAnonymous;
        let userType;
        if (admUser.isAnonymous == 1) {
            isAnonymous = true;
        }
        else if (admUser.isAnonymous == 0) {
            isAnonymous = false;
        }
        if (admUser.userType == 1) {
            userType = "Admin";
        }
        else if (admUser.userType == 2) {
            userType = "Member";
        }

        admUserForm.patchValue({
            userId: admUser.userId,
            loweredUsername: admUser.loweredUsername,
            userName: admUser.userName,
            surname: admUser.surname,
            givenName: admUser.givenName,
            displayName: admUser.displayName,
            mobileAlias: admUser.mobileAlias,
            isAnonymous: isAnonymous,
            lastActivityDate: admUser.lastActivityDate,
            userType: userType,
            applicationId: admUser.applicationId
        });

    }
}