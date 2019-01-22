import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export class SubscriptionForm {

    static getCreateForm(fb: FormBuilder): FormGroup {
        var createForm: FormGroup;
        createForm = fb.group({
            subscriptionId: [0, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            amPolicy: fb.group({
                amPolicyId: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])]
            }),
            amApplication: fb.group({
                applicationId: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])],
                applicationStatus: [0, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])],
                amPolicy: fb.group({
                amPolicyId: [0, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])]
            })
                
            }),
            amApiVersion: fb.group({
                apiVersionId: [null, Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])]
            }),
            createdBy: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            createdTime: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            lastAccessed: [0, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            subStatus: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            subsCreateState: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            updatedBy: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
            updatedTime: [null, Validators.compose([
                Validators.required,
                Validators.min(1)
            ])],
        });
        return createForm;
    }

    /**
     * @description : Ä�á»‹nh nghÄ©a form Update, thÃªm trÆ°á»�ng Id
     * @param fb
     */
    static getUpdateForm(fb: FormBuilder): FormGroup {
        var updateForm: FormGroup;
        updateForm = SubscriptionForm.getCreateForm(fb);
        return updateForm;
    }

    //
    /**
     * @description : Ä�áº·t giÃ¡ trá»‹ cho form Update
     * @param updateForm : form Update cáº§n set giÃ¡ trá»‹
     * @param subscription : Ä‘á»‘i tÆ°á»£ng Ä‘Ã­ch
     */
    static bindingData(updateForm: FormGroup, subscription: any) {
        updateForm.setValue({
            subscriptionId: subscription.subscriptionId,
            amPolicy: {
              amPolicyId: subscription.amPolicy.amPolicyId
            },
            amApplication: {
              applicationId: subscription.amApplication.applicationId,
              applicationStatus: subscription.amApplication.applicationStatus,
              amPolicy: {
              amPolicyId: subscription.amApplication.amPolicy.amPolicyId
            },

            },
            amApiVersion: {
              apiVersionId: subscription.amApiVersion.apiVersionId
            },
            createdBy: subscription.createdBy,
            createdTime: subscription.createdTime,
            lastAccessed: subscription.lastAccessed,
            subStatus: subscription.subStatus,
            subsCreateState: subscription.subsCreateState,
            updatedBy: subscription.updatedBy,
            updatedTime: subscription.updatedTime,
        });
    }
}
