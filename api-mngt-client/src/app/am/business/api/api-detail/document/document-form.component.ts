import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Patterns } from '../../../../common/util/patterns';
import { Document } from './document';

/**
 * @target: Dùng để định nghĩa forms: tạo, sửa, chi tiết
 */
export class DocumentForm {
    /**
     * @description Định nghĩa form tạo
     * @param fb 
     */
    static documentForm(fb: FormBuilder, business: string): FormGroup {
        var documentForm: FormGroup;
        
        documentForm = fb.group({
            documentId: "",
            name: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(Patterns.NAME_PATTERN)
            ])],
            source: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(20),
                Validators.pattern(Patterns.CODE_PATTERN)
            ])],
            sourceType: ["", Validators.compose([
                Validators.required
            ])],
            summary: ["", Validators.compose([
                Validators.required
            ])],
            type: ["", Validators.compose([
                Validators.required
            ])],
            amApiVersion: fb.group({
                apiVersionId : ["", Validators.compose([
                    Validators.required,
                    Validators.min(1)
                ])]
            }),
        });
        return documentForm;
    }

    // 
    /**
     * @description : Đặt giá trị cho form Update
     * @param updateForm : form Update cần set giá trị
     * @param document : đối tượng đích
     */
    static bindingData(documentForm: FormGroup, document: Document) {
        documentForm.setValue({
            documentId: document.documentId,
            name: document.name,
            source: document.source,
            sourceType: document.sourceType,
            summary: document.summary,
            type: document.type,
            amApiVersion: {
                apiVersionId: document.amApiVersion.apiVersionId,
            },
        });
    }
}