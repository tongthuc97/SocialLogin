import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApplicationToken } from './application-token';

export class ApplicationTokenForm {
    static applicationTokenForm(formBuilder: FormBuilder, business: string): FormGroup {
        var applicationTokenForm: FormGroup;
        applicationTokenForm = formBuilder.group({
            applicationTokenId: [0, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            amApplication: formBuilder.group({
                applicationId : [0, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])]
            }),
            endDate: [null, Validators.compose([
                Validators.required,
            ])],
            grantType: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            startDate: [null, Validators.compose([
                Validators.required,
            ])],
            tokenKey: [null, Validators.compose([
                Validators.required,
            ])],
            status: [null, Validators.compose([
                Validators.required,
            ])],
        });
        if(business=='detail'){
            applicationTokenForm.controls['amApplication'].disable();
            applicationTokenForm.controls['endDate'].disable();
            applicationTokenForm.controls['grantType'].disable();
            applicationTokenForm.controls['startDate'].disable();
            applicationTokenForm.controls['tokenKey'].disable();        
        }
        return applicationTokenForm;
    }

    static bindingData(updateForm: FormGroup, applicationToken: ApplicationToken) {
        updateForm.setValue({
            applicationTokenId: applicationToken.applicationTokenId,
            amApplication: {
                applicationId: applicationToken.amApplication.applicationId
            },
            endDate: applicationToken.endDate,
            grantType: applicationToken.grantType,
            startDate: applicationToken.startDate,
            tokenKey: applicationToken.tokenKey,
            status: applicationToken.status,
        });
    }
}