
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupApi } from './group-api';


export class GroupApiForm {

    static getCreateForm(fb: FormBuilder, business: string): FormGroup {
        var createForm: FormGroup;
        createForm = fb.group({
            id: ["", Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            code: ["", Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            status: ["", Validators.compose([
                Validators.required,
            ])],
            name: [null, Validators.compose([
                Validators.required,
              
                Validators.maxLength(200)
            ])],
        });
        if(business=='detail'){
            createForm.controls['status'].disable();
            createForm.controls['code'].disable();
            createForm.controls['name'].disable();
        }
        return createForm;
    }

    /**
     * @description : 
     * @param fb
     */
    static getUpdateForm(fb: FormBuilder): FormGroup {
        var updateForm: FormGroup;
        updateForm = GroupApiForm.getCreateForm(fb,'');
        updateForm.addControl('id', new FormControl(null));
        updateForm.addControl('code', new FormControl(null));
        updateForm.addControl('status', new FormControl(null));
        updateForm.addControl('name', new FormControl(null));
        return updateForm;
    }
    static bindingData(updateForm: FormGroup, groupApi: GroupApi) {
        debugger
        updateForm.setValue({
            id: groupApi.id,
            code: groupApi.code,
            status: groupApi.status,
            name: groupApi.name
        });
    }
}
