import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Application} from './application';
import { Patterns } from '../../common/util/patterns';

export class ApplicationForm {
    static applicationForm(formBuilder: FormBuilder, business: string): FormGroup {
        var applicationForm: FormGroup;
        applicationForm = formBuilder.group({
            applicationId: [0, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            amSubscriber: formBuilder.group({
                subscriberId : [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])]
            }),
            amPolicy: formBuilder.group({
                amPolicyId : [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])]
            }),
            applicationStatus: [null, Validators.compose([
                Validators.required,
            ])],
            callbackUrl: [null, Validators.compose([
                Validators.required,
            ])],
            comsumerSecret: [null, Validators.compose([
                Validators.required,
            ])],
            consumerKey: [null, Validators.compose([
                Validators.required,
            ])],
            description: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN),
                Validators.maxLength(400)
            ])],
            name: [null, Validators.compose([
                Validators.required,
                Validators.pattern(Patterns.NAME_PATTERN),
                Validators.maxLength(200)
            ])],
        });
        if(business=='detail'){
            applicationForm.controls['applicationStatus'].disable();
            applicationForm.controls['callbackUrl'].disable();
            applicationForm.controls['comsumerSecret'].disable();
            applicationForm.controls['consumerKey'].disable();
            applicationForm.controls['description'].disable();
            applicationForm.controls['name'].disable();
            applicationForm.controls['amSubscriber'].disable();
            applicationForm.controls['amPolicy'].disable();
        }
        return applicationForm;
    }

    static bindingData(updateForm: FormGroup, application: Application) {
        updateForm.setValue({
            applicationId: application.applicationId,
            amSubscriber: {
                subscriberId: application.amSubscriber.subscriberId
            },
            amPolicy: {
                amPolicyId: application.amPolicy.amPolicyId
            },
            applicationStatus: application.applicationStatus,
            callbackUrl: application.callbackUrl,
            comsumerSecret: application.comsumerSecret,
            consumerKey: application.consumerKey,
            description: application.description,
            name: application.name
        });
    }
}