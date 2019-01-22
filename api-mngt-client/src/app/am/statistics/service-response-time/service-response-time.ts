/**
* @description: Các thuộc tính của danh mục ServiceResponseTime.
*/
export class ServiceResponseTime{
    apiName: string;
    applicationName: string;
    ipClient: string;
    timeRequest: Date;
    timeResponse: Date;
    checked: boolean;
}