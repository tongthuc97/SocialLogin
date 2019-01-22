import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
export class SubscriberForm {

    static subscriberForm(formBuilder: FormBuilder,  business: string): FormGroup {
        var subscriberForm: FormGroup;
        subscriberForm = formBuilder.group({
            subscriberId: [0, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            name: ["", Validators.compose([
                Validators.required
            ])],
            userId: ["", Validators.compose([
                Validators.required
            ])],
            emailAddress: ["", Validators.compose([
                Validators.email
            ])],
        });
        if(business=='detail'){
            subscriberForm.controls['name'].disable();
            subscriberForm.controls['userId'].disable();
            subscriberForm.controls['emailAddress'].disable();
        }
        return subscriberForm;
    }

    static bindingData(updateForm: FormGroup, subscriber: any) {
        updateForm.setValue({
            subscriberId: subscriber.subscriberId,
            name: subscriber.name,
            userId: subscriber.userId,
            emailAddress: subscriber.emailAddress
        });
    }
}
