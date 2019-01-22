import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionHistory } from './action-history';
import { Constants } from '../../common/util/constants';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa dùng cho bảng 'Action History'
 */
export class ActionHistoryForm {
    
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static getCreateForm(fb: FormBuilder): FormGroup {
        var createForm: FormGroup;
        createForm = fb.group({
            userName: null,
            action: null,
            module: null,
            detailAction: null,
            dateAction: null,
            startDate: null,
            endDate: null
        });
        return createForm;
    }

    /**
     * @description : Định nghĩa form Update, thêm trường Id
     * @param fb 
     */
    static getUpdateForm(fb: FormBuilder): FormGroup {
        var updateForm: FormGroup;
        updateForm = ActionHistoryForm.getCreateForm(fb);
        updateForm.addControl('actionHistoryId', new FormControl(null));
        return updateForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param department : đối tượng đích
     */
    static setValueUpdateForm(updateForm: FormGroup, actionHistory: ActionHistory) {
        updateForm.setValue({
            actionHistoryId: actionHistory.actionHistoryId,
            code: actionHistory.userName,
            action: actionHistory.action,
            module: actionHistory.module,
            detailAction: actionHistory.detailAction,
            dateAction: actionHistory.dateAction,
            startDate: actionHistory.startDate,
            endDate: actionHistory.endDate
        });
    }
}