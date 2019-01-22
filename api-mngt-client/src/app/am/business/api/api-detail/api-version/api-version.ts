import { Policy } from '../../../policy/policy';
import { ApiEndpoint } from '../../api-endpoint';
import { Api } from '../../api';
import { ProcessInstance } from '../../../api-process/process-instance';

export class ApiVersion {
    apiVersionId: number;
    amApi: Api;
    amPolicy: Policy;
    apiProvider: string;
    apiVersion: string;
    context: string;
    currentState: number;
    isCache: number;
    isDefaultVersion: number;
    amApiLcEvents: any;
    amApiEndpoints: any;
    amApiUrlMappings: any;
    checked: boolean;
    bpmProcessInstance: ProcessInstance;

    constructor() {
        this.amApi = new Api();
    }
}
