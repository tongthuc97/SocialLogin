import { ApiMethod } from '../../business/api/api-create/api-method/api-method';
export class ApiDTO {

    //Tab API Design Information
    apiId: number;
    apiVersionId: number;
    apiName: String = '';
    apiProvider: String = '';
    contextTemplate: String = '';
    apiVersion: String = '';
    description: String = '';
    currentState: number;
    createdBy: String = 'admin';
    updatedBy: String = 'admin';
    groupApiId: number;

    //Tab implement
    endpointId: number;
    endpointType: number;
    productEndpoint: String;
    secured: number;
    customHeader: String;

    //tab manage
    defaultVersion: number;
    responseCaching: number;
    policyId: number;

    apiMethods: ApiMethod[] = [];

    constructor() {
    }
}