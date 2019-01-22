 /**
  * @description: Các thuộc tính của danh mục quản lý các lỗi ngoại lệ
  */
export class Logdata {
    idAmLog: number;
    apiId: number
    apiName: string;
    apiVersionId: number;
    apiVersion: string;
    applicationId: number
    applicationName: number;
    method: string
    dataInputApi: string;
    dataInputEndpoint: string;
    dataOutputApi: string;
    dataOutputEndpoint: string;
    errorCodeId: number;
    errorCode: number;
    errorDetail: string;
    ipClient: string;
    timeBackendLatency: number;
    timeOtherLatency: Date;
    timeRequest: Date;
    timeRequestMediationLatency: number;
    timeResponese: Date;
    timeResponeseMediation: number;
    timeSecurityLatency: number;
    timeThrottlingLatency: number;
    urlMappingId: number;
}