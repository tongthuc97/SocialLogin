import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchObject } from '../common/search-object';
import { Logdata } from './logdata';
import { Contants } from '../common/contants';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa dùng cho bảng 'Condition Group'
 */
export class LogdataForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static getSearchForm(fb: FormBuilder): FormGroup {
        
        var searchForm: FormGroup;
        searchForm = fb.group({
            apiVersion: [null, Validators.compose([
                Validators.required,
            ])],
            apiId: [null, Validators.compose([
                Validators.required,
            ])],
            apiVersionId: [null, Validators.compose([
                Validators.required,
            ])],
            applicationId: [null, Validators.compose([
                Validators.required,
            ])],
            method: [null, Validators.compose([
                Validators.required,
            ])],
            errorCode: null,
            startDate: ["", Validators.compose([
                Validators.required,
            ])],
            endDate: ["", Validators.compose([
                Validators.required,
            ])],
            startTime: ["", Validators.compose([
                Validators.required,
            ])],
            endTime: ["", Validators.compose([
                Validators.required,
            ])],
        });
        return searchForm;
    }

    
    static binddingDataSaveLog(searchForm: FormGroup, datetimeGroup: any, filterObject: Logdata) {

        searchForm.patchValue({
            startDate: datetimeGroup.startDate,
            startTime: datetimeGroup.startTime,
            endDate: datetimeGroup.endDate,
            endTime: datetimeGroup.endTime,
            apiId: Contants.isEmptyObject(filterObject) && filterObject.apiId ? filterObject.apiId : null,
            apiVersionId: Contants.isEmptyObject(filterObject) && filterObject.apiVersionId ? filterObject.apiVersionId : null,
            applicationId: Contants.isEmptyObject(filterObject) && filterObject.applicationId ? filterObject.applicationId : null,
            method: Contants.isEmptyObject(filterObject) && filterObject.method ? filterObject.method : null,
            errorCode: Contants.isEmptyObject(filterObject) && filterObject.errorCode ? filterObject.errorCode : null
        })
    }
    /**
     * @description : Đặt giá trị cho form 
     * @param searchForm : form Update cần set giá trị
     * @param datetimeGroup : đối tượng đích
     */
    static binddingData(searchForm: FormGroup, datetimeGroup: any) {

        searchForm.patchValue({
            startDate: datetimeGroup.startDate,
            startTime: datetimeGroup.startTime,
            endDate: datetimeGroup.endDate,
            endTime: datetimeGroup.endTime
        })
    }
}