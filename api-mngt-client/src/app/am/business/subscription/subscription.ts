import { Application } from '../application/application';
import { Policy } from '../policy/policy';
import { ApiVersion } from '../api/api-detail/api-version/api-version';
export class Subscription {
    subscriptionId: number;
    amPolicy: Policy;
    amApplication: Application;
    amApiVersion: ApiVersion;
    createdBy: string;
    createdTime: Date;
    lastAccessed: number;
    subStatus: string;
    subsCreateState: string;
    updatedBy: string;
    updatedTime: Date;
    checked: boolean;

}
