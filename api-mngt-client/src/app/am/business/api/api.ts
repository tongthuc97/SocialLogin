import { GroupApi } from '../group-api/group-api';
export class Api {
    apiId: number;
    apiName: string;
    apiProvider: string;
    contextTemplate: string;
    description: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
    checked: boolean;
    amGroupApi: GroupApi;
}
