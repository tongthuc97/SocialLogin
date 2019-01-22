import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiDTO } from '../../common/dto/ApiDTO';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class ApiForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static createForm(fb: FormBuilder): FormGroup {
        var apiForm: FormGroup;
        apiForm = fb.group({
            apiId: [0, Validators.compose([
                Validators.required,
            ])],
            apiVersionId: [0, Validators.compose([
                Validators.required,
            ])],
            groupApiId: ["", Validators.compose([
                Validators.required,
            ])],
            apiName: ["", Validators.compose([
                Validators.required,
            ])],
            apiProvider: ["", Validators.compose([
                Validators.required,
            ])],
            contextTemplate: ["", Validators.compose([
                Validators.required,
                Validators.pattern("^[a-zA-Z0-9_-]+$")
            ])],
            apiVersion: ["", Validators.compose([
                Validators.required,
            ])],
            description: ["", Validators.compose([
                Validators.required,
            ])],
            currentState: ["", Validators.compose([
                Validators.required,
            ])],
            endpointId: [0, Validators.compose([
                Validators.required,
            ])],
            endpointType: [1, Validators.compose([
                Validators.required,
            ])],
            productEndpoint: ["", Validators.compose([
                Validators.required,
            ])],
            secured: [false, Validators.compose([
                Validators.required,
            ])],
            customHeader: ["", Validators.compose([
                Validators.required,
            ])],
            username: ["", Validators.compose([
                Validators.required,
            ])],
            password: ["", Validators.compose([
                Validators.required,
            ])],
            defaultVersion: [false, Validators.compose([
                Validators.required,
            ])],
            responseCaching: [false, Validators.compose([
                Validators.required,
            ])],
            policyId: ["", Validators.compose([
                Validators.required,
            ])]
        });
        return apiForm;
    }

    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static updateForm(fb: FormBuilder): FormGroup {
        return this.createForm(fb);
    }

    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param api : đối tượng đích
     */
    static bindingData(apiForm: FormGroup, apiDto: ApiDTO) {
        let secured = apiDto.secured == 1 ? true : false;
        let defaultVersion = apiDto.defaultVersion == 1 ? true : false;
        let responseCaching = apiDto.responseCaching == 1 ? true : false;
        apiForm.setValue({
            // api infomation
            apiId: apiDto.apiId,
            apiVersionId: apiDto.apiVersionId,
            apiName: apiDto.apiName,
            apiProvider: apiDto.apiProvider,
            contextTemplate: apiDto.contextTemplate,
            apiVersion: apiDto.apiVersion,
            description: apiDto.description,
            currentState: apiDto.currentState,
            groupApiId: apiDto.groupApiId,

            // api implement
            endpointId: apiDto.endpointId,
            endpointType: apiDto.endpointType,
            productEndpoint: apiDto.productEndpoint,
            secured: secured,
            customHeader: apiDto.customHeader,
            username: "",
            password: "",

            // api manager
            defaultVersion: defaultVersion,
            responseCaching: responseCaching,
            policyId: apiDto.policyId,
        });
    }
}