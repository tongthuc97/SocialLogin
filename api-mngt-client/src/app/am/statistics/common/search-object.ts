export class SearchObject {
    /** id of the api */
    apiId: number;
    /** id of the api version */
    apiVersionId: number;
    /** id of the application */
    applicationId: number;
    /** the method */
    method: string;
    /** error code */
    errorCode: string;
    /** the status (1 is success and -1 is fail) */
    status: number;
    /** from date (format: yyyy-MM-dd HH:mm) */
    startDate: string;
    /** to date (format: yyyy-MM-dd HH:mm) */
    endDate: string;
}