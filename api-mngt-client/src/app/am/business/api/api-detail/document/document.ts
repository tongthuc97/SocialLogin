import { ApiVersion } from '../api-version/api-version';

export class Document {
    
    documentId: number;
    amApiVersion: ApiVersion;
    name: string;
    source: string;
    sourceType: number;
    summary: string;
    type: number;
    createdBy: string;
    createdDate: Date;
    updatedBy: string;
    updatedDate: Date;
    checked: boolean;
}