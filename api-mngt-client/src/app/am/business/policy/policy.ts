import { ConditionGroup } from './policy-business/condition-group/condition-group';
export class Policy {

  amPolicyId: number;
  description: string;
  displayName: string;
  isDeployed: number;
  name: string;
  policyType: number;
  quota: number;
  quotaType: number;
  unitTime: number;
  
  amConditionGroups: ConditionGroup[] = [];

  checked: boolean;
}
