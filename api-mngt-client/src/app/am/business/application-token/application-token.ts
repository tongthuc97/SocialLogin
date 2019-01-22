import { Application } from '../application/application';
 export class ApplicationToken {
    applicationTokenId: number;
	amApplication: Application;
	endDate: Date;
	grantType: string;
	startDate: Date;
	tokenKey: string;
	status: number;
	checked: boolean;
 }