import { Subscriber } from '../subscriber/subscriber'
import { Policy } from '../policy/policy'

export class Application {
    applicationId: number;
	amSubscriber: Subscriber;
	amPolicy: Policy;
	applicationStatus: string;
	callbackUrl: string;
	comsumerSecret: string;
	consumerKey: string;
	createdBy: string;
	createdTime: Date;
	description: string;
	name: string;
	updatedBy: string;
    updatedTime: Date;
    checked: boolean;
}