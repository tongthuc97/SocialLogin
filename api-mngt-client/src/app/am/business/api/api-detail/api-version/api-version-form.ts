import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export class ApiVersionForm {

    static getCreateForm(fb: FormBuilder): FormGroup {
        var createForm: FormGroup;
        createForm = fb.group({
            amPolicy: fb.group({
                amPolicyId: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])]
            }),
            amApi: fb.group({
                apiId: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])],
                contextTemplate: [null],
                description: [null],
            }),
            apiVersion: ["", Validators.compose([
                Validators.required,
            ])],
            context: ["", Validators.compose([
                Validators.required,
            ])],
            currentState: [-1, Validators.compose([
                Validators.required,
            ])],
            isCache: [null, Validators.compose([
                Validators.required,
            ])],
            isDefaultVersion: [null, Validators.compose([
                Validators.required,
            ])],

        });
        return createForm;
    }

    /**
     * @description : 
     * @param fb
     */
    static getUpdateForm(fb: FormBuilder): FormGroup {
        var updateForm: FormGroup;
        updateForm = ApiVersionForm.getCreateForm(fb);
        updateForm.addControl('apiVersionId', new FormControl(null));
        updateForm.addControl('amApiLcEvents', new FormControl(null));
        updateForm.addControl('amApiEndpoints', new FormControl(null));
        updateForm.addControl('amApiUrlMappings', new FormControl(null));
        return updateForm;
    }

}
