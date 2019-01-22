import { JwtClaimConditionComponent } from './jwt-claim-condition/jwt-claim-condition.component';
import { QueryParamConditionComponent } from './query-param-condition/query-param-condition.component';
import { IpCondition } from './ip-condition/ip-condition';
import { HeaderFieldCondition } from './header-field-condition/header-field-condition';
import { QueryParamCondition } from './query-param-condition/query-param-condition';
import { JwtClaimCondition } from './jwt-claim-condition/jwt-claim-condition';
export class ConditionGroup {
    conditionGroupId: number;
    amPolicy: any;
    description: string;
    quota: number;
    quotaType: number;
    unitTime: number;
    name: string;
    amIpConditions: IpCondition[] = [];
    amHeaderFieldConditions: HeaderFieldCondition[] = [];
    amQueryParameterConditions: QueryParamCondition[] = [];
    amJwtClaimConditions: JwtClaimCondition[] = [];
}